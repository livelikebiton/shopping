const mongoose = require("mongoose");

const CredentialsSchema = mongoose.Schema({
    email : {
        type: String,
        required: [true, "missing email"],
        unique: true,
        minlength: [12, "email must be 12 charts"]
    },
    password : {
        type: String,
        required: [true, "missing password"],
        minLength: [4, "password need to be more then 4 letters"]
    }
}, { versionKey: false});

const CredentialsModel = mongoose.model("CredentialsModel", CredentialsSchema, "users");

module.exports = CredentialsModel;