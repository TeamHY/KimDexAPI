const models = require("../models");

exports.index = (req, res) => {
  models.Tip.findAll().then(tips => res.json(tips));
};

exports.show = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!id) {
    return res.status(400).json({ error: "Incorrect id" });
  }

  models.Tip.findOne({
    where: {
      id: id
    }
  }).then(tip => {
    if (!tip) {
      return res.status(404).json({ error: "No Tip" });
    }

    return res.json(tip);
  });
};

exports.destroy = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!id) {
    return res.status(400).json({ error: "Incorrect id" });
  }

  models.Tip.destroy({
    where: {
      id: id
    }
  }).then(() => res.status(204).send());
};

exports.create = (req, res) => {
  const text = req.body.text || "";
  if (!text.length) {
    return res.status(400).json({ error: "Incorrenct name" });
  }

  models.Tip.create({
    text: text
  }).then(tip => res.status(201).json(tip));
};

exports.update = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!id) {
    return res.status(400).json({ error: "Incorrect id" });
  }

  const text = req.body.text || "";
  if (!text.length) {
    return res.status(400).json({ error: "Incorrenct name" });
  }

  models.Tip.update(
    {
      text: text
    },
    {
      where: {
        id: id
      }
    }
  )
    .then(() => {
      return Tip.findOne({
        where: { id: id }
      });
    })
    .then(tip => res.status(201).json(tip));
};
