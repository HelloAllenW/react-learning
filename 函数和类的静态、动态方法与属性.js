function Person(name, age) {
	this.name = name
	this.age = age
}

// info 属性，直接挂载给了构造函数，所以它是静态属性
Person.info = 'aaa'

// 实例方法
Person.prototype.say = function() {
	console.log('这是Person的实例方法')
}

// 静态方法
Person.show = function() {
	console.log('这是Person的静态show方法')
}

const p1 = new Person('王多多', 18)
console.log(p1)
p1.say() // 这是实例方法
Person.show() // 这是静态方法



/*----------------------------------华丽分割线-------------------------------------*/



// 创建了一个动物类
// 注意1：在class()区间内，只能写构造器、静态方法和静态属性、实例方法
// 注意2：class关键字内部，还是用原来的配方实现的；所以说，我们把class关键字称作语法糖
class Animal {
	// 这是类中的构造器
	// 每一个类中，都有一个构造器，如果没有手动指定构造器，那么可以认为类内部有个隐形的空构造器
	// 构造器的作用就是每当new这个类的时候，必然会优先执行构造其中的代码
	constructor(name, age) {
		this.name = name
		this.age = age
	}
	
	// 在class内部，通过static修饰的属性，就是静态属性
	static info = 'eee'
	
	// 这是Animal的实例方法
	jiao() {
		console.log('Animal的实例方法')
	}
	
	// 这是Animal的静态方法
	static show() {
		console.log('这是Animal的静态show方法')
	}
}

const a1 = new Animal('大黄', 3)
console.log(a1)
a1.jiao() // 这是实例方法
Animal.show() // 这是静态方法