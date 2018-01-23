const { ObjectID } = require('mongodb');

const { mongoose, Todo, User } = require('../server/db');

// Todo.remove({}).then( res => console.log(res));

// Todo.findOneAndRemove <- used if you want to query something other than _id
// Todo.findByIdAndRemove

Todo.findOneAndRemove({text: "Do it"}).then( res => console.log(res))

Todo.findByIdAndRemove("5a6754f3de40840b9407e0d0").then( todo => console.log(todo))