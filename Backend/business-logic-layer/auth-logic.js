const mongoose = require("mongoose");
require("../data-access-layer/dal");
const UserModel = require("../business-logic-layer/products-logic");
const jwtHelper = require("../helpers/jwt-helper");
const cryptoHelper = require("../helpers/crypto-helper");
const CredentialsModel = require("../models/credentials-model");

function registerAsync (user) {
    user.password = cryptoHelper.hash(user.password);
    user.identityCard = cryptoHelper.hash(user.identityCard);
    user.isAdmin = 0;
    user.token = jwtHelper.getNewToken(user);
    delete user.password;
    return user.save();
}

async function loginAsync(credentials) {
    credentials.password = cryptoHelper.hash(credentials.password);
    credentials.token = jwtHelper.getNewToken(credentials);
    const users = await CredentialsModel.find({ email: credentials.email , password: credentials.password }).exec();
    return users[0];
} 

module.exports = {
    registerAsync,
    loginAsync
}