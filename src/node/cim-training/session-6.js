

function* fibo() {
  let v1 = 1;
  let v2 = 2;
  while (true) {
    const tmp = v1 + v2
    v1 = v2
    v2 = tmp
    yield v2
  }
}

const g = fibo()

console.log(g.next()) // 3
console.log(g.next()) // 5


function* createAsyncValue(value, timeout = 1000) {
  yield new Promise(resolve => {
    setTimeout(() => {
      resolve(value)
    }, 1000)
  })
}

const g = createAsyncValue()
console.log(g.next())