var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


var CommentSchema = new Schema({
  text: String,
  timestamp: {
        type : Date, 
        default: Date.now 
      }
});

var Comment = mongoose.model('Comment', CommentSchema);


var AuthorSchema = new Schema({
  name: String
});

var Author = mongoose.model('Author', AuthorSchema);


var PostSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author'
  },
  text: String,
  comments: [CommentSchema]
});

var Post = mongoose.model('Post', PostSchema);


module.exports.Post = Post;
module.exports.Comment = Comment;
module.exports.Author = Author;





// var mongoose = require('mongoose'),
//     Schema = mongoose.Schema;

// var FoodSchema = new Schema({
//   name: String,
//   origin: String,
//   desc: String,
//   image: String // not sure if this will work for test for urls
// });

// var Food = mongoose.model('Food', FoodSchema);

// module.exports = Food;

