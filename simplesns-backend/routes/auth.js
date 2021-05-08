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

    //가입된 경우 에러 메시지 보내주자
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
