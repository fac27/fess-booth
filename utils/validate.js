const validate = (message) => {
  if (message) {
    return `<span style="color: red">${message}</span>`;
  } else {
    return '';
  }
}
module.exports = validate;
