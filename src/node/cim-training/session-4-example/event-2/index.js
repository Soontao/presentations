const { EventEmitter } = require("events")

const Service = class extends EventEmitter {
  constructor(...args) {
    super(...args)
    this.value = 0;
    this.on("add", this.onAdd.bind(this))
    this.on("add", this.onAfterAdd.bind(this))
  }
  onAdd(v) {
    this.value += v
  }
  onAfterAdd(v) {
    console.log(`after add: ${this.value}`);
  }
}

const bus = new Service();

bus.emit("add", 10)
bus.emit("add", 10)