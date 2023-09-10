const readFile = require("../utils/readFile");

module.exports = class Movies {
    static all(json) {
        return readFile(json);
    }
};
