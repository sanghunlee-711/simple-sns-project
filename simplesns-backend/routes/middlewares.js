const jwt = require("jsonwebtoken");
const { User } = require("../models");

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
