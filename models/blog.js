var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
  title: String,
  content: String,
  author: String,
  date: {
    type: Date,
    default: Date.now
  }
});

var Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
