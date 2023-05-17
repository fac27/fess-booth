const test = require('node:test');
const assert = require('node:assert');
const { request } = require('../test/helpers.js');

test('GET home page', async () => {
  const { status, body } = await request('/', {
    method: 'GET',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
  });
  assert.equal(status, 200);
  assert.match(body, /<form/i, 'Page should include the form');

  // Add more assertions as needed to test the content of the home page
});

//testing sanitization function
test('POST without name or message re-renders page with both errors', async () => {
  const { status, body } = await request('/', {
    method: 'POST',
    body: 'nickname=&message=',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
  });
  assert.equal(status, 400);
  assert.match(body, /<form/i, 'Page should include the form');
  assert.match(
    body,
    /please enter your name/i,
    `Expected HTML to include "please enter your nickname", but received:\n${body}`
  );
  assert.match(
    body,
    /please enter a message/i,
    `Expected HTML to include "please enter a message", but received:\n${body}`
  );
});
