const sanitize = require('./sanitize.js');

function home(posts) {
  const title = 'All posts';
  const content = /*html*/ `
    <h2>New post</h2>
    <form method="POST">
        <label for="name">Name:</label>
        <input id="name" type="text" name="name" placeholder="name...">
        <label for="message"> Message: </label>
        <textarea id="message" rows="6" cols="60" name="message" placeholder="forgive me father..."></textarea>
        <button type="submit" class="submit-b"> ☑️ </button>
    </form>
    <h2>All posts</h2>
    <ul>
      ${posts.map(postItem).join('')}
    </ul>
  `;

  return layout(title, content);
}

function postItem(post) {
  const date = new Date(post.created);
  const prettyDate = date.toLocaleString('en-GB');

  const newMessage = sanitize(post.message);

  return `
    <li>
      <p>${newMessage}</p>
      <p>—${post.name} | ${prettyDate}</p>
    </li>
  `;
}

function layout(title, content) {
  return /*html*/ `
    <!doctype html>
    <html>
      <head>
        <title>${title}</title>
        <link rel="stylesheet" href="style.css">
        <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>
      <body>
        ${content}
      </body>
    </html>
  `;
}

module.exports = { home };
