export function aggregateLanguages(languagesData) {
  const languageMap = new Map();

  for (const repo of languagesData) {
   for(const lang of repo) {
     const current = languageMap.get(lang.name);

     languageMap.set(lang.name, {
        name: lang.name,
        color: lang.color,
        size: (current?.size || 0) + lang.size  
      });
    }
  }

  return Array.from(languageMap.values()).sort((a, b) => b.size - a.size);
}
