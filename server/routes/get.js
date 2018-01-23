var { ObjectID } = require('mongoose');
var { mongoose, Todo, User } = require('../db');

module.exports = function (app) {

    // endpoint for creating new todos
	app.get('/todos', (req, res) => {
        Todo.find({}).then( todos => {
            res.status(200).send({todos});
        }, err => res.status(400).send(err));
        
    })

    app.get('/todos/:id', (req, res) => {
        Todo.findById(req.params.id).then( todo => {
            res.status(200).send(todo);
        }, err => res.status(400).send(err))
    })

}