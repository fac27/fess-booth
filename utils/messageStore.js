const {readFile, writeFile, appendFile} = require("fs");

const filePath = "./data/messages.json";

const saveMessages = (messages) => {
    return new Promise((resolve, reject) => {
        writeFile(filePath, JSON.stringify(messages), (err) => {
        if(err){
            console.log("Error saving messages: " + err);
            reject(err);
        }else{
            console.log("messages.json saved successfully");
            resolve();
        }
        });
    });
};

module.exports = {saveMessages};