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
  
  <line
      x1="20"
      y1="48"
      x2="475"
      y2="48"
      stroke="${theme.border}" />

  <text
      x="30"
      y="72"
      fill="${theme.text}"
      font-size="13">
      ${totalLabel}
  </text>

  <text
      x="470"
      y="72"
      text-anchor="end"
      fill="${theme.text}"
      font-size="13">
      ${totalLanguages}
  </text>

  <text
      x="30"
      y="92"
      fill="${theme.text}"
      font-size="13">
      ${totalBytesLabel}
  </text>

  <text
      x="470"
      y="92"
      text-anchor="end"
      fill="${theme.text}"
      font-size="13">
      ${totalBytes.toLocaleString()}
  </text>

  ${languageRows}

</svg>
`;
}