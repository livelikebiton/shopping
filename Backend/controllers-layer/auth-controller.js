const express = require("express")
const authLogic = require("../business-logic-layer/auth-logic");
const userLogic = require("../business-logic-layer/users-logic");
const UserModel = require("../models/user-model");
const errorsHelper = require("../helpers/errors-helper");
const CredentialsModel = require("../models/credentials-model");
const router = express.Router();

// POST https://localhost:3001/api/auth/register
router.post("/register", async (request, response) => {
    try {
        const user = new UserModel(request.body);

        const errors = user.validateSync();
        if (errors) return response.status(400).send(errors);

        const userAdded = await authLogic.registerAsync(user);
        response.status(201).json(userAdded);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

// POST https://localhost:3001/api/auth/login
router.post("/login", async (request, response) => {
    try {
        const loginToUser = new CredentialsModel(request.body);

        const errors = loginToUser.validateSync();
        if(errors) return response.status(400).send(errors);

        const loggedInUser = await authLogic.loginAsync(loginToUser);
        if (!loggedInUser) return response.status(401).send("Incorrect username or password.");
        
        response.json(loggedInUser);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

module.exports = router;