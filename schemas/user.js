//用户模式文件
//users：用户模式文件
var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
  	username: {
  		unique: true,
  		type: String
  	}, 
    password: String,
  	headImg: String,
  	sex: String,
  	introduce: String
})
module.exports = UserSchema;