import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { imageStorage } from "./helpers/storage.helper.js";
import expressHbs from "express-handlebars";
import errorRoutes from "./routes/error.routes.js";
import database from "./helpers/database.helper.js";
import Candidate from "./models/candidate.model.js";
import Party from "./models/party.model.js";
import Position from "./models/position.model.js";

const PORT = process.env.PORT || 5001;
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configure express to use handlebars.
app.engine(
  "hbs",
  expressHbs({
    layoutsDir: "./src/views/layouts",
    defaultLayout: "main-layout",
    extname: "hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", "./src/views");

// Middleware's.
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../public")));
const imagePath = "/public/images";
app.use(imagePath, express.static(path.join(__dirname, `..${imagePath}`)));
app.use(imageStorage);

// Routes.
app.use(errorRoutes);

// Database relationships.
Candidate.belongsTo(Party, { constraints: true, onDelete: "CASCADE" });
Party.hasMany(Candidate);
Candidate.belongsTo(Position, { constraints: true, onDelete: "CASCADE" });
Position.hasMany(Candidate);

// Init database and start the server.
database
  .sync(/*{ force: true }*/)
  .then((_) => {
    app.listen(PORT, () =>
      console.log(`Server running on port http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.log(err);
  });
