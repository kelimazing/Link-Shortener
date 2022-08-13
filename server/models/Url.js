const mongoose = require(`mongoose`);

const UrlSchema = new mongoose.Schema({
  urlCode: { type: String },
  longUrl: { type: String },
  shortUrl: { type: String },
});

module.exports = mongoose.model('Url', UrlSchema)