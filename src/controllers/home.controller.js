import Citizen from "../models/citizen.model.js";
import Election from "../models/election.model.js";

export const getIndex = (req, res) => {
  res.render("home/index", {
    pageTitle: "Home",
    homeActive: true,
  });
};

export const postVote = (req, res) => {
  const identificationDocument = req.body.identificationDocument;

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
        if (identificationDocument.length === 12) {
          Citizen.findOne({
            where: { identificationDocument: identificationDocument },
          })
            .then((citizen) => {
              if (!citizen) {
                req.flash("errors", "Citizen not found.");
                return res.redirect("/");
              }

              if (citizen.status) {
                return res.render("home/vote/index", {
                  pageTitle: "Vote",
                  voteActive: true,
                });
              } else {
                req.flash("errors", "Citizen is inactive.");
                return res.redirect("/");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          req.flash("errors", "Invalid Citizen ID.");
          return res.redirect("/");
        }
      } else {
        req.flash("errors", "There is no active election.");
        return res.redirect("/");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
