#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const ts = require("typescript");
const root = process.cwd();

const SOURCE_DIRECTORY = "src/client";
const DICTIONARY_ENTRY = "src/client/lib/i18n-messages.ts";
const PLACEHOLDER = /\{(\w+)\}/g;

const DYNAMIC_SOURCES = [
  {
    file: "src/client/features/dashboard/dashboardSteps.ts",
    fields: ["label", "detail", "skipLabel"],
    reason: "dashboard checklist renders t(item.field)",
  },
  {
    file: "src/client/navigation/items.ts",
    fields: ["label"],
    reason: "sidebar renders t(item.label)",
  },
  {
    file: "src/shared/rank-tracking.ts",
    functions: ["devicesLabel", "scheduleLabel"],
    reason:
      "rank-tracking list calls t(devicesLabel(...)) or t(scheduleLabel(...))",
  },
];

const UNMARKED_PROPERTIES = new Set([
  "alt",
  "aria-label",
  "description",
  "emptyMessage",
  "errorMessage",
  "fallback",
  "label",
  "placeholder",
  "successMessage",
  "title",
]);

const KEEP_ENGLISH_KEYS = new Set(["Google Maps"]);
const PRODUCT_WORDS =
  /\b(OpenSEO|Google|ChatGPT|Claude|Search Console|Google Maps|GitHub)\b/;

function walkFiles(directory, ignored) {
  const files = [];
  for (const name of readdirSafe(directory)) {
    const path = join(directory, name);
    if (ignored.has(relative(root, path).replaceAll("\\", "/"))) continue;
    if (statSync(path).isDirectory()) {
      files.push(...walkFiles(path, ignored));
    } else if ([".ts", ".tsx"].includes(extname(name))) {
      files.push(path);
    }
  }
  return files;
}

function readdirSafe(directory) {
  if (!existsSync(directory)) return [];
  return statSync(directory).isDirectory()
    ? [...new Set(readdirSync(directory))].sort()
    : [];
}

function sourceFiles() {
  const ignored = new Set(
    [
      DICTIONARY_ENTRY,
      "src/client/lib/i18n.ts",
      "src/client/lib/i18n.test.ts",
    ].concat(
      [...walkFiles("src/client/lib/i18n", new Set())].map((path) =>
        relative(root, path).replaceAll("\\", "/"),
      ),
    ),
  );
  return walkFiles(SOURCE_DIRECTORY, ignored).sort();
}

function nodeText(node, source) {
  return node ? source.text.slice(node.getStart(source), node.getEnd()) : "";
}

function literalKey(name) {
  if (!name) return null;
  if (ts.isStringLiteral(name) || ts.isNumericLiteral(name)) {
    return name.text;
  }
  if (ts.isIdentifier(name)) return name.text;
  return null;
}

function stringKey(expression) {
  if (!expression) return null;
  if (
    ts.isStringLiteral(expression) ||
    ts.isNoSubstitutionTemplateLiteral(expression)
  ) {
    return expression.text;
  }
  return null;
}

function propertyName(name) {
  if (!name) return null;
  if (
    ts.isIdentifier(name) ||
    ts.isStringLiteral(name) ||
    ts.isNumericLiteral(name)
  ) {
    return name.text;
  }
  return null;
}

