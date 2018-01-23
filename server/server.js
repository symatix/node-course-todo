var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

// var Todo = mongoose.model('Todo', {
//     text:{
//         type: String,
//         required: true, // text field must be present for validation to pass
//         minlength: 1, // if text is an empty string, it will fail validation
//         trim: true // removes all leading and ending white spaces
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     },
//     completedAt: {
//         type: Number,
//         default: null
//     }
// });

// var newTodo = new Todo({
//     text: 'Roll it & spark it',
//     completed: true,
//     completedAt: 012218
// });

// newTodo.save().then( doc => {
//     console.log(`Document saved:\n${JSON.stringify(doc, undefined, 3)}`)
// }, e => console.log(`Unable to save: ${e}`));


const User = mongoose.model('User', {
    email:{
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
})

var user = new User({
    email: "pockshocks@gmail.com"
}).save().then( 
    doc => console.log(JSON.stringify(doc, undefined, 3))
    , e => console.log(e)
);