

const o1 = { a: 1, b: "2" } // create an object with 2 properties
o1.a = 2 // change the properties
// o1 = {} // ERROR

const { a, b } = o1 // de-construct
a === 2

o1.a = 5
o1.a != a
