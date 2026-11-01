# Simplified Chinese UI copy

The UI keeps English source text as the translation key. `useT` and
`translateCurrent` look up that exact string in the Simplified Chinese
dictionaries under `src/client/lib/i18n/`, then fall back to English. Localized
text uses `{name}` placeholders.

## Sync workflow

1. Merge the upstream branch and resolve application conflicts first.
2. List new UI copy against the upstream release baseline:

   ```sh
   pnpm i18n:changes -- --base v0.1.21 --only src/client/features/dashboard src/client/features/rank-tracking
   ```

   `--only` is optional; omit it to scan every changed client or shared source
   file. Add
   translations for the reported new marked keys and explicit dynamic-source
   keys. Deleted keys are reported as deprecated candidates; do not remove them
   automatically.

3. Run `pnpm i18n:check`. It fails on missing translations, missing or extra
   `{placeholder}` names, and two different translations for one key.
4. Exercise the changed pages in English and Simplified Chinese. Existing
   `tests/locale-switching.spec.ts` covers switching without losing form,
   filter, or selection state.

## Boundaries

- The changed-copy command compares static `t()`/`translateCurrent()` literals
  in changed files. A Git conflict-free merge is not proof that Chinese copy is
  complete.
- Dynamic keys are visible only when their source is declared in
  `DYNAMIC_SOURCES` in `scripts/i18n/i18n-audit.mjs`. It currently covers the
  sidebar labels, dashboard checklist fields, and rank-tracking device/schedule
  label helpers. Review other non-literal calls by hand; the checker reports
  their count instead of guessing a key.
- Unmarked JSX text is a review aid, not an automatic failure. Product names,
  examples, and user/API data require human classification. Do not wrap large
  amounts of code merely to satisfy the report.
- Keep technical names such as Google Maps, Search Console, OpenSEO, and Every
  App untranslated according to context; do not add broad English patterns to
  the allowlist.

## Why this is not i18next-cli yet

`i18next-cli` 1.81.0 was tested in a scratch project. It can find `t`,
`translateCurrent`, and `useT`, and `keySeparator: false` preserves literal
English keys. It is not compatible with the current dictionary contract without
a runtime migration: it writes JSON instead of reading the existing TS records,
expects `{{name}}` rather than `{name}`, and turns a `count` option into plural
`_one`/`_other` keys. Revisit it only if plurals, rich text, or another locale
justify moving to i18next.