function parseFile(path, content = readFileSync(path, "utf8")) {
  return ts.createSourceFile(
    path,
    content,
    ts.ScriptTarget.Latest,
    true,
    path.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
}

function eachChild(node, visit) {
  ts.forEachChild(node, (child) => {
    if (!child) return;
    visit(child);
    eachChild(child, visit);
  });
}

function localImports(source) {
  const imports = new Map();
  eachChild(source, (node) => {
    if (
      !ts.isImportDeclaration(node) ||
      !ts.isStringLiteral(node.moduleSpecifier)
    )
      return;
    const moduleSpecifier = node.moduleSpecifier.text;
    if (
      !node.importClause?.namedBindings ||
      !ts.isNamedImports(node.importClause.namedBindings)
    )
      return;
    for (const element of node.importClause.namedBindings.elements) {
      imports.set(element.name.text, {
        imported: (element.propertyName ?? element.name).text,
        moduleSpecifier,
      });
    }
  });
  return imports;
}

function resolveModule(fromPath, moduleSpecifier) {
  if (!moduleSpecifier) return null;
  if (moduleSpecifier.startsWith("@/"))
    return resolve(root, "src", moduleSpecifier.slice(2));
  if (moduleSpecifier.startsWith("."))
    return resolve(dirname(fromPath), moduleSpecifier);
  return null;
}

function resolveModulePath(fromPath, moduleSpecifier) {
  const modulePath = resolveModule(fromPath, moduleSpecifier);
  if (!modulePath) return null;
  const candidates = [
    modulePath,
    `${modulePath}.ts`,
    `${modulePath}.tsx`,
    join(modulePath, "index.ts"),
    join(modulePath, "index.tsx"),
  ];
  return (
    candidates.find(
      (candidate) => existsSync(candidate) && statSync(candidate).isFile(),
    ) ?? null
  );
}

function resolveLocalLiteral(name, source) {
  let value = null;
  eachChild(source, (node) => {
    if (
      !ts.isVariableDeclaration(node) ||
      !ts.isIdentifier(node.name) ||
      node.name.text !== name
    )
      return;
    if (
      node.initializer &&
      (ts.isStringLiteral(node.initializer) ||
        ts.isNoSubstitutionTemplateLiteral(node.initializer))
    ) {
      value = node.initializer.text;
    }
  });
  return value;
}

function staticKeys(expression, source) {
  if (!expression) return [];
  const key = stringKey(expression);
  if (key) return [key];
  if (ts.isIdentifier(expression)) {
    const key = resolveLocalLiteral(expression.text, source);
    return key ? [key] : [];
  }
  if (ts.isConditionalExpression(expression)) {
    return [
      ...staticKeys(expression.whenTrue, source),
      ...staticKeys(expression.whenFalse, source),
    ];
  }
  return [];
}

function extractMarked(source, path) {
  const imports = localImports(source);
  const directImport = [...imports.values()].find(
    ({ imported }) => imported === "translateCurrent",
  );
  const translateNames = new Set(directImport ? [directImport.local] : []);
  const staticEntries = [];
  const dynamicCalls = [];

  eachChild(source, (node) => {
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.initializer &&
      ts.isCallExpression(node.initializer) &&
      ts.isIdentifier(node.initializer.expression) &&
      imports.get(node.initializer.expression.text)?.imported === "useT"
    ) {
      translateNames.add(node.name.text);
    }
  });

  eachChild(source, (node) => {
    if (!ts.isCallExpression(node) || !ts.isIdentifier(node.expression)) return;
    const imported = imports.get(node.expression.text);
    const isDirect = imported?.imported === "translateCurrent";
    const isBoundUseT =
      translateNames.has(node.expression.text) &&
      node.expression.text !== directImport?.local;
    if (!isDirect && !isBoundUseT) return;

    const argument = node.arguments[0];
    const keys = staticKeys(argument, source);

    const location = {
      file: relative(root, path).replaceAll("\\", "/"),
      line:
        source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1,
      expression: nodeText(argument, source),
    };
    if (keys.length > 0) {
      for (const key of keys) {
        staticEntries.push({
          key,
          value: key,
          file: location.file,
          line: location.line,
          origin: "marked",
        });
      }
    } else {
      dynamicCalls.push(location);
    }
  });

  return { staticEntries, dynamicCalls };
}

