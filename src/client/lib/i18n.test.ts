import { afterEach, describe, expect, it, vi } from "vitest";
import { setLocale, translateCurrent } from "@/client/lib/i18n";

// i18n touches window/document only through guards, so the storage fallback
// paths are exercised by stubbing a minimal browser environment. setLocale is
// the real production operation (the language control uses it): running it
// with a writable stub storage in cleanup also resets the module-level
// unsavedLocale left behind by the storage-failure test, so no state leaks.
const documentSetAttribute = vi.fn();

function stubBrowser(storage: {
  getItem?: (key: string) => string | null;
  setItem?: (key: string, value: string) => void;
}) {
  vi.stubGlobal("window", {
    localStorage: storage,
    dispatchEvent: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  });
  vi.stubGlobal("document", {
    documentElement: { setAttribute: documentSetAttribute },
  });
}

afterEach(() => {
  stubBrowser({
    getItem: () => null,
    setItem: () => {},
  });
  setLocale("en");
  vi.unstubAllGlobals();
});

describe("translateCurrent", () => {
  it("returns English outside a stored locale, translating on zh-CN", () => {
    stubBrowser({ getItem: () => null });
    expect(translateCurrent("Projects")).toBe("Projects");

    stubBrowser({ getItem: () => "zh-CN" });
    expect(translateCurrent("Projects")).toBe("项目");
  });

  it.each(["No such string", "constructor", "__proto__", "toString"])(
    "keeps an unknown message as text: %s",
    (message) => {
      stubBrowser({ getItem: () => "zh-CN" });
      expect(translateCurrent(message)).toBe(message);
    },
  );

  it("fills {name} placeholders, including in the English fallback", () => {
    stubBrowser({ getItem: () => "zh-CN" });
    expect(translateCurrent("Archive {name}", { name: "Acme" })).toBe(
      "归档 Acme",
    );

    stubBrowser({ getItem: () => null });
    expect(translateCurrent("Archive {name}", { name: "Acme" })).toBe(
      "Archive Acme",
    );
  });
});

describe("locale storage fallbacks", () => {
  it("defaults to English on malformed or unreadable stored values", () => {
    stubBrowser({ getItem: () => "fr" });
    expect(translateCurrent("Projects")).toBe("Projects");

    stubBrowser({
      getItem: () => {
        throw new Error("blocked");
      },
    });
    expect(translateCurrent("Projects")).toBe("Projects");
  });

  it("setLocale keeps the pick for the session when storage cannot store it", () => {
    stubBrowser({
      getItem: () => null,
      setItem: () => {
        throw new Error("quota");
      },
    });

    setLocale("zh-CN");

    expect(translateCurrent("Projects")).toBe("项目");
    expect(documentSetAttribute).toHaveBeenCalledWith("lang", "zh-CN");
  });
});
