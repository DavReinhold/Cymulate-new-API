const express = require("express");
const router = express.Router();
const axios = require("axios");
const config = require("../config");

router.get("/getAll", async (req, res) => {
  try {
    let sourcesData = await axios.get(
      `https://newsapi.org/v2/top-headlines/sources?apiKey=${config.API_KEY}`,
    );

    let response = sourcesData.data.sources.map((curr) => {
      return { id: curr.id, name: curr.name };
    });

    res.status(200).json(response);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: `Error occurred. ${e}` });
  }
});

module.exports = router;
