# 服务端开发 service

# 1、使用Express框架开发服务（搭建node的Express环境）
（1）npm install -g express-generator@4
（2）在项目根目录下：express -e service
（3）cd service/ 然后 npm install 安装相关依赖
（4）启动：npm start
（5）校验：localhost:3000
（6）安装模块，达到文件修改后自动重启服务的效果，这样就不用每次npm start
	npm install -g supervisor
	然后需要通过supervisor启动：supervisor bin/www

# 2、完成文件读取、文件写入、用户登录接口
在routes/data.js中实现

# 3、后台系统开发
（1）登录储存用户名功能：
	npm install express-session --save
	app.js中新增两行代码
（2）重新定制routes/index.js中的路由，设置其跳转页面
（3）对应的静态页面在views/下

---------------------------------------------------------------------------------

# RN 客户端开发 toilet

# 注意
1、仅开发了iOS端作为学习
2、index.ios.js为入口文件，在里面定义了程序的整体框架，具体的实现在ios_views/文件夹中。
3、ios/文件为OC语法，在xcode打开
4、一定要多看RN官方文档

# Mac + iOS下搭建RN开发环境
brew install node
brew install watchman
npm install -g react-native-cli

# 接上步：初始化项目并运行
react-native init toilet
cd toilet
react-native run-ios

# window 下搭建RN开发环境
1、安装jdk
2、安装sdk
3、安装c++环境
4、安装node.js
5、安装RN命令行工具：npm install -g react-native-cli
6、创建项目：react-native init MyProject
7、运行packager：react-native start
8、准备模拟器或真机运行android：react-native run-android