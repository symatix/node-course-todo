// db setup
var mongoose = require('mongoose');
var { Todo } = require('../db/models/todo-model');
var { User } = require('../db/models/users-model');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {
    mongoose, Todo, User
}