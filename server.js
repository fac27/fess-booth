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
    </head>
    <body>
        <header>
            <h1>Let it out</h1>
        </header>
        <section>
            <!-- list of messages -->
        </section>
        <form action="/" method="post">
            <label for="name">Name:</label>
            <input id="name" type="text" name="name">
            <label for="message"> Message: </label>
            <textarea id="message" rows="4" cols="50" name="message">
            </textarea>
        </form>
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

module.exports = server;
