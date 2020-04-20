var a = 1;

var f = () => {
  console.log(a)
}


function New(clazz, ...params) {
  const obj = {}
  obj.constructor = clazz
  clazz.call(obj, ...params)
  return obj
}

class People {
  constructor(name) {
    this.name = name
  }
}


function People(name) {
  this.name = name
}

People.prototype.getName = function () {
  return this.name
}

// create anonymous class and assign it to `People2`
const People2 = class extends People {
  constructor(name) {
    super(name + "1") // parent class constructor
  }

  getName() {
    return this.name
  }
}

var p2 = new People2("admin") // People2 { name: 'admin1' }

var c2 = new class {
  constructor(p, name = "whatever") {
    this.name = name
    this.p = p
  }
  print() {
    console.log(this.p.getName())
    var f = this.p.getName
    console.log(f())
  }
}(new People("admin3"))

c2.print()