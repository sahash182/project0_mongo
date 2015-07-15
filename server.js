// SERVER-SIDE JAVASCRIPT

// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    _ = require('underscore');

    var Food = require('./models/mongo');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongo_intro');

// serve js and css files from public folder
app.use(express.static(__dirname + '/public'));

// configure bodyParser (for handling data)
app.use(bodyParser.urlencoded({extended: true}));

// root (serves index.html)
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});

// API ROUTES
//get all foods
app.get('/api/foods', function (req, res) {
  // find all foods in db
  Food.find(function (err, foods) {
    res.json(foods);
  });
});

//create new food
app.post('/api/foods', function (req, res){
  //create new food with new form data
  var newFood = new Food({
    name: req.body.name,
    origin: req.body.origin,
    desc: req.body.desc,
    image: req.body.image 
  });
  // save new food in db
  newFood.save(function(err, savedFood){
    res.json(savedFood);
  });
});// update food
app.put('/api/foods/:id', function (req, res) {
  // set the value of the id
  var targetId = req.params.id;

  // find foods in db by id
  Food.findOne({_id: targetId}, function (err, foundFood) {
    // update the food's name, origin, desc, image
    foundFood.name = req.body.name;
    foundFood.origin = req.body.origin;
    foundFood.desc = req.body.desc;
    foundFood.image = req.body.image;

    // save updated foods in db
    foundFood.save(function (err, savedFood) {
      res.json(savedFood);
    });
  });
});

// delete food
app.delete('/api/foods/:id', function (req, res) {
  // set the value of the id
  var targetId = req.params.id;

  // find food in db by id and remove
  Food.findOneAndRemove({_id: targetId}, function (err, deletedFood) {
    res.json(deletedFood);
  });
});

app.listen(3000, function () {
  console.log('server started on localhost:3000');
});
