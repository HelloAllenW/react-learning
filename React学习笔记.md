# 安装node环境 

1、nodejs安装好后（自带npm），不用配置环境变量，直接在cmd中检测node -v 和  npm -v 

2、如果不能翻墙，需要安装淘宝的npm镜像源 npm install -g cnpm --registry=https://registry.npm.taobao.org，
之后便通过cnpm install [name]来安装组件

---------------------------------------------------------------------------------------------------------

# 创建基本的webpack 4.x 项目

1、在项目根目录文件夹下使用 npm init -y 快速初始化项目
	完成后，会生成package.json文件，这是所有npm包的配置文件
	
2、在项目根目录创建src源代码目录和dist产品目录

3、在src目录下创建index.html，index.js
	
4、使用cnpm安装webpack，运行 cnpm i webpack -D

5、使用cnpm安装webpack-cli，运行 cnpm i webpack-cli -D
因为webpack 4.x打包命令webpack在webpack-cli中

6、手动生成并配置 webpack.config.js 文件，使用初始化配置模板
module.exports = {
	// development、production生产模式，生成的bundle文件会被压缩
	mode: 'development'
}
说明：在webpack 4.x中，为了尽量减少配置文件的体积，提供了约定大于配置的概念.
默认的打包入口路径是 src/index.js，所以此处可不用配置
使用webpack打包命令打包后，默认会自动在dist文件夹下生成main.js打包文件

7、Webpack 热加载配置
	安装webpack服务器包：sudo npm install -g webpack-dev-server

8、使用webpack打包并运行
（1）直接运行html文件会报错，浏览器不识别React语法，因此需要webpack打包编译。
（2）webpack 命令可直接将项目打包成为bundle.js，让html加载这个bundle.js即可在浏览器成功运行。
（3）2方法每次更改代码后都需要重新生成bundle.js文件，然后刷新浏览器即可看到修改内容。
		webpack --watch 命令可以在修改代码后自动编译更新bundle.js文件，只需刷新浏览器可看到修改内容
（4）webpack-dev-server 命令会在webpack服务器中部署生成一个路径，在浏览器中使用此路径进行调试可以
		做到修改代码后自动更新浏览器，达到热加载效果
	webpack-dev-server命令生成的打包文件会存储在内存中，不会在项目根目录中看到
（5）4方法webpack自动生成的路径过长，现简略为localhost:8080，方法为使用命令：
		webpack-dev-server --contentbase src --inline --hot
（6）在package.json文件中进行打包命令设置 npm run dev
...
"script": {
	"test": "echo \...  exit 1",
	"dev": "webpack-dev-server --open --hot" // 配置此句
}
...

9、如果需要的话，可以将使用 html-webpack-plugin 将根目录下的index.html托管到内存中，使用方法见（html-webpack-plugin.png）


---------------------------------------------------------------------------------------------------------

# 虚拟DOM

1、缘由
（1）DOM树的概念：
一个页面呈现的过程：
浏览器请求服务器获取页面HTML代码；
浏览器要先在内存中，解析DOM结构，并在浏览器内存中，渲染出一颗DOM树；
浏览器把DOM树呈现在页面上。
（2）发现问题：
如果修改了其中一个小元素，浏览器会重新渲染并加载整颗DOM树。
要想把性能做到最优，就要按需渲染页面，即就是只重新渲染更新的数据所对应的页面元素。
（3）解决思路：
如何实现页面的按需更新呢？获取内存中的新旧两颗DOM，进行对比，得到需要按需更新的DOM元素。
但是浏览器并没有提供获取DOM树的接口，因此自己写一个新旧DOM树，俗称虚拟DOM

2、虚拟DOM概念：
用JS对象的形式，来表示DOM和DOM之间的嵌套关系。目的是为了实现DOM的高效更新
（自我认为是使用虚拟DOM可以实现页面局部刷新，即就是只刷新内容被修改了的元素组件）

---------------------------------------------------------------------------------------------------------

# Diff算法

创建虚拟DOM后（即就是新旧两颗DOM树），需要进行比对，然后得到需要按需更新的DOM元素。比对的过长分为以下三步：
1、tree diff
2、component diff
3、element diff

---------------------------------------------------------------------------------------------------------

# 在项目中使用react

在 “创建基本的webpack 4.x 项目” 创建的项目基础上操作

