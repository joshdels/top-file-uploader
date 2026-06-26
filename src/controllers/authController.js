import passport from "passport";
import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";
import { postNewUser } from "../db/queries.js";

async function signupGet(req, res) {
  res.render("forms/signup-form");
}

async function signupPost(req, res) {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  await postNewUser(username, hashedPassword);
  res.redirect("/");
}

async function loginGet(req, res) {
  res.render("forms/login-form");
}

async function logoutGet(req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
}

export { signupGet, signupPost, loginGet, logoutGet };
