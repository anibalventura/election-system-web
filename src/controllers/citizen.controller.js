import Citizen from "../models/citizen.model.js";

export const getIndex = (req, res) => {
  Citizen.findAll()
    .then((result) => {
      const citizensResult = result.map((result) => result.dataValues);

      res.render("admin/citizen/index", {
        pageTitle: "Citizens",
        citizensActive: true,
        citizens: citizensResult,
        hasCitizens: citizensResult.length > 0,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getCreate = (req, res) => {
  res.render("admin/citizen/save", {
    pageTitle: "Create Citizen",
    citizensActive: true,
    editMode: false,
  });
};

export const postCreate = (req, res) => {
  const name = req.body.name;
  const lastName = req.body.lastName;
  const identificationDocument = req.body.identificationDocument;
  const email = req.body.email;

  Citizen.create({
    name: name,
    lastName: lastName,
    identificationDocument: identificationDocument,
    email: email,
    status: true,
  })
    .then(() => {
      res.redirect("/citizens");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getEdit = (req, res) => {
  const id = req.params.citizenId;

  Citizen.findOne({ where: { id: id } })
    .then((result) => {
      const citizen = result.dataValues;

      if (!citizen) {
        return res.redirect("/citizens");
      }

      res.render("admin/citizen/save", {
        pageTitle: "Create Citizen",
        citizen: citizen,
        citizensActive: true,
        editMode: true,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postEdit = (req, res) => {
  const id = req.body.citizenId;
  const name = req.body.name;
  const lastName = req.body.lastName;
  const identificationDocument = req.body.identificationDocument;
  const email = req.body.email;
  const status = req.body.status === undefined ? false : true;

  Citizen.update(
    {
      name: name,
      lastName: lastName,
      identificationDocument: identificationDocument,
      email: email,
      status: status,
    },
    { where: { id: id } }
  )
    .then(() => {
      return res.redirect("/citizens");
    })
    .catch((err) => {
      console.log(err);
    });
};
