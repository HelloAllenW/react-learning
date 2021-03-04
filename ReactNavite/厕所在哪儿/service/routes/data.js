var express = require('express');
var router = express.Router();
var fs = require('fs');
var PATH = './public/data/';

/* 读取数据模块, 供客户端调用 */
router.get('/read', function(req, res, next) {
  // 获取用户传进来的type参数，未传为空
  var type = req.param('type') || '';
  // 拼接json路径并读取 : data/read?type=it
  fs.readFile(PATH + type + '.json', function(err, data){
	  if (err) {
		  return res.send({
			  status: 0,
			  info: '读取文件出现异常'
		  });
	  }
	  // 最大返回50行，不可能一次性全部读取完
	  var COUNT = 50; 
	  // try catch 如果json为空，则返回空数组
	  var obj = [];
	  try {
		  obj = JSON.parse(data.toString());
	  } catch(e) {
		  obj = []
	  }
	  if (obj.length > COUNT) {
		  obj = obj.slice(0, COUNT);
	  }
	  return res.send({
		  status: 1,
		  data: obj
	  });
	  
  });
});


/* 存储数据模块，后台系统使用*/
// /data/write?type=it&url=xx.xxx.com&img=xx.com&title=nihao
router.post('/write', function(req, res, next) {
	// 获取文件名
	var type = req.param('type') || '';
	// 关键字段
	var url = req.param('url') || '';
	var title = req.param('title') || '';
	var img = req.param('img') || '';
	if (!type || !url || !title || !img) {
		return res.send({
			status: 0,
			info: '提交的字段不全'
		});
	}
	// 1> 读取文件
	var filePath = PATH + type + '.json';
	fs.readFile(filePath, function(err, data){
		if(err) {
			return res.send({
				status: 0,
				info: '读取数据失败'
			});
		}
		var arr = JSON.parse(data.toString());
		// 代表每一条记录
		var obj = {
			img: img,
			url: url,
			title: title,
			id: guidGenerate(),
			time: new Date()
		};
		arr.splice(0, 0, obj); // 将数据插入到当前数据的最前面
		
		// 2> 写入文件
		var newData = JSON.stringify(arr);
		fs.writeFile(filePath, newData, function(err){
			if (err){
				return res.send({
					status: 0,
					info: '写入文件失败'
				});
			}
			return res.send({
				status: 1,
				info: obj
			});
		});
		
	});
});

// 阅读模块写入接口，后台系统使用
router.post('/write_config', function(req, res, next){
	/* TODO: 后期进行提交数据的验证
	防止 xss 攻击
	npm install xss
	require('xss')
	var str = xss(name)
	*/
   var data = req.body.data;
   var obj = JSON.parse(data);
   var newData = JSON.stringify(obj);
   // 写入
   fs.writeFile(PATH + 'config.json', newData, function(err){
	   if (err) {
		   return res.send({
			   status: 0,
			   info: '写入数据失败'
		   });
	   }
	   return res.send({ 
		   status: 1,
		   info: obj
	   });
   });
});


// 后台系统登录接口
router.post('/login', function(req, res, next){
	// 用户名、密码、验证码
	var username = req.body.username;
	var password = req.body.password;
	
	// TODO:  对用户名、密码进行校验
	// xss处理、判空
	// 密码加密 md5(md5(password + '随机字符串'))
	// 密码需要加密 -> 可以写入JSON文件
	if (username === 'admin' && password === '123456') {
		req.session.user = { // 存值
			username: username
		};
		
		return res.send({
			status: 1
		});
	}
	return res.send({
		status:0,
		info: '登录失败'
	});
});



// 数据库中每条数据都要有唯一id
function guidGenerate() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0,
		v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	}).toUpperCase();
}

module.exports = router;
