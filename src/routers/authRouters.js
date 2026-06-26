import passport from "passport";
import { Router } from "express";
import {
  loginGet,
  logoutGet,
  signupGet,
  signupPost,
} from "../controllers/authController.js";
import { ensureGuest } from "../middleware/authMiddleware.js";

const authRouter = Router();
authRouter.get("/sign-up", ensureGuest, signupGet);
authRouter.post("/sign-up", ensureGuest, signupPost);
authRouter.get("/log-in", ensureGuest, loginGet);
authRouter.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "log-in",
    failureMessage: true,
  }),
);

authRouter.get("/logout", logoutGet);

export { authRouter };
