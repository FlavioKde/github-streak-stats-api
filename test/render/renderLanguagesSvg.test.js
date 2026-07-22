import { describe, expect, it } from 'vitest';
import { renderLanguagesSvg } from '../../lib/render/renderLanguagesSvg.js';

describe('renderLanguagesSvg', () => {
  it('should render SVG with correct data and theme', () => {
    const data = {
        totalLanguages: 3,
        totalBytes: 1000,
        languages: [
            { name: 'JavaScript', size: 500, color: '#f1e05a', percentage: 50 },
            { name: 'Python', size: 300, color: '#3572A5', percentage: 30 },
            { name: 'HTML', size: 200, color: '#e34c26', percentage: 20 }
        ]
    };   
    
    const theme = {
        bg: '#ffffff',
        border: '#cccccc',
        text: '#333333',
        accent1: '#ff0000',
        accent2: '#0000ff'
    };

    const totalLanguages = data.totalLanguages;
    const totalBytes = data.totalBytes;
    const languages = data.languages;
    
    const t = (key) => key;

    const svg = renderLanguagesSvg(data, theme, t);

    expect(svg).toContain(`${totalLanguages}`);
    expect(svg).toContain(`${totalBytes.toLocaleString()}`);
    languages.forEach(language => {
        expect(svg).toContain(`${language.name}`);
        expect(svg).toContain(`${language.percentage}`);
        expect(svg).toContain(`fill="${language.color}"`);
    });

    expect(svg).toContain(`fill="${theme.bg}"`);
    expect(svg).toContain(`stroke="${theme.border}"`);
    expect(svg).toContain(`fill="${theme.text}"`);
    expect(svg).toContain(`fill="${theme.accent1}"`);
    expect(svg).toContain(`fill="${theme.accent2}"`);
  }); 
});

