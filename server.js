const express = require('express');
const server = express();
const { saveMessages } = require("./utils/messageStore.js");
const getEmoji = require('get-random-emoji');
const { home } = require('./utils/template.js');

server.use(express.static('public'));
const bodyParser = express.urlencoded({ extended: true });

const messages = [];
// sets store unique values of any type
const emojiSet = new Set();

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
    let emoji = getEmoji();
    let newEmoji = false;
    while (!newEmoji) {
      if (emojiSet.has(emoji)) {
        emoji = getEmoji();
      } else {
        newEmoji = true;
      }
    }
    emojiSet.add(emoji);
    const created = Date.now();

    messages.push({ name, emoji, message, created });
    saveMessages(messages);
    res.redirect('/');
  }
});

server.post('/delete/:emoji', (req, res) => {
  const { emoji } = req.params;
  console.log(emoji);
  const index = messages.findIndex((message) => message.emoji === emoji);
  messages.splice(index, 1);
  saveMessages(messages);
  res.redirect('/');
});

module.exports = server;
