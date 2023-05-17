// const sanitize = require("./sanitize.js");
// const validate = require("./validate.js");

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

const home = (posts, errors = {}, values ={}) => {
  const title = "All posts";
  const content = /*html*/ `
    <header>
      <h1>(con)fess-booth</h1>
        </header>
      <main class="flex col">
        <!-- list of messages with random emojis -->
        <!-- strethc goals: click button to expand / shrink post -->
        <!-- ${demoMessages} -->
        ${posts.map(postItem).join("")}
        <!-- list of messages with random emojis -->
      </main>
      <footer>
        <input aria-label="hide or show form" type="checkbox" id="toggle" display="none"/>
        <form class="flex col" action="/" method="post">
          <label for="name">Name 📛 :</label>
          <input id="name" type="text" name="name" placeholder="Name ..." value = "${values.name ? sanitize(values.name) : ""}">
          <p>${validation(errors.name)}</p>
          <label for="message"> Message 💬 : </label>
          <textarea id="message" rows="4" cols="50" name="message" placeholder="Type here ..." >${values.message ? sanitize(values.message) : ""}</textarea>
          <p>${validation(errors.message)}</p>
          <button type="submit" class="submit-button mt"> 🆗 </button>
        </form>
      </footer>
  `;

  return layout(title, content);
}

const postItem = (post) => {
  const date = new Date(post.created);
  const prettyDate = date.toLocaleString("en-GB");

  return `
  <article class="card">
    <button > ${sanitize(post.message)} </button>
    <p> ${sanitise(post.name)} @ ${prettyDate}</p>
  </article>
  `;
}

const layout = (title, content) => {
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
