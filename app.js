import express from "express";
import path from "node:path";
import session from "express-session";
import passport from "passport";
import { fileURLToPath } from "node:url";
import { fileRouter } from "./src/routers/fileRoutes.js";
import { initializePassport } from "./config/passport.js";
import { authRouter } from "./src/routers/authRouters.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

initializePassport();

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "src/public")));

app.use("/", fileRouter);
app.use("/auth", authRouter);

app.listen(3000, (error) => {
  if (error) {
    throw error;
  }

  console.log("App is running");
});
