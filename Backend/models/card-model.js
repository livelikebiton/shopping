const mongoose = require("mongoose");

const CardSchema = mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "missing userId"]
    },
    createDate : {
        type: Date,
        required: [true, "missing createDate"]
    }
}, { versionKey: false, toJSON: { virtuals: true }, id: false });

CardSchema.virtual("user", {
    ref: "UserModel",
    localField: "userId",
    foreignField: "_id",
    justOne: true
});

const CardModel = mongoose.model("CardModel", CardSchema, "cards");

module.exports = CardModel;