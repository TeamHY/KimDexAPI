const models = require("../models");

module.exports.show = (req, res) => {
  if (req.params.id == "upload") {
    return res.render("upload");
  }

  const id = parseInt(req.params.id, 10);
  if (!id) {
    return res.status(400).send("NULL");
  }

  models.Collectible.findOne({
    where: {
      id: id
    }
  }).then(collectible => {
    if (!collectible) {
      return res.status(404).send("NULL");
    }

    return res.send(getCollectibleText(collectible));
  });
};

module.exports.update = (req, res) => {
  const texts = req.body.notepad_text.split(/\r\n\r\n|\r\r|\n\n/);
  const reg = /^\s*\((\d{3})\)(.*)\((P|A)\)\s:\s(.*)\s*$/;

  for (let i in texts) {
    if (!texts[i]) {
      continue;
    }

    models.Collectible.findOne({
      where: {
        id: texts[i].replace(reg, "$1")
      }
    }).then(collectible => {
      if (!collectible) {
        models.Collectible.create({
          id: texts[i].replace(reg, "$1"),
          name: texts[i].replace(reg, "$2"),
          actived: texts[i].replace(reg, "$3") === "A" ? "1" : "0",
          description: texts[i].replace(reg, "$4")
        }).then(() => {
          res.status(201);
        }).catch(err => {
          console.error(err);
        });
      } else {
        models.Collectible.update(
          {
            name: texts[i].replace(reg, "$2"),
            actived: texts[i].replace(reg, "$3") === "A" ? "1" : "0",
            description: texts[i].replace(reg, "$4")
          },
          { where: { id: texts[i].replace(reg, "$1") } }
        ).then(() => {
          res.status(201);
        }).catch(err => {
          console.error(err);
        });
      }
    });
  }
};

function getCollectibleText(collectible) {
  return `(${pad(collectible.id, 3)})${collectible.name}(${
    collectible.actived ? "A" : "P"
  }): ${collectible.description}`;
}

function pad(n, width) {
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join("0") + n;
}
