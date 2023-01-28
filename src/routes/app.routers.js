const { Router } = require("express");
// const productRoutes = require("./product/product.routes");
const productRoutes = require("./product/product.mongo.routes")
const cartRoutes = require("./cart/cart.routes");

const router = Router();

router.use("/products", productRoutes);
router.use("/cart", cartRoutes);


module.exports = router;
