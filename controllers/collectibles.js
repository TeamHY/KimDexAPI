const models = require('../models');

module.exports.index = (req, res) => {
	/*
	models.Collectible.findAll()
		.then(collectibles => {
			let string = '';

			for (const coll in collectibles){
				string = string + getCollectibleText(coll)
			}
		});
	*/

	models.Collectible.findAll()
		.then(collectibles => res.json(collectibles));
};

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

		return res.send(getCollectibleText(collectible))
	});
};

function getCollectibleText(collectible) {
	return `(${pad(collectible.id, 3)})${collectible.name}(${collectible.actived ? 'A' : 'P'}): ${collectible.description}`
}
		
function pad(n, width) {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}