const sanitize = (inputString) => {
  let sanitizedString = inputString;
  
  const characterMap = {
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    '"': '&quot;',
    "'": '&#x27;',
    "/": '&#x2F;',
    "`": '&#x60;',
    "=": '&#x3D;',
    "!": '&#x21;',
    "(": '&#x28;',
    ")": '&#x29;',
    ";": '&#x3B;',
    "+": '&#x2B;',
    "-": '&#x2D;'
  };

  for (let character in characterMap) {
    const replacement = characterMap[character];
    sanitizedString = sanitizedString.replace(new RegExp("\\"+ character, 'g'), replacement);
  }

  return sanitizedString;
};


module.exports = sanitize;
