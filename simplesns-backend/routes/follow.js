const express = require("express");
const { User, Follow } = require("../models");
const { verifyToken } = require("./middlewares");
const router = express.Router();

router.post("/", verifyToken, async (req, res, next) => {
  // 토큰으로 요청자 인증하고
  //req.body.userId에 팔로우할 타겟아이디 담고
  // 이미 되어있으면 해제 아니면 팔로우하기로 로직 짜면 될 듯

  try {
    const user = await User.findOne({
      attributes: ["id"],
      where: { email: req.decoded.email },
    });

    // console.log("TRYfollow user", user);
    // const targetUser = await User.findOne({
    //   attributes: ["id"],
    //   where: { id: req.body.userId },
    // });

    //에러처리는 나중에 ㅋ
    // if (!user | !targetUser) {
    //   return res.status(404).json({
    //     code: 404,
    //     message: "존재하지 않는 회원 입니다.",
    //   });
    // }

    // const checkFollow = await Follow.findOne({where:{ followingId:req.params.id}})

    // if(checkFollow){
    //   await user.removeFollowing(parseInt(req.params.id, 10));
    //   return res.status(200).json({
    //     code: 200,
    //     message: "팔로우를 끊었습니다."
    //   })
    // }

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
module.exports = router;
