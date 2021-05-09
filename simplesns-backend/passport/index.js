const passport = require("passport");
const User = require("../models/user");
const local = require("./localStrategy");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({
      where: { id },
      //유저 모델의 id nick을 다 가져온다
      //user 모델의 associate 메서드 참고
      include: [
        { model: User, attributes: ["id", "nick"], as: "Followers" },
        { model: User, attributes: ["id", "nick"], as: "Followings" },
      ],
    })
      .then((user) => done(null, user))
      .catch((error) => done(error));
  });
  local();
};
