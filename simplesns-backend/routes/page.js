const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("안녕하세용");
});
