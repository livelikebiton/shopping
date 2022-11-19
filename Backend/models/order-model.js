const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "missing userId"]
    },
    cardId : {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "missing cardId"]
    },
    price : {
        type: Number,
        required: [true, "missing price"],
        min: [1, "the price need to be a positive number"],
        max: [10000, "the final price can't pass 10,000"]
    },
    cityId : {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "missing city"]
    },
    street: {
        type: String,
        required: [true, "missing street"],
        minlength: [2, "minimum 2 letters for the street name"],
        maxlength: [20, "maximum 20 letters for the street name"]
    },
    deliveryDate: {
        type: Date,
        required: [true, "missing deliveryDate"]
    },
    orderDate: {
        type: Date,
        required: [true, "missing orderDate"]
    },
    creditCard: {
        type: Number,
        required: [true, "missing creditCard"],
        minlength: [16, "minimum 2 letters for the street name"],
        maxlength: [16, "maximum 20 letters for the street name"]
    }
}, { versionKey: false, toJSON: { virtuals: true }, id: false });

OrderSchema.virtual("user", {
    ref: "UserModel",
    localField: "userId",
    foreignField: "_id",
    justOne: true
});

OrderSchema.virtual("card", {
    ref: "CardModel",
    localField: "cardId",
    foreignField: "_id",
    justOne: true
});

OrderSchema.virtual("city", {
    ref: "CityModel",
    localField: "cityId",
    foreignField: "_id",
    justOne: true
});

const OrderModel = mongoose.model("OrderModel", OrderSchema, "orders");

module.exports = OrderModel;