//文章模式文件
//article：文章模式文件
var mongoose = require('mongoose');
var ArticleSchema = new mongoose.Schema({
  	author: String,
    title: String,
    content: String,
    pv: Number  //点击量
})
module.exports = ArticleSchema;