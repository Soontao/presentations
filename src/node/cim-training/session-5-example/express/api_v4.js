const { Router } = require("express")

const api_v4 = Router()

// http://localhost:3000/api/v4/throw-error-cb
api_v4.get("/throw-error-cb", (req) => {
    setTimeout(() => {
        throw new Error("you can not catch this ha ha") // server will down because nodejs not catch this error
    }, 0)
})

// http://localhost:3000/api/v4/throw-error-cb-2
api_v4.get("/throw-error-cb-2", (req) => {
    // replace with fs or other
    setTimeout(() => {
        req.next(new Error("you catch this error correctly"))
    }, 0)
})

// http://localhost:3000/api/v4/forget-response?name=1
// http://localhost:3000/api/v4/forget-response
api_v4.get("/forget-response", (req) => {
    if (req.query.name) {
        req.res.json({
            name: req.query.name
        })
    }
    // you forget process request without input
    // so, THIS request will not send response to client
})

api_v4.get("/forget-response-correct", (req) => {
    if (req.query.name) {
        req.res.json({
            name: req.query.name
        })
    } else {
        req.next()
    }
})

// http://localhost:3000/api/v4/block-js
api_v4.get("/block-js", req => {
    for (; ;) { } // js engine will stop at here forever
})

module.exports = api_v4