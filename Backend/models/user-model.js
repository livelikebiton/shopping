const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    firstName : {
        type: String,
        required: [true, "missing first name"],
        minLength: [2, "first name need to be more then 2 letters"],
        maxLength: [12, "first name can't be more then  12 letters"]
    },
    lastName : {
        type: String,
        required: [true, "missing last name"],
        minLength: [2, "last name need to be more then 2 letters"],
        maxLength: [12, "last name can't be more then  12 letters"]
    },
    identityCard: {
        type: String,
        required: [true, "missing identity card"],
        minLength: [7, "identity Card need to be more then 7 numbers"],
        maxLength: [9, "identity Card need to be less then 9 numbers"],
        unique: true
    },
    email : {
        type: String,
        required: [true, "missing email"],
        unique: true
    },
    password : {
        type: String,
        required: [true, "missing password"],
        minLength: [4, "password need to be more then 4 letters"]
    },
    cityId : {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "missing city"]
    },
    street : {
        type: String,
        required: [true, "missing street"],
        minLength: [2, "street need to be more then 2 letters"]
    },
    isAdmin : {
        type: Boolean
    }
}, { versionKey: false, toJSON: {viruals: true}, id: false});

UserSchema.virtual("city", {
    ref: "CityModel",
    localField: "cityId",
    foreignField: "_id",
    justOne: true
});

const UserModel = mongoose.model("UserModel", UserSchema, "users");

module.exports = UserModel;