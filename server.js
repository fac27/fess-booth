const express = require("express");
const server = express();
const { home } = require("./utils/template.js");
const { saveMessages } = require("./utils/messageStore.js");

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
  if(!message){
    errors.message = "please enter a message";
  }
  if(Object.keys(errors).length){
    const body = home(messages,errors,req.body);
    res.status(400).send(body);
  }else{
    const created = Date.now();
    messages.push({ name, message, created });
    saveMessages(messages);
    res.redirect("/");
  }
});

module.exports = server;