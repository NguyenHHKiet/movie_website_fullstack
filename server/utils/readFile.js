const fs = require("fs");
const path = require("path");

const DATA_PATH = (json) =>
    path.join(path.dirname(process.mainModule.filename), "data", json);

const readFile = (json) => {
    return JSON.parse(
        fs.readFileSync(DATA_PATH(json), "utf8", (err, data) => {
            if (err) {
                console.error("Error: " + err);
                res.status(500).send("Internal Server Error");
                return;
            }
        })
    );
};

module.exports = readFile;
