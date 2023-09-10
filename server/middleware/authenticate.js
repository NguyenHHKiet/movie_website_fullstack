const readFile = require("../utils/readFile");

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send("Unauthorized");
    }

    const token = authHeader;

    const tokenSecret = readFile("userToken.json").find(
        (item) => item.token === token
    );
    if (!tokenSecret) return res.status(401).send("Unauthorized");

    // res.status(200).send("Authenticated");

    next();
};

module.exports = authenticate;
