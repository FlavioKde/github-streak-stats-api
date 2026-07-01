export function buildLanguagesStats(languagesRepositories) {

    const aggregatedLanguages = aggregateLanguages(languagesRepositories);

    const totalBytes = aggregatedLanguages.reduce((sum, lang) => sum + lang.bytes, 0);

    const languagesWithPercentages = calculateLanguagePercentages(aggregatedLanguages);

    return {
        totalLanguages: languagesWithPercentages.length,
        totalBytes,
        languages: languagesWithPercentages
    };
}
