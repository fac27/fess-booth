const test = require('node:test');
const assert = require('node:assert');
const { request } = require('../test/helpers.js');

//testing sanitization function
test('POST without nickname re-renders page with error', async () => {
  const { status, body } = await request('/', {
    method: 'POST',
    body: 'nickname=&message=hello',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
  });
  assert.equal(status, 200);
  assert.match(body, /<form/i, 'Page should include the form');
  assert.match(
    body,
    /please enter your nickname/i,
    `Expected HTML to include "please enter your nickname", but received:\n${body}`
  );
});

// test('POST request with form data', async () => {
//   const app = server.listen(9876);

//   const { status, body } = await request('/', {
//     method: 'POST',
//     body: 'name=cc&message=hello',
//     headers: { 'content-type': 'application/x-www-form-urlencoded' },
//   });
//   app.close();

//   assert.equal(status, 200);
//   assert.match(body, /cc/i);
//   assert.match(body, /hello/i);
// });
