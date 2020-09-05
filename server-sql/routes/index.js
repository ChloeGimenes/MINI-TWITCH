const express = require("express");
const router = express.Router();

module.exports = router;

const games = require("./games");
const fav = require("./fav");
const categories = require("./categories");

router.use("/games", games);
router.use("/fav", fav);
router.use("/categories", categories);
