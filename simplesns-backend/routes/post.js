const express = require("express");
const multer = require("multer");
const { Post, Hashtag, User } = require("../models");
const fs = require("fs");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { verify } = require("crypto");

const router = express.Router();

try {
  fs.readdirSync("uploads");
} catch (error) {
  console.error("uploads 폴더가 없어 uploads폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}

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
    console.log(post);
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

router.post("/img", upload.single("img"), (req, res) => {
  res.json({ url: req.file.location });
});

const upload2 = multer();
router.post("/", upload2.none(), async (req, res, next) => {
  try {
    const verifying = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    console.log("@@@@@@@@@@@verifying", verifying);
    const user = await User.findOne({
      attributes: ["id"],
      where: { email: verifying.email },
    });
    const _id = await user.getDataValue("id");
    console.log("@@@@@@@@ IN POST", user);
    console.log("!!!!!!!_______>>>>>>.", _id);
    const post = await Post.create({
      //id는 user테이블의 fmk를 넣어야 함.
      UserId: _id,
      title: req.body.title,
      content: req.body.content,
      titleImgUrl: req.body.titleImgUrl,
    });

    //해시태그를 정규표현식으로 추출해내기
    const hashtags = req.body.content.match(/#[^\s#]+/g);

    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag) => {
          //Db에 존재하면 가져오고 존재하지 않으면 생성 후 가져오는 메서드(findOrCreate)
          return Hashtag.findOrCreate({
            where: { title: tag.slice(1).toLowerCase() },
          });
        })
      );

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
});

router.delete("/delete/:id", async (req, res, next) => {
  try {
    const verifying = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    const user = await User.findOne({
      attributes: ["id"],
      where: { email: verifying.email },
    });

    if (!user) {
      return res.status(404).json({
        code: 404,
        message: "존재하지 않는 유저입니다.",
      });
    }

    const _id = await user.getDataValue("id");

    const deletePost = await Post.destroy({
      where: {
        id: req.params.id,
        UserId: _id,
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

module.exports = router;
