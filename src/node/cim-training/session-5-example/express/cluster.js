var app = require("./server");
var cluster = require('cluster')
var coreCount = require('os').cpus().length;

if (cluster.isMaster) {

    console.log("starting...");

    for (var i = 0; i < coreCount; i++) {
        cluster.fork();
    }

    cluster.on('listening', worker => {
        console.log(`core ${i}-${worker.process.pid}: started`);
    });

    cluster.on('exit', worker => {
        console.log(`core ${i}-${worker.process.pid}: restarting`);
        setTimeout(function () { cluster.fork(); }, 0);
    });

} else {

    app.listen(3000, () => { });

}