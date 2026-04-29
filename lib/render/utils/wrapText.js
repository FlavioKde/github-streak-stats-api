export function wrapText(text, charLimit = 40) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = ''; 

    for (const word of words) { 
        if ((currentLine + word).length > charLimit) {
            lines.push(currentLine.trim());
            currentLine = word + ' ';
        } else {
            currentLine += word + ' ';
        }
    }
    if (currentLine) {
    lines.push(currentLine.trim());

    }
    return lines;
}