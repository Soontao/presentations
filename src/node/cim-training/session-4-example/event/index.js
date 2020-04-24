const { EventEmitter } = require("events")

const Service = class extends EventEmitter {
  constructor(...args) {
    super(...args)
    this.value = 0;
  }
}

const bus = new Service();

bus.on('add', function (a) {
  this.value += a
});

bus.on('add', function (a) {
  console.log(`after add: ${this.value}`);
});

bus.emit("add", 10)
bus.emit("add", 10)
