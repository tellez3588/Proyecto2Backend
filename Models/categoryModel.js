const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 const categorySchema = new Schema({
  name: {type: String},
 });
 module.exports = {
   "model" : mongoose.model('category', categorySchema),
   "schema" : categorySchema
 };