import {describe, it, expect} from 'vitest';
import { aggregateLanguages } from '../../lib/languages/aggregateLanguages.js';


describe('aggregateLanguages', () => {
  it('should aggregate languages correctly', () => {
    const repositories =[
  { 
    languages: [
      { "color": "#3572A5",
        "name": "Python",
        "size": 200
      }
    ]
  },
{
     languages: [
      { "color": "#b07219",
        "name": "Java",
        "size": 150,
      }
    ]
  },
{  
     languages: [
      { "color": "#f1e05a",
        "name": "JavaScript",
        "size": 100,
      }
    ]
  },
  {
    languages: [
      { "color": "#e34c26",
        "name": "HTML",
        "size": 50
      }
    ]
  }
];
    const result = aggregateLanguages(repositories);
    expect(result).toEqual([
      { "color": "#3572A5",
        "name": "Python",
        "size": 200,
      },
      { "color": "#b07219",
        "name": "Java",
        "size": 150,
      },
      { "color": "#f1e05a",
        "name": "JavaScript",
        "size": 100,
      },
      { "color": "#e34c26",
        "name": "HTML",
        "size": 50
      }
    ]
    );
  });
});

describe('aggregateLanguages with same language data', () => {
  it('should aggregate languages with the same name', () => {
    const repositories = [
      { languages: [{"color": "#3572A5", "name": "JavaScript", "size": 100 }] },
      { languages: [{"color": "#3572A5", "name": "JavaScript", "size": 200 }] }
    ];
    const result = aggregateLanguages(repositories);
    expect(result).toEqual([
      { "color": "#3572A5", "name": "JavaScript", "size": 300 }
    ]);
  });
});

describe('aggregateLanguages with empty data', () => {
  it('should return an empty languages array', () => {
    const repositories = [];
    const result = aggregateLanguages(repositories);
    expect(result).toEqual([]);
  });
});
  