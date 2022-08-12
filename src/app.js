import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { imageStorage } from "./helpers/storage.helper.js";
import expressHbs from "express-handlebars";
import flash from "connect-flash";
import errorRoutes from "./routes/error.routes.js";
import database from "./helpers/database.helper.js";
import Candidate from "./models/candidate.model.js";
import Party from "./models/party.model.js";
import Position from "./models/position.model.js";
import { checkSession } from "./middleware/auth.middleware.js";
import session from "express-session";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import errors from "./middleware/errors.middleware.js";
import homeRoutes from "./routes/home.routes.js";
import voteRoutes from "./routes/vote.routes.js";
import positionRoutes from "./routes/position.routes.js";
import citizenRoutes from "./routes/citizen.routes.js";
import partyRoutes from "./routes/party.routes.js";
import candidateRoutes from "./routes/candidate.routes.js";
import electionRoutes from "./routes/election.routes.js";

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
const assetsPath = "/public/assets";
app.use(assetsPath, express.static(path.join(__dirname, `..${assetsPath}`)));
app.use(imageStorage);
app.use(
  session({ secret: "anything", resave: true, saveUninitialized: false })
);
app.use(flash());
app.use(checkSession);
app.use(errors);

// Routes.
app.use(homeRoutes);
app.use(voteRoutes);
app.use(authRoutes);
app.use(adminRoutes);
app.use(candidateRoutes);
app.use(partyRoutes);
app.use(positionRoutes);
app.use(citizenRoutes);
app.use(electionRoutes);
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
