import * as React from "react";
import { zhCN } from "@/client/lib/i18n-messages";

export type Locale = "en" | "zh-CN";

const LOCALE_STORAGE_KEY = "locale-preference";
const LOCALE_CHANGE_EVENT = "locale-preference-change";

export const LOCALE_OPTIONS: { value: Locale; label: string }[] = [
  { value: "en", label: "English" },
  { value: "zh-CN", label: "简体中文" },
];

// Each option shows its own name (English reads "English", Chinese reads
// 简体中文), so the labels above are intentionally not translated.

// Set when localStorage cannot store a pick (private browsing, strict modes,
// a full quota): the pick then holds for this page session and wins over
// whatever localStorage still returns. Same strategy as theme.ts.
let unsavedLocale: Locale | null = null;

function isLocale(value: unknown): value is Locale {
  return value === "en" || value === "zh-CN";
}

function readLocale(): Locale {
  if (typeof window === "undefined") {
    return "en";
  }
  if (unsavedLocale) {
    return unsavedLocale;
  }

  try {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (isLocale(stored)) {
      return stored;
    }
    return "en";
  } catch {
    return "en";
  }
}

function writeLocale(locale: Locale) {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    unsavedLocale = null;
  } catch {
    unsavedLocale = locale;
  }
}

function applyLocale(locale: Locale) {
  if (typeof document === "undefined") {
    return;
  }
  document.documentElement.setAttribute("lang", locale);
}

/** Set the UI locale; the real production entry point behind the language
 * control, usable from non-React code too. Persists when storage allows. */
export function setLocale(locale: Locale) {
  writeLocale(locale);
  applyLocale(locale);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(LOCALE_CHANGE_EVENT));
  }
}

function subscribeToLocale(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handleChange = () => {
    onStoreChange();
  };

  const handleStorage = (event: StorageEvent) => {
    if (event.key && event.key !== LOCALE_STORAGE_KEY) {
      return;
    }
    // Another tab changed the locale; keep this document's lang in sync.
    applyLocale(readLocale());
    onStoreChange();
  };

  window.addEventListener(LOCALE_CHANGE_EVENT, handleChange);
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener(LOCALE_CHANGE_EVENT, handleChange);
    window.removeEventListener("storage", handleStorage);
  };
}

/**
 * Reactive locale for React UI. Reading the store on every render (instead of
 * freezing it in module-scope constants) keeps static data like nav labels
 * and validation schemas translatable: those hold English source text, and
 * the components that render them translate on the current locale. Switching
 * happens through the exported setLocale, so the language control does not
 * need a second hook return.
 */
export function useLocale() {
  const locale = React.useSyncExternalStore<Locale>(
    subscribeToLocale,
    readLocale,
    () => "en",
  );

  React.useEffect(() => {
    applyLocale(locale);
  }, [locale]);

  return locale;
}

function interpolate(text: string, vars?: Record<string, string | number>) {
  if (!vars) return text;
  return text.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in vars ? String(vars[name]) : match,
  );
}

/**
 * Translate `key` into `locale`. Keys are the English source text, so the
 * fallback for a missing entry is the key itself: English by construction.
 * Lookup skips inherited properties, so arbitrary strings (server error
 * messages, user data) always fall back instead of resolving e.g.
 * "constructor" through the prototype chain. `vars` fills `{name}`
 * placeholders; it also works on the untranslated fallback, so templated
 * strings need no English dictionary entry.
 */
function translate(
  locale: Locale,
  key: string,
  vars?: Record<string, string | number>,
): string {
  const text =
    (locale === "zh-CN" && Object.hasOwn(zhCN, key) ? zhCN[key] : undefined) ??
    key;
  return interpolate(text, vars);
}

/** The current locale for non-React code, e.g. client date formatting. */
export function currentLocale(): Locale {
  return readLocale();
}

/** Translate on the current locale, for plain (non-React) helpers like toasts. */
export function translateCurrent(
  key: string,
  vars?: Record<string, string | number>,
): string {
  return translate(readLocale(), key, vars);
}

/** Translation function bound to the current locale, reactive in React. */
export function useT() {
  const locale = React.useSyncExternalStore<Locale>(
    subscribeToLocale,
    readLocale,
    () => "en",
  );
  return React.useCallback(
    (key: string, vars?: Record<string, string | number>) =>
      translate(locale, key, vars),
    [locale],
  );
}

// Runs before first paint, mirroring themePreferenceInitScript, so the html
// lang attribute already matches the stored locale when the UI appears.
export const localeInitScript = `(() => {
  try {
    var l = window.localStorage.getItem(${JSON.stringify(LOCALE_STORAGE_KEY)});
    document.documentElement.setAttribute("lang", l === "zh-CN" ? "zh-CN" : "en");
  } catch {
    document.documentElement.setAttribute("lang", "en");
  }
})();`;
