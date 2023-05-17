const sanitize = (inputString) => {
  return inputString.replace(/</g, '&lt;');
};

module.exports = sanitize;
