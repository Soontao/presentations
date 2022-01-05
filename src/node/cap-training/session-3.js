const a3 = [
  { name: "a", enabled: true },
  { name: "b", enabled: true },
  { name: "c", enabled: false }
]

console.log(a3.filter(item => item.enabled).map(item => item.name))

a3.filter(item => item.enabled).forEach(enabledUser => {
  // 
})

const a1 = [6, 1, 4]
const sum = a1.reduce((acc, cur) => acc + cur, 0)
//  loop,   acc cur,      result
//  1       0   6 (a1[1]) 0 + 6 (go to next loop)
//  2       6   1 (a1[2]) 6 + 1 
//  3       7   4         7 + 4
//  sum 11
console.log(sum)
//  6

const a2 = ["1", "2", "3"]
console.log(a2.reduce((acc, cur) => acc + cur), "")



const a1 = [1, 2, 3] // order list
const a2 = a1.map(processOrder) // transformed order list 
console.log(a1)
console.log(a2)

a2 // persist

function processOrder(order) {
  // ....

  return {}
}


const array = [1, 2, 3]
const a = []
array.forEach(value => {
  if (value > 2) {
    a.push(value)
  }
  console.log(value)
})
// 
console.log("finished")

const fs = require("fs")

fs.readFile("./session-1.js", (err, data) => {
  console.log("in fact, finished at here")
})

console.log("finished")

for (let index = 0; index < array.length; index++) {
  const element = array[index];

}




const s = new Set([1, 2, 3, 3])
Array.from(s) // [ 1, 2, 3 ]

const s2 = new Set()
s2.add(1)
s2.add("1")
s2.add(2)
s2.add(2)
Array.from(s2) // [ 1, '1', 2 ]

[1, 2, 3].forEach((value, index, ref) => {
  // foreach item
})

var a1 = [1, 2, 3]
var a2 = a1.map(v => "" + v)
a1 != a2

var a1 = [1, 2, 3]
var sum = a1.reduce((acc, cur) => acc + cur, 0) // 6

const a3 = [
  { name: "a", enabled: true },
  { name: "b", enabled: true },
  { name: "c", enabled: false }
]

// [ 'a', 'b' ]
const enabledNames = a3.filter(item => item.enabled).map(item => item.name)


["1", 2, "3"].join(",")


const map1 = new Map();

map1.set('0', 'foo');
map1.set(1, 'bar');

for (const v of map1.entries()) {
  console.log(v)
}

map1.forEach((value, key) => {
  console.log(value, key)
})

map1.keys() // all keys
map1.values() // all values


var result = /([a-z]+)\:\/\/(.*)(\:\d+)/.exec("https://domain.com:3333")


var obj = { a: 1, b: 2, c: { d: 3 } }
Object.keys(obj) // [ 'a', 'b', 'c' ]
Object.values(obj) //[ 1, 2, { d: 3 } ]
Object.assign(obj, { a: 11 }, { a: 13, b: 4 }) // { a: 13, b: 4, c: { d: 3 } }

const obj = { a: 1, b: 2, c: { d: 3 } }
console.log(
  Object.assign(obj, { a: 11 }, { a: 13, b: 4 }, { a: 14 })
)


/**
 * @param m {Map<any, string>}
 */
module.exports = function mapReadWrite(m) {


  return m
};


/**
 * @param s {string}
 * @returns {{id:number,name:string,username:string,date:string}}
 */
module.exports = function parse(s = "") {


  return {
    id: 1,
    name: "Alice",
    username: "ALICE001",
    date: "20202020"
  }
};

class People {
  constructor(name) {
    this.name = name
  }
  static createNewPeople(name) {
    return new People(name)
  }
}

People.createNewPeople = (name) => {
  return
}