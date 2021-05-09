const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy; //로그인 구현을 위해서 passport-local모듈에서 Strategy생성자를 불러와 그안에서 구현하면 된다.
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
            //db에 존재한다면 compare함수로 비교한다.
            const result = await bcrypt.compare(password, exUser.password);

            if (result) {
              done(null, exUser);
            } else {
              done(null, false, { message: "비밀번호가 일치하지 않습니다.." });
            }
          } else {
            done(null, false, { message: "가입되지 않은 회원입니다.." });
          }
        } catch (err) {
          console.error(err);
          done(err);
        }
      }
    )
  );
};
