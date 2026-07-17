import { describe, it, expect } from "vitest";
import { buildLanguagesStats } from '../../lib/languages/buildLanguagesStats.js';   


describe('buildLanguagesStats', () => {
  it('should build languages stats correctly', () => {
    const repositories = [
      {
    languages: [
      { name: 'JavaScript', size: 100, color: '#f1e05a' },
    ]
  },
  {
    languages: [
      { name: 'Python', size: 200, color: '#3572A5' }
    ]
  },
  {
    languages: [
      { name: 'Java', size: 150, color: '#b07219' }
    ]
  },
  {
    languages: [
      { name: 'HTML', size: 50, color: '#e34c26' }
    ]
  }    
];

    const result = buildLanguagesStats(repositories);
    expect(result).toEqual({
      totalLanguages: 4,
      totalBytes: 500,
      languages: [
       { "color": "#3572A5",
        "name": "Python",
        "size": 200,
        "percentage": 40,
      },
      { "color": "#b07219",
        "name": "Java",
        "size": 150,
        "percentage": 30,
      },
      { "color": "#f1e05a",
        "name": "JavaScript",
        "size": 100,
        "percentage": 20
      },
      { "color": "#e34c26",
        "name": "HTML",
        "size": 50,
        "percentage": 10
      }
      ]
    });
  });


describe('buildLanguagesStats with empty data', () => {
  it('should return zero total size and empty languages array', () => {
    const repositories = [{ languages: [] }];
    const result = buildLanguagesStats(repositories);

    expect(result).toEqual({
      totalLanguages: 0,
      totalBytes: 0,
      languages: []
    });
  });
});  
});  