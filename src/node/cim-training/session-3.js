

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