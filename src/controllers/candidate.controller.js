import Candidate from "../models/candidate.model.js";
import Party from "../models/party.model.js";
import Position from "../models/position.model.js";
import compare from "../helpers/hbs/compare.helper.js";
import { sendEmail } from "../helpers/email.helper.js";

let parties = [];
let positions = [];

const getAllParties = () => {
  Party.findAll()
    .then((result) => {
      parties = [];
      const partiesResult = result.map((result) => result.dataValues);
      parties.push(...partiesResult);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getAllPositions = () => {
  Position.findAll()
    .then((result) => {
      positions = [];
      const positionsResult = result.map((result) => result.dataValues);
      positions.push(...positionsResult);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getIndex = (req, res) => {
  Candidate.findAll({
    include: [{ model: Party }, { model: Position }],
  })
    .then((result) => {
      const candidates = result.map((result) => result.dataValues);

      res.render("candidate/index", {
        pageTitle: "Home",
        candidatesActive: true,
        candidates: candidates,
        hasCandidates: candidates.length > 0,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getCreate = (req, res) => {
  Party.findAll()
    .then((result) => {
      parties = [];
      const partiesResult = result.map((result) => result.dataValues);

      Position.findAll()
        .then((result) => {
          const positionsResult = result.map((result) => result.dataValues);

          res.render("candidate/save", {
            pageTitle: "Create Candidate",
            parties: partiesResult,
            positions: positionsResult,
            hasParties: partiesResult.length === 0,
            hasPositions: positionsResult.length === 0,
            hasRelations:
              partiesResult.length > 0 && positionsResult.length > 0,
            candidatesActive: true,
            editMode: false,
            helpers: {
              equalValue: compare,
            },
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

export const postCreate = (req, res) => {
  const name = req.body.name;
  const lastName = req.body.lastName;
  const profilePicture = "/" + req.file.path;
  const partyId = req.body.partyId;
  const positionId = req.body.positionId;

  Candidate.create({
    name: name,
    lastName: lastName,
    profilePicture: profilePicture,
    partyId: partyId,
    positionId: positionId,
    status: true,
  })
    .then((result) => {
      res.redirect("/candidates");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getEdit = (req, res) => {
  getAllParties();
  getAllPositions();

  const id = req.params.candidateId;

  Candidate.findOne({ where: { id: id } })
    .then((result) => {
      const candidate = result.dataValues;

      if (!candidate) {
        return res.redirect("/candidates");
      }

      res.render("candidate/save", {
        pageTitle: "Create Candidate",
        candidate: candidate,
        parties: parties,
        positions: positions,
        hasParties: parties.length === 0,
        hasPositions: positions.length === 0,
        hasRelations: parties.length > 0 && positions.length > 0,
        candidatesActive: true,
        editMode: true,
        helpers: {
          equalValue: compare,
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postEdit = (req, res) => {
  const id = req.body.candidateId;
  const name = req.body.name;
  const lastName = req.body.lastName;
  const candidateImage = req.file;
  const partyId = req.body.partyId;
  const positionId = req.body.positionId;
  const status = req.body.status === undefined ? false : true;

  Candidate.findOne({ where: { id: id } })
    .then((result) => {
      const candidate = result.dataValues;

      if (!candidate) {
        return res.redirect("/candidates");
      }

      const profilePicture = candidateImage
        ? `/${candidateImage.path}`
        : candidate.profilePicture;

      Candidate.update(
        {
          name: name,
          lastName: lastName,
          profilePicture: profilePicture,
          partyId: partyId,
          positionId: positionId,
          status: status,
        },
        { where: { id: id } }
      )
        .then(() => {
          return res.redirect("/candidates");
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};