const config = require("../config");
const axios = require("axios");
const News = require("../models/news");

const splitDays = (from, to) => {
  let days = [];

  for (
    let start = new Date(from);
    start <= new Date(to);
    start.setDate(start.getDate() + 1)
  ) {
    days.push(new Date(start).toISOString().split("T")[0]);
  }

  return days;
};

const getNewsForOneDay = async (source, date) => {
  let res;
  let currQuery = `https://newsapi.org/v2/everything?language=en&from=${date}&to=${date}&sortBy=publishedAt&sources=${source}&apiKey=${config.API_KEY}`;
  try {
    // Check if the payload of this query is already existing in the database.
    // otherwise, make the request to the API end save it in the database
    let queryExistInCache = await News.findOneAndUpdate(
      { query: currQuery },
      { last_read: new Date() },
    );

    if (queryExistInCache) {
      res = queryExistInCache.content;
    } else {
      let resFromAPI = await axios.get(currQuery);

      let newNews = new News({
        query: currQuery,
        wordsCount: {},
        content: resFromAPI.data.articles.map((art) => {
          return { title: art.title, description: art.description };
        }),
        last_read: new Date(),
      });

      await newNews.save();

      res = newNews.content;
    }

    return res;
  } catch (e) {
    console.log(e);
    throw new Error(e.toString());
  }
};

const getNews = async (source, from, to) => {
  let days = splitDays(from, to);

  const values = await Promise.all(
    days.map((day) => getNewsForOneDay(source, day, day)),
  );

  return values;
};

module.exports = { getNews };
