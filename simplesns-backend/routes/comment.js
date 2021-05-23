const express = require("express");
const { Post, Hashtag, User, Comment } = require("../models");
const jwt = require("jsonwebtoken");
const { verifyToken, getUserId } = require("./middlewares");
const router = express.Router();

router.post("/", verifyToken, getUserId, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.body.postId },
    });

    const _postId = await post.getDataValue("id");

    if (!post) {
      return res.status(404).json({
        code: 404,
        message: "게시글을 찾을 수 없습니다.",
      });
    }

    const comment = await Comment.create({
      UserId: req._userId,
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

router.put("/update/:id", verifyToken, getUserId, async (req, res, next) => {
  try {
    const updateComment = await Comment.update(
      { comment: req.body.comment },
      {
        where: { id: req.params.id, UserId: req._userId },
      }
    );

    if (updateComment) {
      return res.status(200).json({
        code: 200,
        message: "댓글수정이 완료되었습니다.",
      });
    } else {
      return res.status(400).json({
        code: 400,
        message: "댓글 수정이 실패했습니다.",
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/delete/:id", verifyToken, getUserId, async (req, res, next) => {
  try {
    const deleteComment = await Comment.destroy({
      where: {
        id: req.params.id,
        UserId: req._userId,
      },
    });

    if (deleteComment) {
      return res.status(200).json({
        code: 200,
        message: `${req.params.id}번 게시글 삭제가 완료되었습니다.`,
      });
    } else {
      return res.status(400).json({
        code: 400,
        message: "에러 발생",
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
