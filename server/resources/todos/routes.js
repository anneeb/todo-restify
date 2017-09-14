const todoHandlers = require('./handlers')

module.exports = (server) => {

  server.get('todos',
    todoHandlers.getTodos,
    todoHandlers.returnTodos
  );

  server.post('/todos',
    todoHandlers.createTodo,
    todoHandlers.getTodo,
    todoHandlers.returnTodo
  );

  server.get('/todos/:todo_id',
    todoHandlers.getTodo,
    todoHandlers.returnTodo
  );

  server.patch('/todos/:todo_id',
    todoHandlers.getTodo,
    todoHandlers.updateTodo,
    todoHandlers.getTodo,
    todoHandlers.returnTodo
  );

  server.del('/todos/:todo_id',
    todoHandlers.getTodo,
    todoHandlers.destroyTodo
  );

};