function dynamicSourceKeys(fileContents = new Map()) {
  const found = [];
  for (const sourceConfig of DYNAMIC_SOURCES) {
    const path = resolve(root, sourceConfig.file);
    if (!existsSync(path)) continue;
    const source = parseFile(
      path,
      fileContents.get(sourceConfig.file) ?? readFileSync(path, "utf8"),
    );
    if (sourceConfig.fields) {
      eachChild(source, (node) => {
        if (!ts.isPropertyAssignment(node)) return;
        const field = propertyName(node.name);
        const key = stringKey(node.initializer);
        if (field && key && sourceConfig.fields.includes(field)) {
          found.push({
            key,
            value: key,
            file: sourceConfig.file,
            line:
              source.getLineAndCharacterOfPosition(node.getStart(source)).line +
              1,
            origin: "dynamic-source",
            reason: sourceConfig.reason,
          });
        }
      });
    }
    if (sourceConfig.functions) {
      eachChild(source, (node) => {
        const name = ts.isFunctionDeclaration(node) ? node.name?.text : null;
        if (!name || !sourceConfig.functions.includes(name) || !node.body)
          return;
        const collectReturned = (expression) => {
          if (!expression) return;
          const key = stringKey(expression);
          if (key) {
            found.push({
              key,
              value: key,
              file: sourceConfig.file,
              line:
                source.getLineAndCharacterOfPosition(
                  expression.getStart(source),
                ).line + 1,
              origin: "dynamic-source",
              reason: sourceConfig.reason,
            });
            return;
          }
          if (ts.isConditionalExpression(expression)) {
            collectReturned(expression.whenTrue);
            collectReturned(expression.whenFalse);
          }
        };
        eachChild(node.body, (statement) => {
          if (ts.isReturnStatement(statement))
            collectReturned(statement.expression);
        });
      });
    }
  }
  return found;
}

