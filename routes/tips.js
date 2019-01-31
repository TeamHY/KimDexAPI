const express = require("express");
const router = express.Router();
const controller = require("../controllers/tips");

router.get("/", controller.index);

router.get("/:id", controller.show);

router.delete("/:id", controller.destroy);

router.post("/", controller.create);

router.put('/:id', controller.update);

module.exports = router;
