import Citizen from "../models/citizen.model.js";
import Election from "../models/election.model.js";

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
  Election.findAll()
    .then((result) => {
      const electionsResult = result.map((result) => result.dataValues);
      let activeElection = false;

      electionsResult.forEach((election) => {
        if (election.status) {
          activeElection = election.status;
        }
      });

      if (activeElection) {
        req.flash("errors", "Cannot create parties on an active election.");
        res.redirect("/admin/citizens");
      } else {
        res.render("admin/citizen/save", {
          pageTitle: "Create Citizen",
          citizensActive: true,
          editMode: false,
        });
      }
    })
    .catch((err) => {
      console.log(err);
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
      res.redirect("/admin/citizens");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getEdit = (req, res) => {
  const id = req.params.citizenId;

  Election.findAll()
    .then((result) => {
      const electionsResult = result.map((result) => result.dataValues);
      let activeElection = false;

      electionsResult.forEach((election) => {
        if (election.status) {
          activeElection = election.status;
        }
      });

      Citizen.findOne({ where: { id: id } })
        .then((result) => {
          const citizen = result.dataValues;

          if (!citizen) {
            return res.redirect("/admin/citizens");
          }

          res.render("admin/citizen/save", {
            pageTitle: "Edit Citizen",
            citizen: citizen,
            citizensActive: true,
            editMode: true,
            activeElection: activeElection,
          });
        })
        .catch((err) => {
          console.log(err);
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
      return res.redirect("/admin/citizens");
    })
    .catch((err) => {
      console.log(err);
    });
};
