const express = require("express");
const orderLogic = require("../business-logic-layer/order-logic");
const OrderModel = require("../models/order-model");
const errorsHelper = require("../helpers/errors-helper");
const router = express.Router();

// GET https://localhost:3001/api/orders/:userId
router.get("/:userId", async (request, response) => {
    try {
        const userId = request.params.userId;
        const orders = await orderLogic.getOneUserAllOrdersAsync(userId);
        response.json(orders);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

// GET https://localhost:3001/api/orders/by-user/:userId
router.get("/by-user/:userId", async (request, response) => {
    try {
        const userId = request.params.userId;
        const order = await orderLogic.getLastOrderAsync(userId);
        if (order.length > 0) {
            response.json(order[0]);
        }
        else {
            response.json(order);
        }
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

// GET https://localhost:3001/api/orders
router.get("/count", async (request, response) => {
    try {
        const count = await orderLogic.countAllOrdersAsync();
        response.json(count);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

// POST https://localhost:3001/api/orders
router.post("/", async (request, response) => {
    try {
        const order = new OrderModel(request.body);
        order.orderDate = new Date();
        const errors = order.validateSync();
        if (errors) return response.status(400).send(errors);
        const orderAdded = await orderLogic.createNewOrderAsync(order);
        response.status(201).json(orderAdded);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

module.exports = router;