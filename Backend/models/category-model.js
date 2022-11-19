const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
    name : {
        type: String,
        required: [true, "missing name"],
        minLength: [2, "name need to be more then 2 letters"],
        maxLength: [12, "name can't be more then  12 letters"]
    }
}, { versionKey: false });

const CategoryModel = mongoose.model("CategoryModel", CategorySchema, "categories");

module.exports = CategoryModel;