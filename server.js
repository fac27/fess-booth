const express = require("express");
const server = express();
const { home } = require("./utils/template.js");

server.use(express.static("public"));
const bodyParser = express.urlencoded({ extended: true });

const messages = [];

server.get("/", (req, res) => {
  const body = home(messages);
  res.send(body);
});

server.post("/", bodyParser, (req, res) => {
  const name = req.body.name;
  const message = req.body.message;

  const errors = {};
  if(!name){
    errors.name = "please enter your name";
  }
  if(Object.keys(errors).length){
    const body = home(messages,errors,req.body);
    res.statusCode(400).send(body);
  }else{
    const created = Date.now();
    messages.push({ name, message, created });
    res.redirect("/");
  }
});

module.exports = server;
