import { describe, it, expect } from "vitest";
import { createTranslator } from "../../lib/i18n/index.js";

describe("createTranslator", () => {    
    it("should return a function", () => {
        expect(typeof createTranslator()).toBe("function");
    });
    it("should return correct translation for specifically English locale", () => {
        const t = createTranslator("en");
        expect(t("labels.currentStreak")).toBe("Current");
    });
    it("should return fallback translation for missing keys in selected language", () => {
        const t = createTranslator("es");
        expect(t("labels.currentStreak")).toBe("Actual");
        expect(t("labels.nonexistent.key")).toBe("labels.nonexistent.key");
    });
    it("should return fallback language translation for missing language", () => {
        const t = createTranslator("fr");
        expect(t("labels.currentStreak")).toBe("Current");
    });
});