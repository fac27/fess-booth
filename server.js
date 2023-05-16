const express = require('express');
const server = express();

server.get('/', (req, res) => {
  res.send('Hello world');
});

const sanitize = (inputString) => {
  return inputString.replace(/</g, "&lt;");
};

const validate = (message) => {
  if (message) {
    return `<span style="color: red">${message}</span>`;
  } else {
    return "";
  }
};


module.exports = server;
