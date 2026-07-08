export function formatLanguagesJsonResponse(data) {
    return {
        totalLanguages: data.totalLanguages,
        totalBytes: data.totalBytes,
        languages: data.languages
    };
}