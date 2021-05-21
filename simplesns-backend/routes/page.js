const express = require("express");
const cors = require("cors");
const { Post, User, Hashtag, Comment } = require("../models");
const jwt = require("jsonwebtoken");
const { verifyToken, isLoggedIn } = require("./middlewares");

const router = express.Router();

router.get("/", verifyToken, async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: {
        model: User,
        attributes: ["id", "nick", "email"],
      },
      include: {
        model: Comment,
        attributes: ["PostId", "comment", "createdAt", "updatedAt", "id"],

        include: {
          model: User,
          attributes: ["id", "nick", "email"],
        },
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
