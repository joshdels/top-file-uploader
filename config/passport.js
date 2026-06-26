import passport from "passport";
import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserById, getUserByUsername } from "../src/db/queries.js";

function initializePassport() {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        console.log("username", username);
        const user = await getUserByUsername(username);

        if (!user) {
          console.log("No user found");
          return done(null, false);
        }

        const match = await bcrypt.compare(password, user.passowrd);
        console.log("match:", match);

        if (!match) {
          console.log("Wrong password");
          return done(null, false);
        }

        console.log("Login success");
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }),
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await getUserById(id);
      console.log("user", user);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
}

export { initializePassport };
