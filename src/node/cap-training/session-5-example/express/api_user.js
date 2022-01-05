const { Router } = require("express")
const fs = require("fs")
const path = require("path")
const api_user = Router()

// POST /api/user
api_user.post("/", req => {
  // write db
  // 

})

api_user.get("/:id", req => {
  req.db.get("select * from user where id = ?", [req.params.id], (err, row) => {
    if (err) {
      next(err)
    } else {
      req.res.json(row)
    }
  })
})



module.exports = api_user