const { Router } = require("express")
const req = require("express/lib/request")

const api_v4 = Router()

// http://localhost:3000/api/v4/health
api_v4.get("/health", (req) => {
    req.res.json({
        "status": 200
    })
})

// http://localhost:3000/api/v4/throw-error-cb
api_v4.get("/throw-error-cb", (req) => {
    setTimeout(() => {
        // server will down because nodejs not catch this error
        throw new Error("you can not catch this ha ha")
    }, 0)
})

// http://localhost:3000/api/v4/throw-error-cb-2
api_v4.get("/throw-error-cb-2", (req) => {
    // replace with fs or other
    setTimeout(async () => {
        try {
            throw new Error("you catch this error correctly")
        } catch (error) {
            req.next(error)
        }
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

    // req.next() // go to next handler
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

// http://localhost:3000/api/v4/crash-1
api_v4.get("/crash-1", () => {
    setTimeout(() => { throw new Error() })
})

// http://localhost:3000/api/v4/crash-2
api_v4.get("/crash-2", () => {
    new Promise((resolve, reject) => reject(new Error()))
})

// http://localhost:3000/api/v4/block-js
api_v4.get("/block-js", req => {
    let i = 1
    for (let index = 0; index < 5000000000; index++) {
        i + index
    }
    console.log("finished")
    req.res.status(200).send()
})

module.exports = api_v4