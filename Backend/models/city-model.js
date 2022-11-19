const mongoose = require("mongoose");

const CitySchema = mongoose.Schema({
    city : {
        type: String,
        required: [true, "missing city"],
        minLength: [2, "city need to be more then 2 letters"],
        maxLength: [20, "city can't be more then  12 letters"]
    }
}, { versionKey: false });

const CityModel = mongoose.model("CityModel", CitySchema, "cities");

module.exports = CityModel;