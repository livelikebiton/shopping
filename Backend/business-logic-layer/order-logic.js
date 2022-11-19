const mongoose = require("mongoose");
require("../data-access-layer/dal");
const OrderModel = require("../models/order-model");

function getOneUserAllOrdersAsync (userId) {
    return OrderModel.find({userId}).populate(["user","card"]).exec();
}

function getLastOrderAsync (userId) {
    return OrderModel.find({userId}).sort({"orderDate": -1}).limit(1).populate(["user","card"]).exec();
}

function countAllOrdersAsync () {
    return OrderModel.find().countDocuments().exec();
}

function createNewOrderAsync (order) {
    return order.save();
}

module.exports = {
    getOneUserAllOrdersAsync,
    getLastOrderAsync,
    countAllOrdersAsync,
    createNewOrderAsync
};