const express = require("express");
const multer = require("multer");
const { Post, Hashtag, User, Image } = require("../models");
const fs = require("fs");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const path = require("path");
const {
  verifyToken,
  getUserId,
  checkS3,
  deleteInvalidImg,
  checkHashTag,
} = require("./middlewares");

const router = express.Router();

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: "cloudleesimplesns",
    key(req, file, cb) {
      cb(null, `original/${Date.now()}${path.basename(file.originalname)}`);
    },
  }),
});

router.get("/:id", async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.id },
      include: {
        model: User,
        attributes: ["email", "nick", "id"],
      },
    });

    if (!post) {
      return res.status(404).json({
        code: 404,
        message: "게시글을 찾을 수 없습니다 다시 시도 해주세요.",
      });
    } else {
      return res.json(post);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/img", verifyToken, upload.single("img"), (req, res) => {
  res.json({ url: req.file.location });
});

const upload2 = multer();
router.post(
  "/",
  verifyToken,
  getUserId,
  checkHashTag,
  upload2.none(),

  async (req, res, next) => {
    try {
      const post = await Post.create({
        //id는 user테이블의 fmk를 넣어야 함.
        UserId: req._userId,
        title: req.body.title,
        content: req.body.content,
        titleImgUrl: req.body.titleImgUrl,
      });

      const images = req.body.content.match(
        /<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>/g
      );
      if (!images) {
        return res.status(400).json({
          message: "이게 왜 안되지 ?..",
          code: 400,
        });
      }
      const images_s3_url = images.map((el) => {
        if (el.includes("cloudleesimplesns.s3")) {
          return el.match(/src\s*=\s*"(.+?)"/g);
        }
      });

      const _postId = await post.getDataValue("id");

      if (images) {
        const result = await Promise.all(
          images_s3_url.map((s3Url) => {
            if (s3Url) {
              return Image.findOrCreate({
                where: {
                  s3url: String(s3Url),
                  PostId: _postId,
                },
              });
            }
          })
        );
        console.log("@@@@@@@", result);
      }

      //해시태그 존재 체크
      if (req.hashtags && req.hashtags !== null) {
        console.log("해시태그 없는데 들어오니 ?..");
        const result = req.hashtags;

        await post.addHashtags(result.map((r) => r[0]));
      }

      if (post) {
        res.status(200).json({
          code: 200,
          message: "게시글 업로드 완료",
        });
        return res.redirect("/");
      } else {
        return res.status(400).json({
          code: 400,
          message: "에러발생",
        });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.delete("/delete/:id", verifyToken, async (req, res, next) => {
  try {
    const deletePost = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (deletePost) {
      return res.status(200).json({
        code: 200,
        message: `${req.params.id}번 게시글 삭제가 완료되었습니다.`,
      });
    } else {
      return res.status(400).json({
        code: 400,
        message: "에러발생",
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.put("/update", verifyToken, checkHashTag, async (req, res, next) => {
  try {
    const updatePost = await Post.update(
      {
        content: req.body.content,
        titleImgUrl: req.body.titleImgUrl,
        title: req.body.title,
      },
      { where: { id: req.body.postId } }
    );

    const post = await Post.findOne({
      where: { id: req.body.postId },
    });
    //해시태그 존재 체크
    if (req.hashtags) {
      const result = req.hashtags;

      await post.addHashtags(result.map((r) => r[0]));
    }

    if (updatePost) {
      return res.status(200).json({
        code: 200,
        message: "게시글수정이 완료되었습니다.",
      });
    } else {
      return res.status(400).json({
        code: 400,
        message: "게시글 수정에 실패했습니다.",
      });
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
