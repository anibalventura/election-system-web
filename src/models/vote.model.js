import Sequelize from "sequelize";
import database from "../helpers/database.helper.js";

const Vote = database.define("votes", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
});

export default Vote;
