// Dependencies
var restify = require('restify')
var todoController = require('./controllers/todo')

// Server
var server = restify.createServer()

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'content-type')
  next()
})

// Routes
server.get('/', function(req, res, next) {
  res.send('home')
  return next()
})

server.get('/api/v1/todos', todoController.index)
server.post('/api/v1/todos', todoController.create)
server.get('/api/v1/todos/:id', todoController.show)
server.put('/api/v1/todos/:id', todoController.update)
server.del('/api/v1/todos/:id', todoController.destroy)

server.listen('3000', function() {
  console.log('Server started on port 3000...')
})
