const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 const newsSchema = new Schema({
  title: {type: String},
  description: {type: String},
  permanLink: {type: String},
  date: {type: String},
  newsSourceId: {type: String},
  userId: {type: String},
  category: {type: String},
  image: {type: String}
 });
 module.exports = {
   "model" : mongoose.model('news', newsSchema),
   "schema" : newsSchema
 };