global.config = require(process.env.NODE_ENV === "production" ? "./config-prod.json" : "./config-dev.json");
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const authController = require("./controllers-layer/auth-controller");
const userController = require("./controllers-layer/users-controller");
const citiesController = require("./controllers-layer/cities-controller");
const cardController = require("./controllers-layer/card-controller");
const cardProductsController = require("./controllers-layer/card-product-controller");
const productController = require("./controllers-layer/products-controller");
const orderController = require("./controllers-layer/order-controller");

const server = express();

server.use(cors());
server.use(express.json());
server.use(fileUpload());

server.use("/api/auth", authController);
server.use("/api/users", userController);
server.use("/api/cities", citiesController);
server.use("/api/cards", cardController);
server.use("/api/cards-products", cardProductsController);
server.use("/api/products", productController);
server.use("/api/orders", orderController);

server.listen(3001, () => console.log("Listening.."));