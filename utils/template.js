const sanitize = require("./sanitize.js");

const demoMessages = /*html*/ `
<article class="card">
<button > 🎫 short summary ...</button>
<p>user @ ${new Date().toISOString()}</p>
</article>
<article class="card">
<button > 🍖 short summary ...</button>
<p>user @ ${new Date().toISOString()}</p>
</article>
<article class="card">
<button > 🎲 short summary ...</button>
<p>user @ ${new Date().toISOString()}</p>
</article>
<article class="card">
<button > 👨‍🦰 short summary ...</button>
<p>user @ ${new Date().toISOString()}</p>
</article>
<article class="card">
<button > 🎫 short summary ...</button>
<p>user @ ${new Date().toISOString()}</p>
</article>
<article class="card">
<button > 🍖 short summary ...</button>
<p>user @ ${new Date().toISOString()}</p>
</article>
<article class="card">
<button > 🎲 short summary ...</button>
<p>user @ ${new Date().toISOString()}</p>
</article>
<article class="card">
<button > 👨‍🦰 short summary ...</button>
<p>user @ ${new Date().toISOString()}</p>
</article>
`;

function home(posts) {
  const title = "All posts";
  const content = /*html*/ `
    <header>
      <h1>(con)fess-booth</h1>
        </header>
      <main class="flex col">
        <!-- list of messages with random emojis -->
        <!-- strethc goals: click button to expand / shrink post -->
        ${demoMessages}
        <!-- ${posts.map(postItem).join("")} -->
        <!-- list of messages with random emojis -->
      </main>
      <footer>
        <input aria-label="hide or show form" type="checkbox" id="toggle" display="none"/>
        <form class="flex col" action="/" method="post">
          <label for="name">Name 📛 :</label>
          <input id="name" type="text" name="name" placeholder="Name ...">
          <label for="message"> Message 💬 : </label>
          <textarea id="message" rows="4" cols="50" name="message" placeholder="Type here ..." ></textarea>
          <button type="submit" class="submit-button mt"> 🆗 </button>
        </form>
      </footer>
  `;

  return layout(title, content);
}

function postItem(post) {
  const date = new Date(post.created);
  const prettyDate = date.toLocaleString("en-GB");

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
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>fessBooth</title>
        <link rel="stylesheet" href="style.css">
        <link rel="shortcut icon" href="favicon.svg" type="image/x-icon">
        <!-- could server the font therough public as static file for performance -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100;0,400;0,800;1,300&display=swap" rel="stylesheet">
      </head>
      <body>
        ${content}
      </body>
    </html>
  `;
}

module.exports = { home };
