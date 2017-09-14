const TABLE = 'todos';
const COLUMNS = [
  'id',
  'title',
  'done'
];

const deserialize = (row) => {
  const done = !!row.done;
  return Object.assign({}, row, { done });
}

const getTodos = (db) =>
  db(TABLE).select(COLUMNS)
  .then((todos) => todos.map(deserialize));

const createTodo = (db, todo) =>
  db.insert(todo)
  .into(TABLE)
  .then((todoId) => todoId[0] || null)

const getTodo = (db, id) =>
  db(TABLE).select(COLUMNS).first()
  .where('id', id)
  .then((todo) => todo ? deserialize(todo) : null);

const updateTodo = (db, todo, id) =>
  db(TABLE).update(todo)
  .where('id', id);

const destroyTodo = (db, id) =>
  db(TABLE).del()
  .where('id', id);


module.exports = (db) => ({
  getTodos: getTodos.bind(null, db),
  createTodo: createTodo.bind(null, db),
  getTodo: getTodo.bind(null, db),
  updateTodo: updateTodo.bind(null, db),
  destroyTodo: destroyTodo.bind(null, db)
})
