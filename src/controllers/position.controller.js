import Position from "../models/position.model.js";
import Election from "../models/election.model.js";
import Candidate from "../models/candidate.model.js";

export const getIndex = (req, res) => {
  Position.findAll()
    .then((result) => {
      const positionsResult = result.map((result) => result.dataValues);

      res.render("admin/position/index", {
        pageTitle: "Positions",
        positionsActive: true,
        positions: positionsResult,
        hasPositions: positionsResult.length > 0,
      });
    })
    .catch((err) => console.log(err));
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
        req.flash("errors", "Cannot create positions on an active election.");
        res.redirect("/admin/positions");
      } else {
        res.render("admin/position/save", {
          pageTitle: "Create Position",
          positionsActive: true,
          editMode: false,
        });
      }
    })
    .catch((err) => console.log(err));
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
      res.redirect("/admin/positions");
    })
    .catch((err) => console.log(err));
};

export const getEdit = (req, res) => {
  const id = req.params.positionId;

  Election.findAll()
    .then((result) => {
      const electionsResult = result.map((result) => result.dataValues);
      let activeElection = false;

      electionsResult.forEach((election) => {
        if (election.status) {
          activeElection = election.status;
        }
      });

      Position.findOne({ where: { id: id } })
        .then((result) => {
          const position = result.dataValues;

          if (!position) {
            return res.redirect("/admin/positions");
          }

          res.render("admin/position/save", {
            pageTitle: "Edit Position",
            position: position,
            positionsActive: true,
            editMode: true,
            activeElection: activeElection,
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
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
      if (!status) {
        Candidate.findAll()
          .then((result) => {
            const candidatesResult = result.map((result) => result.dataValues);
            candidatesResult.forEach((candidate) => {
              Candidate.update(
                {
                  status: false,
                },
                { where: { id: candidate.id, positionId: id } }
              );
            });
          })
          .catch((err) => console.log(err));
      }

      return res.redirect("/admin/positions");
    })
    .catch((err) => console.log(err));
};
