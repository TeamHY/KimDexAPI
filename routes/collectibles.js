const express = require('express');
const router = express.Router();
const controller = require('../controllers/collectibles');

/* GET users listing. */
//router.get('/', function(req, res, next) {
//  res.send('respond with a resource');
//});

router.get('/', controller.index);

router.get('/:id', controller.show);

module.exports = router;
