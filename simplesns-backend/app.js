const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const dotenv = require("dotenv");

dotenv.config(); //for setting .env file
const pageRouter = require("./routes/page"); //setting for pageRouter ;
const authRouter = require("./routes/auth");

const passportConfig = require("./passport");
const { sequelize } = require("./models");
const passport = require("passport");

const app = express();
passportConfig();

app.set("port", process.env.PORT || 1500);
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database Connect!");
  })
  .catch((err) => console.error(err));

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

//set passport at req obj
app.use(passport.initialize());
//req.session객체는 express-session에서 생성하는 것이므로 passport 미들웨어는 express-session미들웨어 뒤에 연결해야한다.
app.use(passport.session());

app.use("/", pageRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "에서 듣고 있다고 한다");
});
