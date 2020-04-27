const express = require('express')
const app = express()
const port = 3000

// express 
//
// handler (request, response, next_function) => return void
// 
// path/method/order options
// 
// 


// request 
// path method 
//


// app/router[method](handler)
// middleware
app.use(express.json()) // parse application/json body

app.use(require("./database").withSqlite())

app.get('/', (req, res, next) => { // path: '/'

    req.query // ?a=1
    req.body // http body
    req.params // path

    res.end // native http end method
    res.json // send json response // content-type application/json
    res.render // render template with object
    res.send // pure send text/binary to client
    res.status // set response status
    res.redirect // auth failed, redirect

    res.send(req.get("accept"))
})

app.use('/body-echo', req => { // for all method
    const { body } = req // HTTP request body
    req.res.json()
})

app.use("/resend", (req, res) => {
    // 
})

app.get('/resend',
    (req, res) => {
        res.send('Send 1!')
        res.send('Send fallback value here!')
    }
)

const leakRef = []

// http://localhost:3000/leak
app.get('/leak', (req, res) => {
    for (let i = 0; i < 100 * 1000; i++) {
        leakRef.push(i)
    }
    res.json({
        success: true
    })
})

// http://localhost:3000/api/v1/user/theo
app.get('/api/v1/user/:user', req => {
    const { user } = req.params
    req.res.json({ user })
})

// http://localhost:3000/api/v2/user/theo
app.get("/api/v2/user/:user", (req, res, next) => {
    req.user = req.params.user
    // req.next == next, req.res == res
    req.next() // go to next handler
})

app.get("/api/v2/user/:user", req => {
    req.res.json({ user: req.user })
})

// app.get("/api/v2/user/:user", (req, res, next) => {
//     req.user = req.params.user
//     next() // go to next handler
// })


app.use("/api/v3", require("./api_v3"))

app.use("/api/v4", require("./api_v4"))

app.use("/api/user", require("./api_user"))

const NotFoundError = class extends Error { }

// http://localhost:3000/not-found
app.use(req => {
    throw new NotFoundError()
})

// error handler must place at last
app.use((err, req, res, next) => {
    if (err instanceof NotFoundError) {
        res.json({
            code: 404,
            message: "not found API"
        })
    } else {
        res.json({
            code: 500,
            message: err.toString()
        })
    }
})

if (require.main == module) {
    app.listen(port, () => console.log(`started`))
}

module.exports = app