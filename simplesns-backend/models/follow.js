const Sequelize = require("sequelize");

module.exports = class Follow extends (
  Sequelize.Model
) {
  static init(sequelize) {
    return super.init(
      {
        followingId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        followerId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Follow",
        tableName: "follows",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    // 1:N = posts:images
    db.Follow.hasMany(db.User);
  }
};
