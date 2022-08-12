import Election from "../models/election.model.js";
import Candidate from "../models/candidate.model.js";

export const getIndex = (req, res) => {
  Election.findAll({ order: [["id", "DESC"]] })
    .then((result) => {
      const electionsResult = result.map((result) => result.dataValues);

      res.render("admin/election/index", {
        pageTitle: "Elections",
        electionsActive: true,
        elections: electionsResult,
        hasElections: electionsResult.length > 0,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getCreate = (req, res) => {
  Election.findAll({ order: [["id", "DESC"]] })
    .then((result) => {
      const electionsResult = result.map((result) => result.dataValues);
      let activeElection = false;

      electionsResult.forEach((election) => {
        if (election.status) {
          activeElection = election.status;
        }
      });

      if (!activeElection) {
        Candidate.findAll()
          .then((result) => {
            const candidatesResult = result.map((result) => result.dataValues);
            let candidatesActive = 0;
            let candidatesCount = candidatesResult.length;

            candidatesResult.forEach((candidate) => {
              if (candidate.status) {
                candidatesActive++;
              }
            });

            if (candidatesActive >= 2 && candidatesCount >= 2) {
              res.render("admin/election/save", {
                pageTitle: "Create Election",
                electionsActive: true,
                editMode: false,
              });
            } else {
              req.flash(
                "errors",
                "Need to have two active candidates to start a election."
              );
              res.redirect("/admin/elections");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        req.flash("errors", "Cannot create an election on an active election.");
        res.redirect("/admin/elections");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postCreate = (req, res) => {
  const name = req.body.name;
  const date = req.body.date;

  Election.create({
    name: name,
    date: date,
    status: true,
  })
    .then(() => {
      res.redirect("/admin/elections");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getEdit = (req, res) => {
  const id = req.params.electionId;

  Election.findOne({ where: { id: id } })
    .then((result) => {
      const election = result.dataValues;

      if (!election) {
        return res.redirect("/admin/elections");
      }

      res.render("admin/election/save", {
        pageTitle: "Create Election",
        election: election,
        electionsActive: true,
        editMode: true,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postEdit = (req, res) => {
  const id = req.body.electionId;
  const name = req.body.name;
  const date = req.body.date;
  const status = req.body.status === undefined ? false : true;

  Election.update(
    {
      name: name,
      date: date,
      status: status,
    },
    { where: { id: id } }
  )
    .then(() => {
      return res.redirect("/admin/elections");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getFinalize = (req, res) => {
  const id = req.params.electionId;

  Election.findOne({ where: { id: id } })
    .then((result) => {
      const election = result.dataValues;

      if (!election) {
        return res.redirect("/admin/elections");
      }

      res.render("admin/election/finalize", {
        pageTitle: "Finalize Election",
        election: election,
        electionsActive: true,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postFinalize = (req, res) => {
  const id = req.body.electionId;
  console.log("electionId", id);
  console.log("electionBody", req.body);

  Election.update(
    {
      status: false,
    },
    { where: { id: id } }
  )
    .then(() => {
      return res.redirect("/admin/elections");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getResults = (req, res) => {
  const id = req.params.electionId;

  Election.findOne({ where: { id: id } })
    .then((result) => {
      const election = result.dataValues;

      if (!election) {
        return res.redirect("/admin/elections");
      }

      res.render("admin/election/results", {
        pageTitle: "Results",
        electionsActive: true,
        election: election,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
