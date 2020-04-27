// npm i -S sqlite3
const sqlite3 = require('sqlite3').verbose();

const setupDatabase = () => {
  // in-memory database
  const db = new sqlite3.Database(':memory:');
  // run serialize
  db.serialize(() => {
    db.run("create table user(id int, name text)")
    db.run("insert into user values (?, ?)", [1, 'alice']) // execute with parameter
  })
  return db
}

const withSqlite = () => {
  const db = setupDatabase()
  return (req, res, next) => {
    req.db = db
    req.next() // go to next handler
  }
}

module.exports = { withSqlite }
