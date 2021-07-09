const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const UsersTodoSchema = new mongoose.Schema({
  product: {
    type: ObjectId,
    ref: "Todo",
  },
  name: String,
  description: String,
  status: String,
  priority: String,
});

const UsersTodo = mongoose.model("UsersTodo", UsersTodoSchema);

const CreatedTodosSchema = new mongoose.Schema(
  {
    todos: [UsersTodoSchema],
    user: {
      type: ObjectId,
      ref: "User",
    },
    name: String,
  },
  { timestamps: true }
);

const CreatedTodos = mongoose.model("CreatedTodos", CreatedTodosSchema);

module.exports = { CreatedTodos, UsersTodo };
