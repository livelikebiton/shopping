const mongoose = require("mongoose");

const CardProductSchema = mongoose.Schema({
    cardId : {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "missing cardId"]
    },
    productId : {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "missing productId"]
    },
    amount : {
        type: Number,
        required: [true, "missing amount"]
    }
}, { versionKey: false, toJSON: { virtuals: true }, id: false });


CardProductSchema.virtual("card", {
    ref: "CardModel",
    localField: "cardId",
    foreignField: "_id",
    justOne: true
});

CardProductSchema.virtual("product", {
    ref: "ProductModel",
    localField: "productId",
    foreignField: "_id",
    justOne: true
});

const CardProductModel = mongoose.model("CardProductModel", CardProductSchema, "card-products");

module.exports = CardProductModel;