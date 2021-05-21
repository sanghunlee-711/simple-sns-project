const Sequelize = require("sequelize");

module.exports = class Post extends (
  Sequelize.Model
) {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: Sequelize.STRING(50),
          allowNull: true,
        },
        content: {
          //tui editor tag 저장 위한 타입 변경
          type: Sequelize.TEXT,
          allowNull: true,
        },
        titleImgUrl: {
          type: Sequelize.STRING(200),
          allowNull: false,
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
    // 1:M = users: comments
    db.Post.hasMany(db.Comment);
    //L:K = posts : hashtags through table name PostHashtag
    db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" });
  }
};
