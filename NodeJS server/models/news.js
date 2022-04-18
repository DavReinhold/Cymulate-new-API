const db = require("mongoose");
const Schema = db.Schema;

const newSchema = new Schema({
  query: {
    type: String,
  },
  wordsCount: {
    type: {},
  },
  content: [
    {
      title: { type: String },
      description: { type: String },
    },
  ],
  // this property will be used to clean queries that does not used recently
  last_read: {
    type: Date,
  },
});

const News = db.model("News", newSchema);

module.exports = News;
