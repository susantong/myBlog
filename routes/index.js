var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Article = require('../models/article');
var crypto = require('crypto');
//var settings = require('settings');

var md5 = crypto.createHash('md5');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  res.end();
  //res.redirect('/')
});

router.post('/reg', function (req, res, next) {
    var b = req.body;

    User.find({username : b.username}, function (err, result) {
      //console.log(result instanceof Array);
      //console.log(result.length);
      if (result.length) {
        res.send('repeat');
      } else {
        var user=new User({
        username: b.username,
        password: b.password,
        headImg: b.headurl,
        sex: b.sex,
        introduce: b.description 
      });
      //user.update({'$push': {'article': {'title': 'ok', 'content': 'ok', 'time': new Date()}}});
      user.save(function(err,user){
        if (err) {
          console.log(err);
          return;
        }
        console.log('注册成功');
        //res.render('/home');
        //console.log(req.session.username);

      });
      
      req.session.username = user.username;
      req.session.password = user.password;

      //console.log(user.username.find().count());
      //console.log(req.session.username);
      //var data = JSON.stringify({success: "ok"});
      // //res.send("success_jsopCallback(" + data + ")");
      res.send('ok');
      }
    });
});

router.get('/home', function (req, res, next) {
  // console.log(req.session.username);
  // res.render('home',{result:{article:[]}});
  // req.session.username = "susan";
  User.find({username: req.session.username}, function (err, result) {
   
    //console.log(err)
    Article.find({author: req.session.username}, function (err, docs) {
     
      //console.log(err);
      //console.log(docs);
      res.render('home', {result: {user: req.session.username, article: docs}});
      // res.json(docs);
      // res.end();
    });
  });
  
});

router.get('/new', function (req, res, next) {
  //user = {username: req.session.username};
  res.render('new', {result: {user: req.session.username}});
});

router.post('/new:store', function (req, res, next) {
  var b = req.body;
  var article = new Article({
    author: req.session.username,
    title: b.title,
    content: b.content
  });

  article.save(function (err, article) {
    if (err) {
      console.log(err);
      return;
    }
    console.log('文章发表成功');
  });

  res.send('ok');
  //res.render('new');
});

router.get('/login', function (req, res, next) {
  res.render('login');
});

router.post('/login1', function (req, res, next) {
  var b = req.body;
  //console.log(b.username);
  User.find({username: b.username}, function (err, result) {
    if (result.length) {
      //req.session.username = b.username;
      //console.log(req.session.username);
      //console.log(b.password);
      //console.log(result[0].password);
      if (b.password == result[0].password) {
        res.send('ok');

      } else {
        res.send('err1');
        //return;
      }

    } else {
      res.send('err2');
      //return;
      //res.send('fail');
    }
    //res.end('ok');
  });
});

router.get('/article', function (req, res, next) {
    var b = req.query || req.params;

    Article.find({_id: b.article_id}, function  (err, result) {
      //console.log(result);
      res.render('article', {result: {user: req.session.username, mes: result}});
    });

});

router.get('/manager', function (req, res, next) {
  User.find({username: req.session.username}, function (err, result) {
    Article.find({author: req.session.username}, function (err, docs) {
      console.log(docs);
      res.render('manager', {result: {user: req.session.username, article: docs}});
    });
  });
});


router.get('/manageredit', function (req, res, next) {
  var b = req.query || req.params;

  //console.log(b.article_id);
  //console.log('ok');
  req.session.article_id = b.article_id;

  Article.find({_id: b.article_id}, function  (err, result) {
      //console.log(result);
    res.render('edit', {result: {user: req.session.username, article: result}});
  });
});

router.post('/edit:store', function (req, res, next) {
  var b = req.body;

  //console.log(b.title);
  Article.update({_id: req.session.article_id}, 
    {$set: {title: b.title, content: b.content}},
    function (err, next) {
      if (err) {
        console.log(err);
      } else {
        res.send('ok');
      }
    });

});

router.get('/manager:del', function (req, res, next) {
  var b = req.query || req.params;

  Article.remove({_id: b.article_id}, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/manager');
    }
    res.end();
  });
});

module.exports = router;
