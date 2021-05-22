const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const User = require("../models/user");
const router = express.Router();

router.use(async (req, res, next) => {
  cors({
    credential: true,
  })(req, res, next);
});

router.post("/join", isNotLoggedIn, async (req, res, next) => {
  //front - body -> {email: "...", nick: "...", password: "..."}
  const { email, nick, password } = req.body;

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

router.get("/logout", isLoggedIn, (req, res, next) => {
  req.session.destroy();
  req.logout();
  return res.status(200).json({
    code: 200,
    message: "로그아웃 완료",
  });
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        code: 401,
        message: "등록되지 않은 회원입니다.",
      });
    }
    const result = await bcrypt.compare(password, user.password);
    const nick = user.nick;
    if (result) {
      const token = jwt.sign(
        {
          email: email,
          password: password,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "365d", //1년...?
          issuer: "SimpleSns",
        }
      );
      return res.json({
        code: 200,
        message: "토큰이 발급 되었습니다.",
        email: email,
        nick,
        token,
      });
    } else {
      return res.json({
        code: 405,
        message: "비밀번호가 틀렸습니다.",
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/token", async (req, res, next) => {
  try {
    const verifying = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    const user = await User.findOne({
      attributes: ["id", "email", "nick"],
      where: { email: verifying.email },
    });
    const _nick = await user.getDataValue("nick");
    const _email = await user.getDataValue("email");
    const _id = await user.getDataValue("id");
    const data = { _email, _id, _nick };

    if (_email && _id) {
      return res.json(data);
    } else {
      return res.status(404).json({
        code: 404,
        message: "찾을 수 없는 회원입니다.",
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
