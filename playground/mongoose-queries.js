const { ObjectID } = require('mongodb');

const { mongoose, Todo, User } = require('../server/db');

var id = "5a6605749e426b495c7d938a";

// if (!ObjectID.isValid(id)){
//     console.log('ID not valid')
// }

// Todo.find({_id: id}).then( todos => {
//     console.log('Todos', todos);
// });

// Todo.findOne({_id: id}).then( todo => {
//     console.log('Todo', todo);
// })

// Todo.findById(id).then( todo => {
//     if (!todo){
//         return console.log("Id not found");
//     }
//     console.log('Todo By Id', todo);
// }).catch( err => console.log(err))

User.findById(id).then( user => {
    if (!user) {
        return console.log("User not found");
    }
    console.log(user)
}).catch( err => console.log("Error:", err.message));

const idd = User.findOne().then( user => console.log(user._id));
console.log(idd)