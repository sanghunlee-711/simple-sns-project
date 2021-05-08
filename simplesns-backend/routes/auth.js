const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const User = require("../models/user");
const router = express.Router();

router.post("/join", isNotLoggedIn, async (req, res, next) => {
  //front - body -> {email: "...", nick: "...", password: "..."}
  const { email, nick, password } = req.body;

  try {
    const exUser = await User.findOne({ where: { email } });

    if (exUser) {
      return res.json({ status: 405, message: "이미 가입된 회원입니다." });
    }

    const hash = await bcrypt.hash(password, 15);

    await User.create({
      email,
      nick,
      password: hash,
    });

    return res.redirect("/", 200);
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post("/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("localStrategy", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }

    if (!user) {
      return res.json({ status: 404, message: "존재하지 않는 회원입니다." });
    }

    return req.login(user, (loginError) => {
      if (loginError) {
        return next(loginError);
      }

      return res.redirect("/", 200);
    });
  })(req, res, next);
});

router.get("/logout", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/", 200);
});
