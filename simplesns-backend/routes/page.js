const express = require("express");
const { Post, User, Hashtag } = require("../models");

const router = express.Router();

//cors 처리
router.use(async (req, res, next) => {
  // const url = new URL(req.get("origin"));
  next();
  // cors({
  //   origin: req.get("origin"),
  //   credentials: true,
  // })(req, res, next);
});

router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: {
        model: User,
        attributes: ["id", "nick"],
      },
      order: [["createdAt", "DESC"]],
    });
    if (posts) {
      res.json(posts);
    } else {
      res.send("아직 posts데이터가 없습니다.");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
