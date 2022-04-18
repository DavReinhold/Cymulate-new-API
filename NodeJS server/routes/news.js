const express = require("express");
const router = express.Router();
const news = require("../services/news");

router.get("/getNews", async (req, res) => {
  try {
    let response = await news.getNews(
      req.query.source,
      req.query.from,
      req.query.to,
    );

    res.status(200).json(response);
  } catch (e) {
    res.status(500).json();
  }
});

module.exports = router;
