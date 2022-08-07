import Election from "../models/election.model.js";

export const getIndex = (req, res) => {
  Election.findAll({ order: [["id", "DESC"]] })
    .then((result) => {
      const electionsResult = result.map((result) => result.dataValues);
      let activeElection = false;

      electionsResult.forEach((election) => {
        if (election.status) {
          activeElection = election.status;
        }
      });

      console.log("activeElection", activeElection);

      res.render("admin/election/index", {
        pageTitle: "Elections",
        electionsActive: true,
        activeElection: activeElection,
        elections: electionsResult,
        hasElections: electionsResult.length > 0,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getCreate = (req, res) => {
  res.render("admin/election/save", {
    pageTitle: "Create Election",
    electionsActive: true,
    editMode: false,
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
      res.redirect("/elections");
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
        return res.redirect("/elections");
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
      return res.redirect("/elections");
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
        return res.redirect("/elections");
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
      return res.redirect("/elections");
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
        return res.redirect("/elections");
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
