const apple = require("./apple")
const fruit = require("./fruit") // load from cache

console.log(apple.fruit == fruit.fruit)
