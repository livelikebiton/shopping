const express = require("express");
const userLogic = require("../business-logic-layer/cities-logic");
const errorsHelper = require("../helpers/errors-helper");
const router = express.Router();

// GET https://localhost:3001/api/cities
router.get("/", async (request, response) => {
    try {
        const cities = await userLogic.getAllCitiesAsync();
        response.json(cities);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

module.exports = router;