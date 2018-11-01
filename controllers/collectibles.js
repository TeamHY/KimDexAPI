const models = require('../models');

module.exports.show = (req, res) => {
	const id = parseInt(req.params.id, 10);
	if (!id) {
		return res.status(400).send('NULL');
	}

	models.Collectible.findOne({
		where: {
			id: id
		}
	}).then(collectible => {
		if (!collectible) {
			return res.status(404).send('NULL');
		}

		return res.send(collectible)
	});
};

function getCollectibleText(collectible) {
	//return `(${collectible.}
}