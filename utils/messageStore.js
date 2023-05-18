const { readFile, writeFile } = require('fs');

const filePath = '../messages.json';

const saveMessages = (messages) => {
  return new Promise((resolve, reject) => {
    writeFile(filePath, JSON.stringify(messages, null, 2), (err) => {
      if (err) {
        console.log('Error saving messages: ' + err);
        reject(err);
      } else {
        console.log('messages.json saved successfully');
        resolve();
      }
    });
  });
};

const readMessages = () => {
  return new Promise((resolve, reject) => {
    readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.log('Error reading messages: ' + err);
        reject(err);
      } else {
        console.log('messages.json read successfully');
        resolve(JSON.parse(data));
      }
    });
  });
};

module.exports = { saveMessages, readMessages };
