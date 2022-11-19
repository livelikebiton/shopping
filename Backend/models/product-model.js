const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    name : {
        type: String,
        text: true,
        required: [true, "missing name"],
        minLength: [2, "name need to be more then 2 letters"],
        maxLength: [40, "name can't be more then  12 letters"]
    },
    categoryId : {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "missing category"]
    },
    price : {
        type: Number,
        required: [true, "missing price"]
    },
    image: {
        type: String,
    }
}, { versionKey: false, toJSON: { virtuals: true }, id: false });


ProductSchema.virtual("category", {
    ref: "CategoryModel",
    localField: "categoryId",
    foreignField: "_id",
    justOne: true
});

const ProductModel = mongoose.model("ProductModel", ProductSchema, "products");

module.exports = ProductModel;