1、运行 cnpm i react react-dom -S 安装包
react: 专门用于创建组件，同时组件的生命周期都在这个包中
react-dom：专门进行DOM操作的，最主要的应用场景就是ReactDOM.render()

2、在 index.html 页面中创建容器
// 容器，将来使用React创建的虚拟DOM元素都会被渲染到这个指定的容器中
<div id="app"></div>

3、在js中导入包
import React from 'react'
import ReactDOM from 'react-dom'

4、在js中创建虚拟DOM元素
// 参数1：创建的元素的类型，字符串表示元素的名称
// 参数2：是一个对象或null，表示当前这个DOM元素的属性
// 参数3：子节点（包括其他虚拟DOM获取文本子节点）
// 参数n: 其他子节点
const mydiv = React.createElement('div', {id: 'mydiv', title: 'div aaa'}, '这是一个div')

5、在js中调用render函数渲染在页面上
// 参数1: 要渲染的那个虚拟DOM元素
// 参数2: 指定页面上的DOM元素，当做容器
ReactDOM.render(mydiv, document.getElementById('app'))

---------------------------------------------------------------------------------------------------------

# babel的安装与使用（在React项目中启用JSX语法）

1、缘由：
如果在js中全部使用React.createElement创建虚拟DOM的形式，程序员会崩溃。
但是在js文件中，默认不能直接写HTML的标记，会造成打包失败。
因此能否这样，我们将js中的html标记自动转化为React.createElement创建虚拟DOM的形式。
答案是：通过babel。
webpack默认只能打包处理.js后缀名类型的文件，像.png、vue无法主动处理，通过配置第三方的loader都可以解决。

2、JSX概念说明：
在JS中，混合写入类似于HTML的语法，叫做JSX语法（符合XML规范的JS）
JSX语法的本质，还是在运行的时候，被转换成了React.createElement形式来执行。

3、使用babel流程：
（1）安装babel插件
运行：cnpm i babel-core babel-loader babel-plugin-transform-runtime -D
运行：cnpm i babel-preset-env babel-preset-stage-0 -D
（2）安装能够识别转换JSX语法的包 babel-preset-react
运行：cnpm i babel-preset-react -D
（3）添加.babelrc配置文件
{
	"presets": ["env", "stage-0", "react"],
	"plugins": ["transform-runtime"]
}
（4）添加babel-loader配置项（在webpack.config.js中配置，与mode属性平级）
module: {
	rule: [
		// jsx 表示确保可以解析出react的组件jsx文件
		{ test: /\.js|jsx$/, use: 'babel-loader', exclude: /node_modules/ }
	]
}

---------------------------------------------------------------------------------------------------------

# JSX 语法中的注意事项
jsx语法的本质：并不是直接把jsx渲染到页面中，而是内部先转换成了createElement形式再渲染的

1、在jsx中混合写入js表达式：在jsx语法中，要把JS代码写到 {} 中
例：
import React from 'react'
import ReactDOM from 'react-dom'

let a = 10; //渲染数字
let str = '你好' //字符串
let boo = false //布尔值
let title = '999' //为属性绑定值
const h1 = <h1>哦哦哦</h1> //jsx元素
const arr = [ //jsx元素数组
	<h2>这是h2</h2>
	<h3>这是h3</h3>
]

//将普通字符串数组转为jsx数组并渲染到页面上
const arrStr = ['1', '2', '3', '4']
const nameArr = [] // 定义一个空数组将来用来存放名称 标签
arrStr.forEach(item => {
	// 注意：react中，需要把key添加给forEach或map或for循环直接控制的元素。否则控制台会输警告
	const temp = <h5 key={item}>{item}</h5>
	nameArr.push(temp)
})


ReactDOM.render(<div>
	{ a + 2 }
	{ str }
	{ boo ? '条件为真':'条件为假' }
	<p title={title}>这是p标签</p>
	{ h1 }
	{ arr }
	{ nameArr } // 如果输出为arrStr则输出为字符串，需要在外部重新设置为nameArr
	{ arrStr.map(item => { // 如果输出为arrStr则输出为字符串，可在内部使用map实现输出jsx数组
		return <h3 key={item}>{item}</h3>
	})}
</div>, document.getElementById('app'))

2、注释：
{ /* 我是注释 */ }

