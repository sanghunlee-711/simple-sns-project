const express = require("express");
const { Post, Hashtag, User, Comment } = require("../models");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const verifying = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    const user = await User.findOne({
      attributes: ["id"],
      where: { email: verifying.email },
    });
    const post = await Post.findOne({
      where: { id: req.body.postId },
    });

    const _userId = await user.getDataValue("id");
    const _postId = await post.getDataValue("id");

    if (!user) {
      return res.status(404).json({
        code: 404,
        message: "회원정보가 없습니다.",
      });
    }
    const comment = await Comment.create({
      UserId: _userId,
      PostId: _postId,
      comment: req.body.comment,
    });

    if (comment) {
      return res.status(200).json({
        code: 200,
        message: "댓글생성이 완료되었습니다.",
      });
    } else {
      return res.status(400).json({
        code: 400,
        message: "댓글 생성이 실패했습니다.",
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
