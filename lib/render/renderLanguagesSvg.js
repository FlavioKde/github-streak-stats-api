const CARD_WIDTH = 495;
const CARD_HEIGHT = 220;

const MAX_BAR_WIDTH = 200;

const ROW_HEIGHT = 22;

const START_Y = 108;

export function renderLanguagesSvg(data, theme, t) {

  const {
    totalLanguages,
    totalBytes,
    languages
  } = data;
  

  const title = t('languagesLabels.languagesTitle');
  const totalLabel = t('languagesLabels.totalLanguages');
  const totalBytesLabel = t('languagesLabels.totalBytes');
  const languagesLabel = t('languagesLabels.languages');

  const languageRows = languages
  .slice(0, 5)
  .map((language, index) => {

    const y = START_Y + index * ROW_HEIGHT;
    const barWidth = (language.percentage / 100) * MAX_BAR_WIDTH;

    return `
      <!-- language -->
      <circle
        cx="35"
        cy="${y - 4}"
        r="4"
        fill="${language.color}" />

      <text
        x="55"
        y="${y}"
        fill="${theme.text}"
        font-size="12"
        font-family="Segoe UI, sans-serif">
        ${language.name}
      </text>

      <!-- background -->
      <rect
        x="150"
        y="${y - 10}"
        width="${MAX_BAR_WIDTH}"
        height="10"
        rx="5"
        fill="${theme.border}" />

      <!-- value -->
      <rect
        x="150"
        y="${y - 10}"
        width="${barWidth}"
        height="10"
        rx="5"
        fill="${language.color}" />

      <text
        x="465"
        y="${y}"
        fill="${theme.text}"
        font-size="12"
        text-anchor="end">
        ${language.percentage}%
      </text>
    `;
  })
  .join("");

    return `
    <svg width="${CARD_WIDTH}" height="${CARD_HEIGHT}" viewBox="0 0 ${CARD_WIDTH} ${CARD_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" rx="12" fill="${theme.bg}" stroke="${theme.border}" />

  
    <!-- Títle -->
  <text x="50%" y="40" fill="${theme.text}" text-anchor="middle"
        font-size="22" font-family="Segoe UI, sans-serif" font-weight="600">
    ${title}
  </text>

  <!-- Total Languages -->
  
  <!-- Icon (Globe) -->
  <svg x="30" y="60" width="20" height="20" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"
            stroke="${theme.accent1}" stroke-width="2" fill="none"/>
    <path d="M2 12H22M12 2C15 5 16 9 16 12C16 15 15 19 12 22M12 2C9 5 8 9 8 12C8 15 9 19 12 22"
          stroke="${theme.accent1}" stroke-width="2" fill="none"/>
  </svg>

  <text
      x="30"
      y="72"
      fill="${theme.accent1}"
      font-size="13"
      font-weight="600">
      ${totalLabel}
  </text>

  <text
      x="470"
      y="72"
      text-anchor="end"
      fill="${theme.text}"
      font-size="13"
      font-weight="600">
      ${totalLanguages}
  </text>

  <!-- Icon (Database) -->
  <svg x="30" y="80" width="20" height="20" viewBox="0 0 24 24">
    <ellipse cx="12" cy="5" rx="8" ry="3"
             stroke="${theme.accent2}" stroke-width="2" fill="none"/>
    <path d="M4 5V12C4 14 8 15 12 15C16 15 20 14 20 12V5"
          stroke="${theme.accent2}" stroke-width="2" fill="none"/>
    <path d="M4 12V19C4 21 8 22 12 22C16 22 20 21 20 19V12"
          stroke="${theme.accent2}" stroke-width="2" fill="none"/>
  </svg>

  <text
      x="30"
      y="92"
      fill="${theme.accent2}"
      font-size="13"
      font-weight="600">
      ${totalBytesLabel}
  </text>

  <text
      x="470"
      y="92"
      text-anchor="end"
      fill="${theme.text}"
      font-size="13"
      font-weight="600">
      ${totalBytes.toLocaleString()}
  </text>

  ${languageRows}

</svg>
`;
}