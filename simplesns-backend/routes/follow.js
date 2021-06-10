const express = require("express");
const { User, Follow } = require("../models");
const { verifyToken } = require("./middlewares");
const router = express.Router();

router.get("/list/:userId", verifyToken, async (req, res, next) => {
  try {
    // console.log("@@@@@@@@@@@@@@", req.decoded.email);
    let user;

    if (req.params.userId !== "my") {
      user = await User.findOne({
        where: { id: req.params.userId },
        include: [
          {
            model: User,
            as: "Followers",
            attributes: {
              include: ["id", "nick"],
              //Follow가 exclude 되지않는 이유를 찾아야한다.
              exclude: ["Follow", "password", "snsId", "provider"],
            },
            through: {
              attributes: { exclude: ["createdAt", "updatedAt"] },
            },
          },
          {
            model: User,
            as: "Followings",
            attributes: {
              include: ["id", "nick"],
              //Follow가 exclude 되지않는 이유를 찾아야한다.
              exclude: ["Follow", "password", "snsId", "provider"],
            },
            through: {
              attributes: { exclude: ["createdAt", "updatedAt"] },
            },
          },
        ],
      });
    } else {
      user = await User.findOne({
        where: { email: req.decoded.email },
        include: [
          {
            model: User,
            as: "Followers",
            attributes: {
              include: ["id", "nick"],
              //Follow가 exclude 되지않는 이유를 찾아야한다.
              exclude: ["Follow", "password", "snsId", "provider"],
            },
            through: {
              attributes: { exclude: ["createdAt", "updatedAt"] },
            },
          },
          {
            model: User,
            as: "Followings",
            attributes: {
              include: ["id", "nick"],
              //Follow가 exclude 되지않는 이유를 찾아야한다.
              exclude: ["Follow", "password", "snsId", "provider"],
            },
            through: {
              attributes: { exclude: ["createdAt", "updatedAt"] },
            },
          },
        ],
      });
    }

    if (!user) {
      return res.status(404).json({
        message: "Not Found User",
        code: 404,
      });
    }
    const _FollowersData = user.getDataValue("Followers");
    const _FollowingsData = user.getDataValue("Followings");
    return res.json({ Followers: _FollowersData, Followings: _FollowingsData });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/", verifyToken, async (req, res, next) => {
  try {
    const user = await User.findOne({
      attributes: ["id"],
      where: { email: req.decoded.email },
    });

    const _addFollow = await user.addFollowing(req.body.followId.followId);

    if (!_addFollow) {
      return res.status(404).json({
        code: 404,
        message: "팔로우하기 실패했다.",
      });
    }

    return res.status(200).json({
      code: 200,
      message: "팔로우 하였습니다.",
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/unfollow", verifyToken, async (req, res, next) => {
  try {
    console.log;
    const user = await User.findOne({
      attributes: ["id"],
      where: {
        email: req.decoded.email,
      },
    });

    const _removeFollow = await user.removeFollowing(
      req.body.unFollowId.unfollowId
    );

    if (_removeFollow) {
      return res.status(404).json({
        code: 404,
        message: "팔로우 끊기 실패했습니다",
      });
    }

    return res.status(200).json({
      code: 200,
      message: "팔로우가 끊겼습니다..",
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
