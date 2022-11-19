const mongoose = require("mongoose");
require("../data-access-layer/dal");
const CardModel = require("../models/card-model");

function openNewCardAsync(card) {
    return card.save();
}

function getLastCardAsync (userId) {
    return CardModel.find({userId}).sort({"createDate": -1}).limit(1).populate("user").exec();
}

function getOneCardAsync (_id) {
    return CardModel.findById(_id).populate("user").exec();
}

function getAllCardsOfUserAsync (userId) {
    return CardModel.find({userId}).populate(userId).exec();
}

module.exports = {
    openNewCardAsync,
    getLastCardAsync,
    getOneCardAsync,
    getAllCardsOfUserAsync
};