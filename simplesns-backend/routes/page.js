const express = require("express");
const cors = require("cors");
const { Post, User, Hashtag, Comment, Follow } = require("../models");
const { checkS3, deleteInvalidImg, verifyToken } = require("./middlewares");
const router = express.Router();
const sequelize = require("sequelize");
const Op = sequelize.Op;

router.get("/", async (req, res, next) => {
  //https://stackoverflow.com/questions/25880539/join-across-multiple-junction-tables-with-sequelize
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          // attributes: ["id", "nick", "email"],
        },
        {
          model: Hashtag,
        },
        {
          model: Comment,
          attributes: ["PostId", "comment", "createdAt", "updatedAt", "id"],
          include: {
            model: User,
            attributes: ["id", "nick", "email"],
          },
        },
      ],

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

// Grant.findAll({ include: User });

router.get("/:search", async (req, res, next) => {
  try {
    const _searchWord = req.params.search;
    posts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "nick", "email"],
        },
        {
          model: Hashtag,
        },
      ],
      where: {
        title: {
          [Op.like]: `%${_searchWord}%`,
        },
      },
    });

    if (!posts) {
      return res.status(404).json({
        message: "해당하는 게시글이 존재하지 않습니다.",
        code: 404,
      });
    }

    return res.json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/hashtag/:hashtag", async (req, res, next) => {
  const text = req.params.hashtag;
  if (!text) {
    return res.redirect("/");
  }
  try {
    const hashtag = await Hashtag.findOne({ where: { title: text } });

    if (!hashtag) {
      return res.status(404).json({
        code: 404,
        message: "존재하지 않는 해시태그 입니다.",
      });
    }

    const posts = await hashtag.getPosts({
      include: [{ model: User }, { model: Comment }],
    });

    return res.json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
