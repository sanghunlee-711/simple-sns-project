const express = require("express");
const cors = require("cors");
const { Post, User, Hashtag, Comment } = require("../models");
const router = express.Router();

router.get("/", async (req, res, next) => {
  //https://stackoverflow.com/questions/25880539/join-across-multiple-junction-tables-with-sequelize
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "nick", "email"],
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

module.exports = router;
