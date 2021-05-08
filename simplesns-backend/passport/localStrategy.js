const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const User = require("../models/user");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },

      async (email, password, done) => {
        try {
          const exUser = await User.findOne({ where: { email } });
          if (exUser) {
            //비밀번호 같음 여부 확인
            const result = await bcrypt.compare(password, exUser.password);
            result
              ? done(null, exUser)
              : done(null, false, { message: "비밀번호가 일치하지 않습니다." });
          } else {
            done(null, false, "가입되지 않은 회원입니다.");
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
