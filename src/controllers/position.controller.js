import Position from "../models/position.model.js";

export const getIndex = (req, res) => {
  Position.findAll()
    .then((result) => {
      const positionsResult = result.map((result) => result.dataValues);

      res.render("position/index", {
        pageTitle: "Positions",
        positionsActive: true,
        positions: positionsResult,
        hasPositions: positionsResult.length > 0,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getCreate = (req, res) => {
  res.render("position/save", {
    pageTitle: "Create Position",
    positionsActive: true,
    editMode: false,
  });
};

export const postCreate = (req, res) => {
  const name = req.body.name;
  const description = req.body.description;

  Position.create({
    name: name,
    description: description,
    status: true,
  })
    .then(() => {
      res.redirect("/positions");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getEdit = (req, res) => {
  const id = req.params.positionId;

  Position.findOne({ where: { id: id } })
    .then((result) => {
      const position = result.dataValues;

      if (!position) {
        return res.redirect("/positions");
      }

      res.render("position/save", {
        pageTitle: "Create Position",
        position: position,
        positionsActive: true,
        editMode: true,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postEdit = (req, res) => {
  const id = req.body.positionId;
  const name = req.body.name;
  const description = req.body.description;
  const status = req.body.status === undefined ? false : true;

  Position.update(
    {
      name: name,
      description: description,
      status: status,
    },
    { where: { id: id } }
  )
    .then(() => {
      return res.redirect("/positions");
    })
    .catch((err) => {
      console.log(err);
    });
};
