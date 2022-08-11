import Party from "../models/party.model.js";
import Election from "../models/election.model.js";

export const getIndex = (req, res) => {
  Party.findAll()
    .then((result) => {
      const partiesResult = result.map((result) => result.dataValues);

      res.render("admin/party/index", {
        pageTitle: "Parties",
        partiesActive: true,
        parties: partiesResult,
        hasParties: partiesResult.length > 0,
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
        res.redirect("/parties");
      } else {
        res.render("admin/party/save", {
          pageTitle: "Create Party",
          partiesActive: true,
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
  const description = req.body.description;
  const logo = "/" + req.file.path;

  Party.create({
    name: name,
    description: description,
    logo: logo,
    status: true,
  })
    .then(() => {
      res.redirect("/parties");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getEdit = (req, res) => {
  const id = req.params.partyId;

  Election.findAll()
    .then((result) => {
      const electionsResult = result.map((result) => result.dataValues);
      let activeElection = false;

      electionsResult.forEach((election) => {
        if (election.status) {
          activeElection = election.status;
        }
      });

      Party.findOne({ where: { id: id } })
        .then((result) => {
          const party = result.dataValues;

          if (!party) {
            return res.redirect("/parties");
          }

          res.render("admin/party/save", {
            pageTitle: "Edit Party",
            party: party,
            partiesActive: true,
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
  const id = req.body.partyId;
  const name = req.body.name;
  const description = req.body.description;
  const logo = req.file;
  const status = req.body.status === undefined ? false : true;

  Party.findOne({ where: { id: id } })
    .then((result) => {
      const party = result.dataValues;

      if (!party) {
        return res.redirect("/parties");
      }

      const logoPath = logo ? `/${logo.path}` : party.logo;

      Party.update(
        {
          name: name,
          description: description,
          logo: logoPath,
          status: status,
        },
        { where: { id: id } }
      )
        .then(() => {
          return res.redirect("/parties");
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
