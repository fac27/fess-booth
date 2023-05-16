const express = require('express');
const server = express();
const { home } = require('./utils/template.js');

server.use(express.static('public'));
const bodyParser = express.urlencoded({ extended: true });

const messages = [];

server.get('/', (req, res) => {
  const body = home(messages);
  res.send(body);
});

server.post('/', bodyParser, (req, res) => {
  const { name, message } = req.body;
  const created = Date.now();
  messages.push({ name, message, created });
  res.redirect('/');
});

module.exports = server;
