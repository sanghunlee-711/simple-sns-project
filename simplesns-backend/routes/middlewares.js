const jwt = require("jsonwebtoken");
const { User, Post, Image } = require("../models");
const AWS = require("aws-sdk");

// exports.isLoggedIn = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     next();
//   } else {
//     //error message 프론트에서 활용 예정
//     res.json({ status: 403, message: "로그인이 필요합니다." });
//   }
// };

// exports.isNotLoggedIn = (req, res, next) => {
//   if (!req.isAuthenticated()) {
//     next();
//   } else {
//     //로그인한 상태면 302를 보내고 프론트에서 처리하도록 예정
//     res.json({ status: 403, message: "로그인이 되어 있습니다." });
//   }
// };

exports.verifyToken = async (req, res, next) => {
  try {
    req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);

    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(419).json({
        code: 419,
        message: "토큰이 만료 되었습니다.",
      });
    }

    return res.status(401).json({
      code: 401,
      message: "유효하지 않은 토큰입니다..",
    });
  }
};

exports.getUserId = async (req, res, next) => {
  try {
    const user = await User.findOne({
      attributes: ["id"],
      where: { email: req.decoded.email },
    });

    if (!user) {
      return res.status(404).json({
        code: 404,
        message: "찾을 수 없는 회원입니다.",
      });
    }

    req._userId = await user.getDataValue("id");

    return next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.checkS3 = async (req, res, next) => {
  try {
    const invalidImg = await Image.findAll({
      where: { PostId: null },
      attributes: ["s3url"],
    });

    if (!invalidImg) {
      next();
    }

    const srcArr = await Promise.all(
      invalidImg.map((data) => data.getDataValue("s3url"))
    );
    const dataIdArr = srcArr.map((el) => {
      let idx = el.indexOf("original/");
      console.log(idx);
      return el.slice(idx, el.length - 1);
    });
    const deleteObjArr = dataIdArr.map((el) => {
      return { Key: el };
    });
    console.log(deleteObjArr);

    const s3 = new AWS.S3();
    const deleteParam = {
      Bucket: "cloudleesimplesns",
      Delete: {
        Objects: [...deleteObjArr],
      },
    };
    if (dataIdArr.length >= 1) {
      s3.deleteObjects(deleteParam, function (err, data) {
        if (err) console.log(err, err.stack);
        else console.log("delete!!! IN S3!!!", data);
      });
    }

    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.deleteInvalidImg = async (req, res, next) => {
  try {
    const invalidImg = await Image.destroy({
      where: { PostId: null },
    });
    if (!invalidImg) {
      next();
    }

    if (invalidImg) {
      console.log(invalidImg, "deleted img In DB");
    }
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