3、为jsx中的元素添加class类名：需要使用className来替代class；htmlFor替代label的for属性

---------------------------------------------------------------------------------------------------------

# React中创建组件

1、使用构造函数来创建组件
function 组件名() {
	return null
}

例：
import React from 'react'
import ReactDOM from 'react-dom'

// 组件名必须是大写
function Hello(props) { // 通过props接收从外部传进来的数据
	// 在组件中，必须返回一个合法的JSX虚拟DOM元素
	return <div>这是Hello组件 - { props.name } - { props.age }</div>;
}

const dog = {
	name: '大黄',
	age: 3
}

ReactDOM.render(<div>
    {/* 直接把组件的名称，以标签形式引用 */}
	<Hello name={dog.name} age={dog.age}></Hello>
	{/* <Hello {...dog}}></Hello> */} // 如果属性过多，可使用ES6的展开运算符
</div>, document.getElementById('app'))

2、完成后可将组件独立成为一个文件：Hello.jsx 
（1）新建文件Hello.jsx
文件第一行添加：import React from 'react'
剪切Hello()整个组件即可，并需要在文件下部添加：export default Hello

（2）在需要使用组件的js中导入：import Hello from './components/Hello.jsx'
如果想要省略路径后面的.jsx后缀名，需要在webpack.config.js文件中设置(与mode平级)：
resolve: {
	extensions: ['.js', '.jsx', '.json'], // 表示这几个文件后缀名可不写，默认会补全。'./components/Hello'
	alias: {
		'@': path.join(__dirname, './src') // @符号表示项目根目录中的src路劲，因此上面的导入路径可写为：'@/components/Hello.jsx'
	}
}

3、使用class关键字来创建组件
// 在class关键字创建的组件中，如果想使用外接传递过来的props参数，可直接通过this.props.***访问
class 组件名称 extends React.Component {
	constructor() {
		// 继承必须调用super()
		super()
		// 只有调用了super()之后，才能使用this关键字
		this.state = { // 相当于vue中的data(){return{}}
			// 创建私有数据
		}
	}
	render(){
		// 调用私有数据应该使用：this.state.***
		return <div>这是class创建的组件 -- { this.props.name }</div>
	}
}
用构造函数创建出来的组件称为“无状态组件”；用class关键字创建出来的组件称为“有状态组件”。
使用class关键字创建的组件有自己的私有数据（有state属性）和生命周期函数；使用function创建的组件，只有props没有私有数据和生命周期函数。

4、jsx中使用样式
jsx中行内样式不应该style="color:red"这样写，而是写为：style={{ color: 'red' }}
注意：在行内样式中，如果是数值类型的样式，则可以不用引号包裹；如果是字符串类型的样式值，必须使用引号包裹

（1）行内样式
<h1 style={ { color: 'red' } }>哈哈哈</h1>
（2）第一层封装，将样式对象和UI结构分离
const itemStyle = { fontSize: '14px' }
const userStyle = { fontSize: '12px' }
（3）第二层封装，合并成一个大的样式对象
const styles = {
	item: {fontSize: '14px'},
	user: {fontSize: '12px'}
}
（4）第三次封装，抽离为单独的样式表模块
import styles from '@/components/styles'
（5）使用css样式表
- 在src下创建style.css文件
- 运行命令：cnpm i style-loader css-loader -D
- 在webpack.config.js中配置
	rules: [ // 第三方匹配规则
		{ test: /\.css$/, use: ['style-loader', 'css-loader'] } // 打包处理css样式表的第三方loader
	]
- 在需要使用css的jsx文件中导入
	import cssobj from '@/css/style.css'
- 使用
	<h1 className="title">哈哈哈</h1>
- 问题：模块样式表没有作用域，所以导致在任一jsx文件导入一次后，整个项目都生效
vue中通过<style scoped></style>解决冲突问题
解决方法：在webpack配置文件中css.loader之后，通过?追加固定参数modules，表示为普通的css样式表启用模块化
	rules: [
		{ test: /\.css$/, use: ['style-loader', 'css-loader?modules'] }
	]
jsx中：
	import cssobj from '@/css/style.css'
	console.log(cssobj)
	<h1 className={cssobj.title}>哈哈哈</h1>
注意：css模块化只针对类选择器和id选择器，不会将标签选择器模块化

---------------------------------------------------------------------------------------------------------

