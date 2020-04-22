var a = 1;

var f = () => {
  console.log(a)
}

function People(name) {
  this.name = name
}

function New(clazz, ...params) {
  const obj = Object.create(clazz.prototype)
  clazz.call(obj, ...params)
  return obj
}

New(People, "alice")

class People {
  constructor(name) {
    this.name = name
  }
}

function People(name) { this.name = name }
var p = new People();
p.__proto__ == People.prototype; // true

People.prototype.getName = function () { return this.name; }
"getName" in p; // true
"getName" in People; // true

People.type = "china"; // class property/method, if you want

"type" in p; // false
"type" in People; // true


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

function People(name) {
  this.name = name
}

People.prototype.getName = function () {
  return this.name
}


function People3(name, p) {
  this.name = name
  this.getName = p.getName
}

console.log(new People3("people3", new People("people1")).getName())

const createAsyncValue = function (value) {
  return new Promise(function (resolve, reject) {
    if (value instanceof Error) {
      reject(value)
    } else {
      resolve(value)
    }
  })
}

createAsyncValue("hello promise").then(console.log)
createAsyncValue(new Error("hello promise")).catch(console.error)
createAsyncValue("hello")
  .then(result => createAsyncValue(result + " promise chain"))
  .then(console.log)

createAsyncValue("hello")
  .then(result =>
    createAsyncValue(new Error(result + " promise error chain"))
      .catch(e => console.error(`internal process ${e.message}`))
  )
  .then(console.log)
  .catch(e => console.error(`external process ${e.message}`))


async function run() {
  const hello = await createAsyncValue("hello")
  try {
    await createAsyncValue(new Error("error"))
  } catch (error) {
    // error
  }
}

function hello() {
  console.log(arguments[0])
}

hello("alice")

function hello() {
  console.log(`hello ${this.name}`)
}

hello.call({ name: "alice" })  // hello alice

function hello2(...params) {
  console.log(params[0])
}

hello2("alice") // alice

const f1 = () => { return "f1" }
const f2 = () => "f2"
const f3 = value => `hello ${value}`
const f4 = ({ name }, ...rest) => `hello ${name}`
const f5 = () => `hello ${arguments[0]}`
const f6 = () => `hello ${this.name}`

f1() // => 'f1'
f2() // => 'f2'
f3("alice") // => 'hello alice'
f4({ name: "alice", age: 1000 }) // => 'hello alice'
f5("alice") // Uncaught ReferenceError: arguments is not defined
f6.call({ name: "alice" }) // 'hello undefined'

var a = 1;

var f2 = () => {
  a = 3;
  console.log(a);
}

f2() // output: ?

var a = 1;

var f3 = () => {
  var a = 3;
  console.log(a);
}

f3() // output: ?