const express = require("express");
const productLogic = require("../business-logic-layer/products-logic");
const ProductModel = require("../models/product-model");
const errorsHelper = require("../helpers/errors-helper");
const fs = require("fs");
const path = require("path");
const router = express.Router();

// GET https://localhost:3001/api/products/categories
router.get("/categories", async (request, response) => {
    try {
        const categories = await productLogic.getAllCategoryAsync();
        response.json(categories);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

// GET https://localhost:3001/api/products
router.get("/", async (request, response) => {
    try {
        const products = await productLogic.getAllProductsAsync();
        response.json(products);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

// GET https://localhost:3001/api/products/by-category/:categoryId
router.get("/by-category/:categoryId", async (request, response) => {
    try {
        const categoryId = request.params.categoryId;
        const products = await productLogic.getProductsByCategoryAsync(categoryId);
        if (!products) return response.status(404).send("הקטגוריה לא נמצאה");
        response.json(products);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

// GET https://localhost:3001/api/products/:_id
router.get("/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        const product = await productLogic.getOneProductAsync(_id);
        if (!product) return response.status(404).send("המוצר לא נמצא");
        response.json(product);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

// POST https://localhost:3001/api/products
router.post("/", async (request, response) => {
    try {
        const product = new ProductModel(request.body);
        const errors = product.validateSync();
        const image = request.files?.image;
        if (errors) return response.status(400).send(errors);
        const productAdded = await productLogic.addProductAsync(product, image);
        response.status(201).json(productAdded);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

// PUT https://localhost:3001/api/products/:_id
router.put("/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        request.body._id = _id;

        const product = new ProductModel(request.body);
        const errors = product.validateSync();
        if(errors) return response.status(404).send(errors.message);

        const image = request.files && request.files.image ? request.files.image : null;
        console.log(image);
        if(!image) return response.status(400).send("Missing image.");

        const updatedProduct = await productLogic.updateProductAsync(product, image);
        if (!updatedProduct) return response.status(404).send(`המוצר לא נמצא.`);

        response.status(200).json(updatedProduct);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

// GET https://localhost:3001/api/products/count
router.get("/count", async (request, response) => {
    try {
        const count = await productLogic.countAllProductsAsync();
        response.json(count);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

// GET https://localhost:3001/api/products/search/:textToSearch
router.get("/search/:textToSearch", async (request, response) => {
    try {
        const textToSearch = request.params.textToSearch;
        const search = await productLogic.searchByNameAsync(textToSearch);
        response.json(search);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

// GET https://localhost:3001/api/products/images/:name
router.get("/images/:name", async (request, response) => {
    try {
        const name = request.params.name;
        let absolutePath = path.join(__dirname, "..","assets", "images", "products", name);
        if (!fs.existsSync(absolutePath)) {
            absolutePath = path.join(__dirname, "..","assets", "images", "not-found.jpg");
        }
        response.sendFile(absolutePath);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

module.exports = router;