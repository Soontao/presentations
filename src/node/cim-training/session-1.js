

const o1 = { a: 1, b: "2" } // create an object with 2 properties
o1.a = 2 // change the properties
// o1 = {} // ERROR

const { a, b } = o1 // de-construct
a === 2

o1.a = 5
o1.a != a


const obj = { a: 1, b: 2 }
const keys = Object.keys(obj)
// keys == [ 'a', 'b' ]
const values = Object.values(obj)
// values == [ 1, 2 ]

for (const key in obj) {
  if (obj.hasOwnProperty(key)) {
    const value = obj[key];
    console.log(`${key}: ${value}`)
  }
}


1 + 2 // 3
1 - 2 // -1
1 * 2 // 2
1 / 2 // 0.5
3 ** 2 // 9
3 % 2 // 1


var a = { b: 1, c: 2, d: 0 }
if (a.b) {
  // will run
}
if (a.d) {
  // not run
} else {
  // will run
}
if (true) {
  // will run
}


Boolean(0) // false
Boolean(1)
Boolean(undefined) // false
Boolean(null) // false
Boolean(NaN) // false
Boolean({ a: 1 })
Boolean(new Date())
Boolean([]) // true
Boolean([1])
Boolean("") // false
Boolean("1") // true


var arr1 = [1, 2, 3]

for (let idx = 0; idx < arr1.length; idx++) {
  const ele = arr1[idx];

}

arr1.forEach((ele, idx) => {

})

function f1(p1, p2 = 3) {
  const { a, b } = p1 // de-construct
}

// arrow function, no context
const f2 = ({ a, b }, p2) => { // de-construct parameter

}

async function f3() { // async function, execute it will return Promise object
  return await 1; // you can use other function
}

