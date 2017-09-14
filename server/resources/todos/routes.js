const todoHandlers = require('./handlers')

module.exports = (server) => {

  /**
   * @swagger
   * /todos:
   *   get:
   *     tags: [  Todos ]
   *     summary: returns all todos
   *     description: returns all todos
   *     produces:
   *       - application/json
   *     consumes:
   *       - application/json
   *     responses:
   *       200:
   *         description: a body containing todos
   */

  server.get('todos',
    todoHandlers.getTodos,
    todoHandlers.returnTodos
  );

  /**
   * @swagger
   * /todos:
   *   post:
   *     tags: [  Todos ]
   *     summary: creates a todo
   *     description: creates a todo
   *     produces:
   *       - application/json
   *     consumes:
   *       - application/json
   *     parameters:
   *       - name: title
   *         in: body
   *         type: string
   *         required: true
   *       - name: done
   *         in: body
   *         type: boolean
   *         required: true
   *     responses:
   *       200:
   *         description: newly created todo
   *       400:
   *         description: error creating todo
   */

  server.post('/todos',
    todoHandlers.validatePostRequest,
    todoHandlers.createTodo,
    todoHandlers.getTodo,
    todoHandlers.returnTodo
  );

  /**
   * @swagger
   * /todos/{todo_id}:
   *   get:
   *     tags: [  Todos ]
   *     summary: returns a todo by ID
   *     description: returns a todo by ID
   *     produces:
   *       - application/json
   *     consumes:
   *       - application/json
   *     parameters:
   *       - name: todo_id
   *         in: path
   *         type: string
   *         required: true
   *     responses:
   *       200:
   *         description: a body containing todo data
   *       404:
   *         description: todo does not exist
   */

  server.get('/todos/:todo_id',
    todoHandlers.getTodo,
    todoHandlers.returnTodo
  );

  /**
   * @swagger
   * /todos/{todo_id}:
   *   put:
   *     tags: [  Todos ]
   *     summary: updates a todo
   *     description: updates a todo
   *     produces:
   *       - application/json
   *     consumes:
   *       - application/json
   *     parameters:
   *       - name: todo_id
   *         in: path
   *         type: string
   *         required: true
   *       - name: title
   *         in: body
   *         type: string
   *         required: false
   *       - name: done
   *         in: body
   *         type: boolean
   *         required: false
   *     responses:
   *       200:
   *         description: a body containing updated todo data
   *       400:
   *         description: error updating todo
   */

  server.put('/todos/:todo_id',
    todoHandlers.getTodo,
    todoHandlers.validatePutRequest,
    todoHandlers.updateTodo,
    todoHandlers.getTodo,
    todoHandlers.returnTodo
  );

  /**
   * @swagger
   * /todos/{todo_id}:
   *   delete:
   *     tags: [  Todos ]
   *     summary: creates a todo
   *     description: creates a todo
   *     produces:
   *       - application/json
   *     consumes:
   *       - application/json
   *     parameters:
   *       - name: todo_id
   *         in: path
   *         type: string
   *         required: true
   *     responses:
   *       204:
   *         description: todo deleted
   *       404:
   *         description: todo does not exist
   */

  server.del('/todos/:todo_id',
    todoHandlers.getTodo,
    todoHandlers.destroyTodo
  );

};
