var express = require('express');
var router = express.Router();
var fs = require('fs');
var PATH = './public/data/'

// 定制路由
/* GET home page. 这是localhost:3000访问的主页*/
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  
  if(!req.session.user) {
	  return res.render('login', {});
  }
  res.render('index', {});
  
});

router.get('/login', function(req, res, next) {
  res.render('login', {});
});

router.get('/tuijian', function(req, res, next) {
  if(!req.session.user){
    return res.render('login', {});
  }
  res.render('tuijian', {});
});

router.get('/edit', function(req, res, next) {
  if(!req.session.user){
    return res.render('login', {});
  }
  var type = req.query.type;
  if(type){
    var obj = {};
    switch (type){
      case 'sanwen':
        obj = {};
        break;
      case 'it':
        obj = {};
        break;
      case 'manager':
        obj = {};
        break;
      case 'cookies':
        obj = {};
        break;
      default :
        return res.send({
          status:0,
          info: '参数错误'
        });
        break;
    }
    fs.readFile(PATH + type + '.json', (err, data) => {
      if (err) {
        return res.send({
          status:0,
          info: 'fail.....'
        });
      }
      // var obj = JSON.parse(data.toString());
	  // 当json数据为空时，直接使用上面一句会报如下错误：
	  // unexpected end of json input at json.parse anonymous
	  // JSON.parse无法识别某些url中的特殊字符（此处是空字符），所以报错。
	  
	  // try catch 如果json为空，则返回空数组
	  var obj = [];
	  try {
	  		  obj = JSON.parse(data.toString());
	  } catch(e) {
	  		  obj = []
	  }
	  
      return res.render('edit', {
        data: obj
      });
    });

  }else{
    return res.send({
      status:0,
      info: '参数错误'
    });
  }
});

//首页大表单

module.exports = router;
