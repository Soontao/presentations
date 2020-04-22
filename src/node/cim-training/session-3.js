

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