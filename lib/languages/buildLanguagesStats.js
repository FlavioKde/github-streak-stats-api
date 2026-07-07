import { aggregateLanguages } from './aggregateLanguages.js';
import { calculateLanguagePercentages } from './calculateLanguagePercentages.js';

export function buildLanguagesStats(repositories) {

    const aggregated = aggregateLanguages(repositories);

    const totalBytes = aggregated.reduce((sum, lang) => sum + lang.size, 0);

    const languages = calculateLanguagePercentages(aggregated);

    return {
        totalLanguages: languages.length,
        totalBytes,
        languages
    };
}
