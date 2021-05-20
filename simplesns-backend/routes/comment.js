const express = require("express");
const { Post, Hashtag, User } = require("../models");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.get("/", async (req, res, next) => {});

router.get("/:id", async (req, res, next) => {});

router.post("/", async (req, res, next) => {
  try {
    const verifying = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const user = await User.findOne({
      attributes: ["id"],
      where: { email: verifying.email },
    });
    const _id = await user.getDataValue("id");
  } catch (error) {
    console.error(error);
  }
});
