export function calculateLanguagePercentages(languages) {

  const totalBytes = languages.reduce((sum, lang) => sum + lang.size, 0);    

    return languages.map(language => ({
        ...language,
       
          percentage: 
          
            totalBytes === 0 ? 0 :
                   Number(((language.size / totalBytes) * 100).toFixed(2))

    }));
}   
