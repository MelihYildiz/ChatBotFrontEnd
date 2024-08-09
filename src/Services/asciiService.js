// asciiService.js
export const convertToAscii = (text) => {
    return text.split('').map(char => char.charCodeAt(0)).join(' ');
  };
  