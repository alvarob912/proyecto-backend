const { Router } = require("express");
const ProductManager = require("../../daos/fileManager/manager");
const router = Router();
const manager = new ProductManager("./src/data/cart.json");



router.get("/:cid", async (req, res) => {
    const cid = Number(req.params.cid);
    
    if (isNaN(cid)) {
        res.status(400).send("el parametro debe ser un numero");
    } else {
        res.json({
        status: "success",
        data: await manager.getProductById(cid),
        });
    }
});


router.post("/", async (req, res) => {
    res.json({
        status: "success",
        data: await manager.createCart(),
    });
});

router.post("/:cid/product/:pid", async (req, res) => {
    const cid = Number(req.params.cid);
    const pid = Number(req.params.pid);
    const data = await manager.addToCart(cid, pid)
    console.log(data)
    
    if (isNaN(cid) || isNaN(pid)) {
        res.status(400).send("ambos parametros deben ser numeros");
    } else {
        res.json({
        status: "success",
        data: data
    });
    }
});

module.exports = router;