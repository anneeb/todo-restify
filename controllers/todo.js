function parseResults(rows) {
  return rows.map(function(row) {
    return {
      id: row.id,
      title: row.title,
      done: !!row.done
    }
  })
}

var todo = {
  connection: require('../utils/connection'),
  index: function(req, res, next) {
    todo.connection.query(
      "SELECT * FROM todos",
      function(err, rows, fields) {
        if (err) {
          res.json(err)
          return next()
        } else {
          var todos = parseResults(rows)
          res.json(todos)
          return next()
        }
      }
    )
  },
  create: function(req, res, next) {
    var title = req.body.title
    var done = req.body.done
    todo.connection.query(
      "INSERT INTO todos (title, done) " +
      "VALUES ('" + title + "', " + done + ")",
      function(err, rows, fields) {
        if (err) {
          res.json(err)
          return next()
        } else {
          todo.connection.query(
            "SELECT * FROM todos ORDER BY id DESC LIMIT 1",
            function(err, rows, fields) {
              if (err) {
                res.json(err)
                return next()
              } else {
                var todos = parseResults(rows)
                res.json(todos)
                return next()
              }
            }
          )
        }
      }
    )
  },
  show: function(req, res, next) {
    var id = req.params.id
    todo.connection.query(
      "SELECT * FROM todos WHERE id = " + id,
      function(err, rows, fields) {
        if (err) {
          res.json(err)
          return next()
        } else {
          var todos = parseResults(rows)
          res.json(todos)
          return next()
        }
      }
    )
  },
  update: function(req, res, next) {
    var id = req.params.id
    var title = req.body.title
    var done = req.body.done
    todo.connection.query(
      "UPDATE todos SET title = '" + title + "', done = " + done +
      " WHERE id = " + id,
      function(err, rows, fields) {
        if (err) {
          res.json(err)
          return next()
        } else {
          todo.connection.query(
            "SELECT * FROM todos WHERE id = " + id,
            function(err, rows, fields) {
              if (err) {
                res.json(err)
                return next()
              } else {
                var todos = parseResults(rows)
                res.json(todos)
                return next()
              }
            }
          )
        }
      }
    )
  },
  destroy: function(req, res, next) {
    var id = req.params.id
    todo.connection.query(
      "DELETE FROM todos WHERE id = " + id,
      function(err, rows, fields) {
        if (err) {
          res.json(err)
          return next()
        } else {
          res.send(200,"Todo " + id + " was deleted.")
        }
      }
    )
  }
}

module.exports = todo
