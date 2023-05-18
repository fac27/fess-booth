const characterMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;',
  '!': '&#x21;',
  '(': '&#x28;',
  ')': '&#x29;',
  '+': '&#x2B;',
  '-': '&#x2D;'
};

const sanitize = (inputString) => {
  let sanitizedString = inputString;
  for (const char in characterMap ) {
      sanitizedString = sanitizedString.split(char).join(characterMap [char]);
  }
  return sanitizedString;
};


module.exports = sanitize;
