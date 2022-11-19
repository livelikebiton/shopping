const mongoose = require("mongoose");
require("../data-access-layer/dal");
const UserModel = require("../models/user-model");

function getAllUsersAsync () {
    return UserModel.find().exec();
}

function getOneUserAsync (_id) {
    return UserModel.findById(_id).exec();
}

module.exports = {
    getAllUsersAsync,
    getOneUserAsync
}