function exportedObjectProperty(source, exportName) {
  let objectLiteral = null;
  eachChild(source, (node) => {
    if (!ts.isVariableStatement(node)) return;
    const isExported = node.modifiers?.some(
      (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword,
    );
    if (!isExported) return;
    for (const declaration of node.declarationList.declarations) {
      if (
        ts.isIdentifier(declaration.name) &&
        declaration.name.text === exportName &&
        declaration.initializer &&
        ts.isObjectLiteralExpression(declaration.initializer)
      ) {
        objectLiteral = declaration.initializer;
      }
    }
  });
  return objectLiteral;
}

function dictionaryOccurrences(
  path = resolve(root, DICTIONARY_ENTRY),
  exportName = "zhCN",
  visiting = new Set(),
) {
  if (visiting.has(path)) return [];
  visiting.add(path);
  const source = parseFile(path);
  const objectLiteral = exportedObjectProperty(source, exportName);
  if (!objectLiteral) return [];
  const imports = localImports(source);
  const occurrences = [];

  for (const property of objectLiteral.properties) {
    if (
      ts.isSpreadAssignment(property) &&
      ts.isIdentifier(property.expression)
    ) {
      const imported = imports.get(property.expression.text);
      const modulePath = resolveModulePath(path, imported?.moduleSpecifier);
      if (modulePath && existsSync(modulePath)) {
        occurrences.push(
          ...dictionaryOccurrences(modulePath, imported.imported, visiting),
        );
      }
      continue;
    }
    if (!ts.isPropertyAssignment(property)) continue;
    const key = literalKey(property.name);
    const valueNode = property.initializer;
    const value = stringKey(valueNode);
    if (!key) continue;
    occurrences.push({
      key,
      value: value ?? "",
      hasTranslation: Boolean(value),
      file: relative(root, path).replaceAll("\\", "/"),
      line:
        source.getLineAndCharacterOfPosition(property.getStart(source)).line +
        1,
    });
  }
  return occurrences;
}

function placeholders(text) {
  return [...text.matchAll(PLACEHOLDER)].map((match) => match[1]).sort();
}

function uniqueBy(items, selector) {
  const seen = new Set();
  return items.filter((item) => {
    const identity = selector(item);
    if (seen.has(identity)) return false;
    seen.add(identity);
    return true;
  });
}

function extractUnmarked(source, path) {
  const candidates = [];
  const relativePath = relative(root, path).replaceAll("\\", "/");
  const dynamicConfig = DYNAMIC_SOURCES.find(
    (config) => config.file === relativePath,
  );
  const add = (text, line, kind, category) => {
    const normalized = text.replaceAll(/\s+/g, " ").trim();
    if (normalized.length < 2 || !/[A-Za-z]/.test(normalized)) return;
    candidates.push({
      file: relativePath,
      line,
      text: normalized,
      kind,
      category:
        kind === "dynamic-expression"
          ? "data"
          : PRODUCT_WORDS.test(normalized)
            ? "product-brand"
            : (category ?? "candidate"),
    });
  };

  eachChild(source, (node) => {
    if (ts.isJsxText(node)) {
      const text = node.getText(source).replaceAll(/\s+/g, " ").trim();
      if (text) {
        add(
          text,
          source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1,
          "jsx-text",
        );
      }
      return;
    }
    if (
      ts.isJsxAttribute(node) &&
      UNMARKED_PROPERTIES.has(node.name.getText(source))
    ) {
      const initializer = node.initializer;
      if (initializer && ts.isStringLiteral(initializer)) {
        add(
          initializer.text,
          source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1,
          "jsx-attribute",
        );
      } else if (initializer && ts.isJsxExpression(initializer)) {
        const expression = initializer.expression;
        const key = stringKey(expression);
        if (key) {
          add(
            key,
            source.getLineAndCharacterOfPosition(expression.getStart(source))
              .line + 1,
            "jsx-attribute",
          );
        } else if (expression && !ts.isCallExpression(expression)) {
          add(
            nodeText(expression, source),
            source.getLineAndCharacterOfPosition(expression.getStart(source))
              .line + 1,
            "dynamic-expression",
          );
        }
      }
      return;
    }
    if (ts.isPropertyAssignment(node)) {
      const field = propertyName(node.name);
      const key = stringKey(node.initializer);
      if (!field || !key || !UNMARKED_PROPERTIES.has(field)) return;
      const isKnownDynamic = dynamicConfig?.fields?.includes(field);
      if (!isKnownDynamic) {
        add(
          key,
          source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1,
          "object-property",
        );
      }
    }
  });
  return candidates;
}

function scanWorkspace(files = sourceFiles()) {
  const marked = [];
  const dynamic = [];
  const unmarked = [];
  const normalizedFiles = files.map((file) =>
    typeof file === "string" ? { path: file } : file,
  );
  for (const { path, content } of normalizedFiles) {
    const source = parseFile(path, content ?? readFileSync(path, "utf8"));
    const markedResult = extractMarked(source, path);
    marked.push(...markedResult.staticEntries);
    dynamic.push(...markedResult.dynamicCalls);
    unmarked.push(...extractUnmarked(source, path));
  }
  return {
    marked,
    dynamicCalls: uniqueBy(
      dynamic,
      (item) => `${item.file}:${item.line}:${item.expression}`,
    ),
    unmarked: uniqueBy(
      unmarked,
      (item) => `${item.file}:${item.line}:${item.text}`,
    ),
  };
}

function audit({ files, fileContents } = {}) {
  const contentsByPath = fileContents ?? new Map();
  const scanned = scanWorkspace(files);
  scanned.dynamicSource = dynamicSourceKeys(contentsByPath);
  const sourceEntries = [...scanned.marked, ...scanned.dynamicSource];
  const required = new Map();
  for (const entry of sourceEntries) {
    if (!required.has(entry.key)) required.set(entry.key, []);
    required.get(entry.key).push(entry);
  }

  const dictionary = dictionaryOccurrences();
  const translations = new Map();
  for (const occurrence of dictionary) {
    if (!translations.has(occurrence.key)) translations.set(occurrence.key, []);
    translations.get(occurrence.key).push(occurrence);
  }

  const missing = [];
  for (const [key, occurrences] of required) {
    const hasTranslation = translations
      .get(key)
      ?.some((occurrence) => occurrence.hasTranslation);
    if (!KEEP_ENGLISH_KEYS.has(key) && !hasTranslation)
      missing.push({ key, occurrences });
  }

  const placeholderMismatches = [];
  const conflicts = [];
  for (const [key, occurrences] of translations) {
    const translated = occurrences.filter(
      (occurrence) => occurrence.hasTranslation,
    );
    const sourcePlaceholders = new Set(placeholders(key));
    for (const occurrence of translated) {
      const translationPlaceholders = placeholders(occurrence.value);
      const missingPlaceholders = [...sourcePlaceholders].filter(
        (name) => !translationPlaceholders.includes(name),
      );
      const extraPlaceholders = translationPlaceholders.filter(
        (name) => !sourcePlaceholders.has(name),
      );
      if (missingPlaceholders.length || extraPlaceholders.length) {
        placeholderMismatches.push({
          key,
          occurrence,
          missingPlaceholders,
          extraPlaceholders,
        });
      }
    }
    const values = new Set(translated.map((occurrence) => occurrence.value));
    if (values.size > 1) conflicts.push({ key, occurrences: translated });
  }

  return {
    ...scanned,
    missing: missing.sort((a, b) => a.key.localeCompare(b.key)),
    placeholderMismatches,
    conflicts,
    requiredKeys: required.size,
    dictionaryKeys: translations.size,
  };
}

function gitContent(base, path) {
  try {
    return execFileSync("git", ["show", `${base}:${path}`], {
      cwd: root,
      encoding: "utf8",
      maxBuffer: 20 * 1024 * 1024,
      stdio: ["ignore", "pipe", "ignore"],
    });
  } catch {
    return null;
  }
}

function changedFiles(base, onlyPaths = []) {
  const tracked = execFileSync(
    "git",
    [
      "diff",
      "--name-only",
      "--diff-filter=ACMRD",
      base,
      "--",
      SOURCE_DIRECTORY,
      "src/shared",
    ],
    {
      cwd: root,
      encoding: "utf8",
    },
  ).trim();
  const untracked = execFileSync(
    "git",
    [
      "ls-files",
      "--others",
      "--exclude-standard",
      SOURCE_DIRECTORY,
      "src/shared",
    ],
    {
      cwd: root,
      encoding: "utf8",
    },
  ).trim();
  return [...new Set([...tracked.split("\n"), ...untracked.split("\n")])]
    .filter(Boolean)
    .filter(
      (file) =>
        !file.endsWith(".test.ts") && !file.startsWith("src/client/lib/i18n"),
    )
    .filter(
      (file) =>
        onlyPaths.length === 0 ||
        onlyPaths.some((path) => file === path || file.startsWith(`${path}/`)),
    )
    .sort();
}

function compareChanges(base, onlyPaths = []) {
  const files = changedFiles(base, onlyPaths);
  const currentFiles = files.filter((file) => existsSync(resolve(root, file)));
  const current = audit({ files: currentFiles });
  const baselineContents = new Map(
    files
      .map((file) => [file, gitContent(base, file)])
      .filter(([, content]) => content !== null),
  );
  const baseline = audit({
    files: [...baselineContents.entries()].map(([file, content]) => ({
      path: resolve(root, file),
      content,
    })),
    fileContents: baselineContents,
  });

  const identities = (entry) => `${entry.file}:${entry.key}`;
  const baselineMarked = new Set(baseline.marked.map(identities));
  const baselineDynamic = new Set(baseline.dynamicSource.map(identities));
  const addedMarked = current.marked.filter(
    (entry) => !baselineMarked.has(identities(entry)),
  );
  const addedDynamic = current.dynamicSource.filter(
    (entry) => !baselineDynamic.has(identities(entry)),
  );
  const removedMarked = baseline.marked.filter(
    (entry) =>
      !current.marked.some(
        (candidate) => identities(candidate) === identities(entry),
      ),
  );
  const removedDynamic = baseline.dynamicSource.filter(
    (entry) =>
      !current.dynamicSource.some(
        (candidate) => identities(candidate) === identities(entry),
      ),
  );
  const baselineUnmarked = new Set(
    baseline.unmarked.map((item) => `${item.file}:${item.text}`),
  );
  const unmarked = current.unmarked.filter(
    (item) => !baselineUnmarked.has(`${item.file}:${item.text}`),
  );

  return {
    base,
    files,
    addedMarked,
    addedDynamic,
    removedMarked,
    removedDynamic,
    unmarked,
    missing: current.missing,
    placeholderMismatches: current.placeholderMismatches,
    conflicts: current.conflicts,
    dynamicCalls: current.dynamicCalls,
  };
}

function printOccurrence(occurrence, indent = "  ") {
  console.log(
    `${indent}${occurrence.file}:${occurrence.line} — ${occurrence.expression ?? occurrence.value}`,
  );
}

function runCheck() {
  const report = audit();
  console.log(
    `i18n check: ${report.requiredKeys} marked/dynamic-source keys, ${report.dictionaryKeys} zh-CN entries`,
  );

  if (report.missing.length) {
    console.log(`\nMissing zh-CN (${report.missing.length})`);
    for (const item of report.missing) {
      console.log(`  ${item.key}`);
      item.occurrences
        .slice(0, 3)
        .forEach((occurrence) => printOccurrence(occurrence, "    "));
    }
  }
  if (report.placeholderMismatches.length) {
    console.log(
      `\nPlaceholder mismatches (${report.placeholderMismatches.length})`,
    );
    for (const item of report.placeholderMismatches) {
      console.log(`  ${item.key}`);
      printOccurrence(item.occurrence, "    ");
      console.log(
        `    missing: ${item.missingPlaceholders.join(", ") || "none"}; extra: ${item.extraPlaceholders.join(", ") || "none"}`,
      );
    }
  }
  if (report.conflicts.length) {
    console.log(`\nConflicting translations (${report.conflicts.length})`);
    for (const item of report.conflicts) {
      console.log(`  ${item.key}`);
      item.occurrences.forEach((occurrence) =>
        printOccurrence(occurrence, "    "),
      );
    }
  }

  console.log(
    `\nManual dynamic boundary: ${report.dynamicCalls.length} marked calls had a non-literal key; explicit sources cover ${report.dynamicSource.length} literals.`,
  );
  console.log(
    `Unmarked-text report only: ${report.unmarked.length} current candidates (product/API/user data require human review).`,
  );
  if (
    report.missing.length ||
    report.placeholderMismatches.length ||
    report.conflicts.length
  )
    process.exitCode = 1;
}

function runChanges(base) {
  const onlyIndex = process.argv.indexOf("--only");
  const onlyPaths =
    onlyIndex >= 0
      ? process.argv
          .slice(onlyIndex + 1)
          .filter((path) => !path.startsWith("--"))
      : [];
  const report = compareChanges(base, onlyPaths);
  console.log(
    `Copy changes relative to ${base}: ${report.files.length} changed source files`,
  );

  console.log(`\nNew marked keys (${report.addedMarked.length})`);
  report.addedMarked.forEach((entry) =>
    console.log(`  ${entry.file}:${entry.line} — ${entry.key}`),
  );
  console.log(
    `\nNew explicit dynamic-source keys (${report.addedDynamic.length})`,
  );
  report.addedDynamic.forEach((entry) =>
    console.log(
      `  ${entry.file}:${entry.line} — ${entry.key} (${entry.reason})`,
    ),
  );
  console.log(
    `\nDeprecated candidates — report only (${report.removedMarked.length + report.removedDynamic.length})`,
  );
  report.removedMarked.forEach((entry) =>
    console.log(`  ${entry.file}:${entry.line} — ${entry.key}`),
  );
  report.removedDynamic.forEach((entry) =>
    console.log(
      `  ${entry.file}:${entry.line} — ${entry.key} (${entry.reason})`,
    ),
  );

  const actionable = report.unmarked.filter(
    (item) => item.category === "candidate",
  );
  const review = report.unmarked.filter(
    (item) => item.category !== "candidate",
  );
  console.log(`\nUnmarked candidates (${actionable.length})`);
  actionable.forEach((item) =>
    console.log(`  ${item.file}:${item.line} — ${item.text}`),
  );
  console.log(`Likely product/API/user data (${review.length})`);
  review.forEach((item) =>
    console.log(
      `  [${item.category}] ${item.file}:${item.line} — ${item.text}`,
    ),
  );

  if (
    report.missing.length ||
    report.placeholderMismatches.length ||
    report.conflicts.length
  ) {
    console.log(
      "\nCurrent translations have missing keys, placeholder mismatches, or conflicts. Run `pnpm i18n:check` for details.",
    );
    process.exitCode = 1;
  }
}

function main() {
  const [command, ...arguments_] = process.argv.slice(2);
  if (command === "check") return runCheck();
  if (command === "changes") {
    const baseIndex = arguments_.indexOf("--base");
    const base = baseIndex >= 0 ? arguments_[baseIndex + 1] : null;
    if (!base)
      throw new Error(
        "Usage: node scripts/i18n/i18n-audit.mjs changes --base <git-rev>",
      );
    return runChanges(base);
  }
  console.log(
    "Usage:\n  node scripts/i18n/i18n-audit.mjs check\n  node scripts/i18n/i18n-audit.mjs changes --base <git-rev>",
  );
  process.exitCode = command ? 2 : 0;
}

main();
