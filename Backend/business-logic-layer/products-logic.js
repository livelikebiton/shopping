const mongoose = require("mongoose");
require("../data-access-layer/dal");
const ProductModel = require("../models/product-model");
const CategoryModel = require("../models/category-model");
const path = require("path");

function getAllCategoryAsync() {
    return CategoryModel.find().exec();
}

function getAllProductsAsync() {
    return ProductModel.find().populate("category").exec();
}

function getProductsByCategoryAsync(categoryId) {
    return ProductModel.find({ categoryId }).populate("category").exec();
}

function getOneProductAsync(_id) {
    return ProductModel.findById(_id).populate("category").exec();
}

async function addProductAsync(product, image) {
    await product.save();
    const extension = image.name.substr(image.name.lastIndexOf("."));
    const fileName = product._id + extension;
    product.image = fileName;
    await product.save();
    const absolutePath = path.join(__dirname, "..", "assets", "images", "products", fileName);
    await image.mv(absolutePath);
    return product;
}

async function updateProductAsync(product , image) {
    const info = await ProductModel.updateOne({ _id: product._id }, product).exec();
    if (image) {
        const extension = image.name.substr(image.name.lastIndexOf("."));
        const fileName = product._id + extension;
        product.image = fileName;
        const absolutePath = path.join(__dirname, "..", "assets", "images", "products", fileName);
        await image.mv(absolutePath);
    }
    return info.n ? product : null;
}

function countAllProductsAsync() {
    return ProductModel.find().countDocuments().exec();
}

function searchByNameAsync(textToSearch) {
    return ProductModel.find({ name: { $regex: textToSearch } }).populate("category").exec();
}

module.exports = {
    getAllCategoryAsync,
    getAllProductsAsync,
    getProductsByCategoryAsync,
    getOneProductAsync,
    addProductAsync,
    updateProductAsync,
    countAllProductsAsync,
    searchByNameAsync
};