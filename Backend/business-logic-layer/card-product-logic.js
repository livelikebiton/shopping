const mongoose = require("mongoose");
require("../data-access-layer/dal");
const CardProductModel = require("../models/card-product-model");

function getOneWithAllCardProductAsync (cardId) {
    return CardProductModel.find({cardId}).populate(["card","product"]).exec();
}

function getOneCardProductAsync (_id) {
    return CardProductModel.findById(_id).populate(["card","product"]).exec();
}

function addProductToCardAsync (cardProduct) {
    return cardProduct.save();
}

function deleteOneCardProductAsync (_id) {
    return CardProductModel.deleteOne({ _id }).exec();
}

function deleteAllProductsInCardAsync (cardId) {
    return CardProductModel.deleteMany({ cardId }).exec();
}


module.exports = {
    getOneWithAllCardProductAsync,
    getOneCardProductAsync,
    addProductToCardAsync,
    deleteOneCardProductAsync,
    deleteAllProductsInCardAsync
};