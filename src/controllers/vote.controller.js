import Candidate from "../models/candidate.model.js";
import Party from "../models/party.model.js";
import Position from "../models/position.model.js";
import Election from "../models/election.model.js";
import Citizen from "../models/citizen.model.js";
import compare from "../helpers/hbs/compare.helper.js";

let parties = [];
let positions = [];

const getAllParties = () => {
  Party.findAll()
    .then((result) => {
      const partiesResult = result.map((result) => result.dataValues);
      parties = [];
      parties = partiesResult.filter((party) => party.status);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getAllPositions = () => {
  Position.findAll()
    .then((result) => {
      const positionsResult = result.map((result) => result.dataValues);
      positions = [];
      positions = positionsResult.filter((position) => position.status);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getIndex = (req, res) => {
  const identificationDocument = req.query.citizenId;

  if (
    identificationDocument !== undefined &&
    identificationDocument.length === 12
  ) {
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
          Citizen.findOne({
            where: { identificationDocument: identificationDocument },
          })
            .then((citizen) => {
              if (!citizen) {
                req.flash("errors", "Citizen not found.");
                return res.redirect("/");
              }

              if (citizen.status) {
                getAllParties();
                getAllPositions();

                Candidate.findAll({
                  include: [{ model: Party }, { model: Position }],
                })
                  .then((result) => {
                    const candidatesResult = result.map(
                      (result) => result.dataValues
                    );
                    const activePositions = [];
                    const activeCandidates = [];

                    candidatesResult.forEach((candidate) => {
                      positions.forEach((position) => {
                        parties.forEach((party) => {
                          if (candidate.status) {
                            if (
                              candidate.positionId === position.id &&
                              candidate.partyId === party.id
                            ) {
                              activePositions.push(position);
                              activeCandidates.push(candidate);
                            }
                          }
                        });
                      });
                    });

                    positions = [...new Set(activePositions)];

                    return res.render("home/vote/index", {
                      pageTitle: "Vote",
                      voteActive: true,
                      positions: positions,
                      candidates: activeCandidates,
                      helpers: {
                        equalValue: compare,
                      },
                    });
                  })
                  .catch((err) => {
                    console.log(err);
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
          req.flash("errors", "There is no active election.");
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
};

export const postFinish = (req, res) => {
  const votes = [];

  for (const key in req.body) {
    if (req.body[key]) {
      votes.push(req.body[key]);
    }
    
    console.log(key);
  }

  console.log(req.body);
  console.log(votes);
};
