const express = require("express");
const router = express.Router();
const controller = require("../controllers/collectibles");

/* GET users listing. */
//router.get('/', function(req, res, next) {
//  res.send('respond with a resource');
//});

router.get("/", controller.index);

router.get("/:id", controller.show);

router.post("/update", controller.update);

router.get("/upload", (req, res) => {
  res.render("update");
});

router.post("/update", controller.update);

module.exports = router;
