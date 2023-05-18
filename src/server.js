const express = require('express');
const server = express();
const { saveMessages, readMessages } = require('../utils/messageStore.js');
const getEmoji = require('get-random-emoji');
const { home } = require('../utils/template.js');

server.use(express.static('public'));
const bodyParser = express.urlencoded({ extended: true });

// sets store unique values of any type
const emojiSet = new Set();

server.get('/', async (req, res) => {
  // Check for messages.json file and read it if it exists
  let messages;
  console.log(messages);
  try {
    messages = await readMessages();
  } catch (err) {
    console.log('Error reading messages: ' + err);
    messages = [];
  }
  const body = home(messages);
  res.send(body);
});

server.post('/', bodyParser, async (req, res) => {
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

    // Check for messages.json file and read it if it exists
    let messages;
    try {
      messages = await readMessages();
    } catch (err) {
      console.log('Error reading messages: ' + err);
      messages = [];
    }

    messages.push({ name, emoji, message, created });
    saveMessages(messages);
    res.redirect('/');
  }
});

server.post('/delete/:emoji', async (req, res) => {
  const { emoji } = req.params;
  console.log(emoji);

  // Check for messages.json file and read it if it exists
  let messages;
  try {
    messages = await readMessages();
  } catch (err) {
    console.log('Error reading messages: ' + err);
    messages = [];
  }

  const index = messages.findIndex((message) => message.emoji === emoji);
  messages.splice(index, 1);
  saveMessages(messages);
  res.redirect('/');
});

module.exports = server;
