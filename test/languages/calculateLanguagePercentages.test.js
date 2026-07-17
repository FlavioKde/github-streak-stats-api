import {describe, it, expect} from 'vitest';
import {calculateLanguagePercentages} from '../../lib/languages/calculateLanguagePercentages.js';

describe('calculateLanguagePercentages', () => {
  it('should return expected percentages', () => {
    const languages = [
      { name: 'Python', size: 200, color: '#3572A5'},
      { name: 'Java', size: 150, color: '#b07219'},
      { name: 'HTML', size: 50, color: '#e34c26'}
    ];
    const result = calculateLanguagePercentages(languages);
    expect(result).toEqual([
      { name: 'Python', size: 200, color: '#3572A5', percentage: 50 },
      { name: 'Java', size: 150, color: '#b07219', percentage: 37.5 },
      { name: 'HTML', size: 50, color: '#e34c26', percentage: 12.5 }
    ]);
  });

  it('should handle empty languages array', () => {
    const languages = [];
    const result = calculateLanguagePercentages(languages);
    expect(result).toEqual([]);
  });
});

describe('calculateLanguagePercentages with zero total size', () => {
  it('should return zero percentages', () => {
    const languages = [
      { name: 'Python', size: 0, color: '#3572A5', percentage: 0 },
      { name: 'Java', size: 0, color: '#b07219', percentage: 0 }
    ];
    const result = calculateLanguagePercentages(languages);
    expect(result).toEqual([
      { name: 'Python', size: 0, color: '#3572A5', percentage: 0 },
      { name: 'Java', size: 0, color: '#b07219', percentage: 0 }
    ]);
  });
});
