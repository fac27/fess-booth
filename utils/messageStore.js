const {readFile, writeFile, appendFile} = require("fs");

const filePath = "./data/messages.json";

const saveMessages = (messages) => {
    return new Promise((resolve, reject) => {
        appendFile(filePath, JSON.stringify(messages), (err) => {
        if(err){
            console.log("ERROR: " + err);
            reject(err);
        }else{
            console.log("There was no error");
            resolve();
        }
        });
    });
};

const updateFile = async (data) => {
    try {
        const existingData = await readFile(filePath, 'utf8');
        const existingArray = JSON.parse(existingData);

        existingArray.push(data);

        await writeFile(filePath, JSON.stringify(existingArray), 'utf8');
        console.log("JSON file has been updated successfully");
    }
    catch (error) {
        console.log("Error updating JSON file", error);
    }
}

module.exports = {saveMessages};
module.exports = {updateFile};