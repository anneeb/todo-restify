const { NotFoundError, InternalServerError } = require('restify-errors');

const getTodos = (req, res, next) => {
  req.db.getTodos()
  .then((todos) => {
    req.ctx.todos = todos;
    return next();
  })
  .catch((err) => {
    return next(new InternalServerError());
  });
};

const returnTodos = (req, res, next) => {
  let todos = [];
  todos = req.ctx.todos;
  res.send(200, todos);
  return next();
}

const createTodo = (req, res, next) => {
  const todoData = Object.assign({}, req.body);
  req.db.createTodo(todoData)
  .then((id) => {
    if (!id) {
      return next (new InternalServerError());
    }
    req.ctx.todo = Object.assign({}, { id });
    return next();
  })
  .catch((err) => {
    return next(new InternalServerError());
  });
}

const getTodo = (req, res, next) => {
  const todoId = req.params.todo_id || req.ctx.todo.id;
  req.db.getTodo(todoId)
  .then((todo) => {
    if (!todo) {
      return next(new NotFoundError());
    }
    req.ctx.todo = todo;
    return next();
  })
  .catch((err) => {
    return next(new InternalServerError());
  });
};

const returnTodo = (req, res, next) => {
  let todo = {};
  todo = req.ctx.todo;
  res.send(200, todo);
  return next();
};

const updateTodo = (req, res, next) => {
  const todo = Object.assign({}, req.ctx.todo, req.body );
  const todoId = req.ctx.todo.id;
  req.db.updateTodo(todo, todoId)
  .then(() => {
    return next();
  })
  .catch((err) => {
    return next(new InternalServerError());
  });
};

const destroyTodo = (req, res, next) => {
  const todoId = req.ctx.todo.id;
  req.db.destroyTodo(todoId)
  .then(() => {
    res.send(204);
    return next();
  })
  .catch((err) => {
    return next(new InternalServerError());
  });
};

module.exports = {
  getTodos,
  returnTodos,
  createTodo,
  getTodo,
  returnTodo,
  updateTodo,
  destroyTodo
}
