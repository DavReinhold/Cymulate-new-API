const express = require("express");
const router = express.Router();
const news = require("../services/news");

router.post("/getNews", async (req, res) => {
  try {
    let response = await news.getNews(
      req.body.params.source,
      req.body.params.from,
      req.body.params.to,
    );

    res.status(200).json(response);
  } catch (e) {
    res.status(500).json();
  }
});

module.exports = router;
