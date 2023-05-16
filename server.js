const express = require("express");
const server = express();

const messages = [];

let html = /*html*/ `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>fessBooth</title>
        <link rel="stylesheet" href="style.css">
        <!-- could server the font therough public as static file for performance -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100;0,400;0,800;1,300&display=swap" rel="stylesheet">
    </head>
    <body class="stack">
        <header>
            <h1>fess-booth</h1>
        </header>
        <main>
          <!-- list of messages with random emojis -->
          <!-- strethc goals: random emoji -->
          <!-- strethc goals: click button to expand / shrink post -->
          <article class="card">
            <button class="elipsesButton"> 🎫 short summary ...</button>
            <p>user @ ${new Date().toISOString()}</p>
          </article>
          <article class="card">
            <button class="elipsesButton"> 🍖 short summary ...</button>
            <p>user @ ${new Date().toISOString()}</p>
          </article>
          <article class="card">
            <button class="elipsesButton"> 🎲 short summary ...</button>
            <p>user @ ${new Date().toISOString()}</p>
          </article>
          <article class="card">
            <button class="elipsesButton"> 👨‍🦰 short summary ...</button>
            <p>user @ ${new Date().toISOString()}</p>
          </article>
          <!-- list of messages with random emojis -->
        </main>
        <footer>
          <form action="/" method="post">
            <label for="name">Name:</label>
            <input id="name" type="text" name="name" placeholder="Name ...">
            <label for="message"> Message: </label>
            <textarea id="message" rows="4" cols="50" name="message" placeholder="Type here ...">
            </textarea>
            <button type="submit" class="submit-b"> ☑️ </button>
          </form>
          <!-- button to hide/show form as its fixed -->
        </footer>
    </body>
</html>
`;

server.use(express.static("public"));

server.get("/", (req, res) => {
  res.send(html);
});

server.post("/", (req, res) => {
  const { name, message } = req.query;
  messages.push({ name: name, message: message });
  res.redirect("/");
});

const sanitize = (inputString) => {
  return inputString.replace(/</g, "&lt;");
}

const validate = (message) => {
  if (message) {
    return `<span style="color: red">${message}</span>`;
  } else {
    return "";
  }
}


module.exports = server;
