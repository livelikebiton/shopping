const express = require("express");
const cardLogic = require("../business-logic-layer/card-logic");
const CardModel = require("../models/card-model");
const errorsHelper = require("../helpers/errors-helper");
const router = express.Router();

// POST https://localhost:3001/api/cards/
router.post("/", async (request, response) => {
    try {
        const card = new CardModel(request.body);
        card.createDate = new Date();
        const errors = card.validateSync();
        if (errors) return response.status(400).send(errors);
        const cardAdded = await cardLogic.openNewCardAsync(card);
        response.status(201).json(cardAdded);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

// GET https://localhost:3001/api/cards
router.get("/by-date/:userId", async (request, response) => {
    try {
        const userId = request.params.userId;
        const card = await cardLogic.getLastCardAsync(userId);
        if (card.length > 0) {
            response.json(card[0]);
        }
        else {
            response.json(card);
        }
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});


// GET https://localhost:3001/api/cards/:_id
router.get("/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        const card = await cardLogic.getOneCardAsync(_id);
        if (!card) return response.status(404).send("card is not found");
        response.json(card);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

// GET https://localhost:3001/api/cards/by-user/:userId
router.get("/by-user/:userId", async (request, response) => {
    try {
        const userId = request.params.userId;
        const cards = await cardLogic.getAllCardsOfUserAsync(userId);
        response.json(cards);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

module.exports = router;