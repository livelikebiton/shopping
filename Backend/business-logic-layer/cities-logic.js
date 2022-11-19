const mongoose = require("mongoose");
require("../data-access-layer/dal");
const CityModel = require("../models/city-model");

function getAllCitiesAsync () {
    return CityModel.find().exec();
}

module.exports = {
    getAllCitiesAsync
}