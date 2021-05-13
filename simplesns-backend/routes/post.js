const express = require("express");
const session = require("express-session");
const multer = require("multer");
const { isLoggedIn } = require("./middlewares");
const { Post, Hashtag } = require("../models");
const fs = require("fs");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const path = require("path");

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

// const upload = multer({
//   storage: multer.diskStorage({
//     destination(req, file, cb) {
//       cb(null, "uploads/");
//     },

//     filename(req, file, cb) {
//       const ext = path.extname(file.originalname);
//       cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
//     },
//   }),

//   limits: { fileSize: 5 * 1024 * 1024 },
// });

router.post("/img", upload.single("img"), (req, res) => {
  console.log("@@@@@@@@@@@@@@@@@@@@>>>>", req.file);
  // res.json({
  //   url: `simplesns-backend/uploads/${req.file.filename}`,
  // });
  res.json({ url: req.file.location });
});

const upload2 = multer();
router.post("/", isLoggedIn, upload2.none(), async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      img: req.body.url,
      UserId: req.user.id,
    });

    //해시태그를 정규표현식으로 추출해내기
    const hashtags = req.body.content.match(/#[^\s#]+/g);

    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag) => {
          return Hashtag.findOrCreate({
            where: { title: tag.slice(1).toLowerCase() },
          });
        })
      );
      await post.addHashtags(result.map((r) => r[0]));
    }

    res.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
