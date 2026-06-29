export function calculateLanguagePercentages(languages) {
  const totalSize = languages.reduce((acc, language) => acc + language.size, 0);    

    return languages.map(language => ({
        ...language,
        percentage: totalSize > 0 ? (language.size / totalSize) * 100 : 0
    }));
}   
