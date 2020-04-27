

const a = [1, 1]

for (let i = 0; i < 32; i++) {
  a.push(a[a.length - 2] + a[a.length - 1])
}

