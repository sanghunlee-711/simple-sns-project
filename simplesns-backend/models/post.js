const Sequelize = require("sequelize");

module.exports = class Post extends (
  Sequelize.Model
) {
  static init(sequelize) {
    return super.init(
      {
        content: {
          //tui editor tag 저장 위한 타입 변경
          type: Sequelize.TEXT,
          allowNull: true,
        },
        //tui editor완성되면 img url도 content안에 다 넣어야 한다.
        img: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Post",
        tableName: "posts",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    //1:N = users: posts
    db.Post.belongsTo(db.User);
    //N:M = posts : hashtags through table name PostHashtag
    db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" });
  }
};
