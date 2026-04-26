import en from "./locales/en.js";
import es from "./locales/es.js";

const locales = {
  en,
  es,
};

export function resolveLang(lang = "en") {
    const normalized= String(lang).toLowerCase();
  return locales[normalized] ? normalized : "en";
}

export function createTranslator(lang = "en") {
  const selected  = locales[resolveLang(lang)];
  const fallback = locales.en;

  return function translate(path) {
    return get(selected, path) 
    ?? get(fallback, path) 
    ?? path;
  };
}
  export function translateError(error, t) {
   const key =
    error?.name ||
    error?.constructor?.name ||
    "UnknownError";

  return t(`errors.${key}`) || t("errors.UnknownError");
}

  function get(obj, path) {
    return path
     .split('.')
     .reduce((acc, key) => acc?.[key], obj);
}
   