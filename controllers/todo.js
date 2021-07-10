const Todo = require("../models/todo");
const _ = require("lodash");

exports.getTodoById = (req, res, next, id) => {
  Todo.findById(id).exec((err, todo) => {
    if (err) {
      return res.status(400).json({
        error: "Todo not found",
      });
    }
    req.todo = todo;
    next();
  });
};

exports.createTodo = async (req, res) => {
  const todo = new Todo(req.body);
  const todos = await Todo.findOne({ userId: req.profile._id }).exec();

  await Todo.create({
    userId: req.profile._id,
    name: todo.name,
    description: todo.description,
    status: todo.status,
    priority: todo.priority,
  });

  todos.todos = todo;
  await todos.save();

  res.json(todo);
};

exports.getTodo = (req, res) => {
  return res.json(req.todo);
};

// delete controllers
exports.deleteTodo = (req, res) => {
  let todo = req.todo;
  todo.remove((err, deletedTodo) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete the todo",
      });
    }
    res.json({
      message: "Deletion was a success",
      deletedTodo,
    });
  });
};

// update controllers
exports.updateTodo = (req, res) => {
  const todo = req.todo;
  todo.name = req.body.name;
  todo.description = req.body.description;
  todo.status = req.body.status;
  todo.priority = req.body.priority;
  todo.save((err, updatedTodo) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to update todo",
      });
    }
    res.json(updatedTodo);
  });
};

//todo listing
exports.getAllTodoByUserId = (req, res) => {
  Todo.find({ userId: req.profile._id }).exec((err, todos) => {
    if (err) {
      return res.status(400).json({
        error: "NO todos FOUND",
      });
    }
    res.json(todos);
  });
};
