const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
config = require("../config/config.json");
const User = require("./user");
const Post = require("./post");
const HashTag = require("./hashtag");

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.User = User;
db.Post = Post;

User.init(sequelize);
Post.init(sequelize);
HashTag.init(sequelize);

User.associate(db);
Post.associate(db);
HashTag.associate(db);

module.exports = db;
