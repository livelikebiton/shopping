const jwt = require("jsonwebtoken");

function getNewToken(user) { 
    return jwt.sign({ payload: user }, config.jwtKey, { expiresIn: "5h" });
}

module.exports = {
    getNewToken
};