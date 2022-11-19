const express = require("express");
const cardProductLogic = require("../business-logic-layer/card-product-logic");
const CardProductModel = require("../models/card-product-model");
const errorsHelper = require("../helpers/errors-helper");
const router = express.Router();

// GET https://localhost:3001/api/cards-products/:cardId
router.get("/:cardId", async (request, response) => {
    try {
        const cardId = request.params.cardId
        const cardProducts = await cardProductLogic.getOneWithAllCardProductAsync(cardId);
        response.json(cardProducts);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

// GET https://localhost:3001/api/cards-products/:_id
router.get("/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        const cardsProduct = await cardProductLogic.getOneCardProductAsync(_id);
        if (!cardsProduct) return response.status(404).send("this card product is not found");
        response.json(cardsProduct);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

// POST https://localhost:3001/api/cards-products
router.post("/", async (request, response) => {
    try {
        const cardProduct = new CardProductModel(request.body);
        const errors = cardProduct.validateSync();
        if (errors) return response.status(400).send(errors);
        const cardProductAdded = await cardProductLogic.addProductToCardAsync(cardProduct);
        response.status(201).json(cardProductAdded);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

// DELETE https://localhost:3001/api/cards-products/:_id
router.delete("/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        await cardProductLogic.deleteOneCardProductAsync(_id);
        response.sendStatus(204);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

// DELETE https://localhost:3001/api/cards-products/clearCard/:cardId
router.delete("/clearCard/:cardId", async (request, response) => {
    try {
        const cardId = request.params.cardId;
        await cardProductLogic.deleteAllProductsInCardAsync(cardId);
        response.sendStatus(204);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

module.exports = router;