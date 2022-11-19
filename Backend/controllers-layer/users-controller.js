const express = require("express");
const userLogic = require("../business-logic-layer/users-logic");
const UserModel = require("../models/user-model");
const errorsHelper = require("../helpers/errors-helper");
const router = express.Router();

// GET https://localhost:3001/api/users
router.get("/", async (request, response) => {
    try {
        const users = await userLogic.getAllUsersAsync();
        response.json(users);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

// GET https://localhost:3001/api/users/:_id
router.get("/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        const user = await userLogic.getOneUserAsync(_id);
        response.json(user);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});


module.exports = router;