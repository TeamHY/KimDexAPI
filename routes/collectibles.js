const express = require('express');
const router = express.Router();
const controller = require('../controllers/collectibles');

/* GET users listing. */
//router.get('/', function(req, res, next) {
//  res.send('respond with a resource');
//});

router.get('/', (req, res) => {
	res.send('검색어를 입력해주세요.')
});

router.get('/:id', controller.show);

router.get('/upload', (req, res) => {
	res.render('update')
});

router.post('/update', controller.update);

module.exports = router;
