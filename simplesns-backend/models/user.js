const Sequelize = require("sequelize");

module.exports = class User extends (
  Sequelize.Model
) {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: Sequelize.STRING(50),
          allowNull: true,
          unique: true,
        },
        nick: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        provider: {
          //local: 로컬로그인, kakao: 카카오 로그인
          type: Sequelize.STRING(10),
          allowNull: false,
          defaultValue: "local",
        },
        snsId: {
          type: Sequelize.STRING(40),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    //1:N = users: posts
    db.User.hasMany(db.Post);
    //1:M = users: comments
    db.User.hasMany(db.Comment);

    //N:M = following : follower
    db.User.belongsToMany(db.User, {
      foreignKey: "followingId",
      as: "Followers",
      through: db.Follow,
    });

    db.User.belongsToMany(db.User, {
      foreignKey: "followerId",
      as: "Followings",
      through: db.Follow,
    });
  }
};
