export function aggregateLanguages(repositories) {
  const languageMap = new Map();

  for (const repo of repositories) {
   for(const lang of repo.languages) {

     const current = languageMap.get(lang.name);

     languageMap.set(lang.name, {
        name: lang.name,
        color: lang.color,
        size: (current?.size || 0) + lang.size  
      });
    }
  }

  return [...languageMap.values()].sort((a, b) => b.size - a.size);
}
