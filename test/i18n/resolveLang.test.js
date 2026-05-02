import { describe, it, expect } from "vitest";
import { resolveLang } from "../../lib/i18n/index.js";

describe("resolveLang", () => {
  it("should return 'en' for undefined input", () => {
    expect(resolveLang()).toBe("en");
  });   
    it("should return 'en' for unsupported language", () => {
    expect(resolveLang("fr")).toBe("en");
  });
  it("should return 'en' for non-string input", () => {
    expect(resolveLang(123)).toBe("en");
  });   
    it("should return 'en' for null input", () => {
    expect(resolveLang(null)).toBe("en");
    });
    it("should return 'en' for empty string input", () => {
    expect(resolveLang("")).toBe("en");
  });
  it("should return 'en' for whitespace string input", () => {
    expect(resolveLang("   ")).toBe("en");
  });   
    it("should return 'en' for mixed case unsupported language", () => {
    expect(resolveLang("Fr")).toBe("en");
    });
    it("should return 'en' for unsupported language with whitespace", () => {
    expect(resolveLang(" fr ")).toBe("en");
  });
  it("should return 'en' for unsupported language with mixed case and whitespace", () => {
    expect(resolveLang(" Fr ")).toBe("en");
  });
    it("should return 'en' for unsupported language with non-string input", () => { 
    expect(resolveLang(123)).toBe("en");
    });
    it("should return 'en' for unsupported language with null input", () => {   
    expect(resolveLang(null)).toBe("en");
    });
    it("should return 'en' for unsupported language with empty string input", () => {   
    expect(resolveLang("")).toBe("en");
    });
    it("should return 'en' for unsupported language with whitespace string input", () => {   
    expect(resolveLang("   ")).toBe("en");
  });
    it("should return 'en' for supported language 'en'", () => {
    expect(resolveLang("en")).toBe("en");
    });
    it("should return 'es' for supported language 'es'", () => {
    expect(resolveLang("es")).toBe("es");
    }
    );
    it("should return 'en' for supported language with mixed case 'EN'", () => {
    expect(resolveLang("EN")).toBe("en");
    }   
    );
    it("should return 'es' for supported language with mixed case 'Es'", () => {
    expect(resolveLang("Es")).toBe("es");
    });
    it("should return 'en' for supported language with whitespace ' en '", () => {
    expect(resolveLang(" en ")).toBe("en");
    }   
    );
    it("should return 'es' for supported language with whitespace ' es '", () => {
    expect(resolveLang(" es ")).toBe("es");
    });
});