const Sequelize = require("sequelize");

module.exports = class Image extends (
  Sequelize.Model
) {
  static init(sequelize) {
    return super.init(
      {
        s3url: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Image",
        tableName: "images",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    // 1:N = posts:images
    db.Image.belongsTo(db.Post);
  }
};
