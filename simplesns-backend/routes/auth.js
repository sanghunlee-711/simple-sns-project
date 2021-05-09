const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const User = require("../models/user");
const router = express.Router();

router.post("/join", isNotLoggedIn, async (req, res, next) => {
  //front - body -> {email: "...", nick: "...", password: "..."}
  const { email, nick, password } = req.body;
  console.log(req.body);
  try {
    const exUser = await User.findOne({ where: { email } });

    if (exUser) {
      return res.status(302).send({ error: "이미 가입된 회원입니다." });
    } else {
      const hash = await bcrypt.hash(password, 15);

      await User.create({
        email,
        nick,
        password: hash,
      });
      return res.redirect(200, "/");
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post("/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      //authErr값이 존재한다면 실패한 것이다
      console.error(authError);
      return next(authError);
    }

    if (!user) {
      return res.status(404).json({ message: "존재하지 않는 회원입니다." });
    }

    return req.login(user, (loginError) => {
      if (loginError) {
        console.log("Error Here @@@@");
        return next(loginError);
      }

      return res.status(200).json(user);
    });
  })(req, res, next);
});

router.get("/logout", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect(200, "/");
});

module.exports = router;
