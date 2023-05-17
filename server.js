const express = require('express');
const server = express();
const getEmoji = require('get-random-emoji');
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

  const errors = {};
  if (!name) {
    errors.name = 'please enter your name';
  }
  if (!message) {
    errors.message = 'please enter a message';
  }

  if (Object.keys(errors).length) {
    const body = home(messages, errors, req.body);
    res.status(400).send(body);
  } else {
    emoji = getEmoji();
    const created = Date.now();
    messages.push({ name, emoji, message, created });
    res.redirect('/');
  }
});

module.exports = server;
