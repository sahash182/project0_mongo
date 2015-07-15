var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FoodSchema = new Schema({
  name: String,
  origin: String,
  desc: String,
  image: String // not sure if this will work for test for urls
});

var Food = mongoose.model('Food', FoodSchema);

module.exports = Food;

