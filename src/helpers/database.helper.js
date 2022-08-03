import Sequelize from "sequelize";

const database = new Sequelize("BookCollectionWeb", "root", "Pass@@12345", {
  dialect: "mysql",
  host: "localhost",
  port: 3306,
});

export default database;
