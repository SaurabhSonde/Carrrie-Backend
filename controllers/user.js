const User = require("../models/user");
const { CreatedTodos } = require("../models/usersTodos");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user was found in DB",
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  return res.json(req.profile);
};

exports.usersTodoList = (req, res) => {
  CreatedTodos.find({ user: req.profile._id })
    .populate("user", "_id name")
    .exec((err, todo) => {
      if (err) {
        return res.status(400).json({
          error: "No todos found",
        });
      }
      return res.json(todo);
    });
};

exports.pushTodosInTodosList = (req, res, next) => {
  let todos = [];
  req.body.todo.todos.forEach((todo) => {
    todos.push({
      _id: todo._id,
      name: todo.name,
      description: todo.description,
      status: todo.status,
      priority: todo.priority,
    });
  });

  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { todos: todos } },
    { new: true },
    (err, purchases) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to save todo list",
        });
      }
      next();
    }
  );
};
