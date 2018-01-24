// todo model
var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
    text:{
        type: String,
        required: true, // text field must be present for validation to pass
        minlength: 1, // if text is an empty string, it will fail validation
        trim: true // removes all leading and ending white spaces
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

module.exports = Todo;