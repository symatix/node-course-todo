// db setup
var mongoose = require('mongoose');
var Todo = require('../db/models/todo-model');
var User = require('../db/models/users-model');
var keys = require('../conf/keys');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoUri);

module.exports = {
    mongoose, Todo, User
}