var { ObjectID } = require('mongodb');
var { mongoose, Todo, User } = require('../db');

module.exports = function (app) {

    // endpoint for creating new todos
	app.get('/todos', (req, res) => {
        Todo.find({}).then( todos => {
            res.status(200).send({todos});
        }, err => res.status(400).send(err));
        
    })

    app.get('/todos/:id', (req, res) => {
        var id = req.params.id;

        if (!ObjectID.isValid(id)){
            return res.status(404).send();
        }

        Todo.findById(id).then( todo => {
            if (!todo) {
                return res.status(404).send(todo);
            }
            res.status(200).send(todo);
        }).catch(err => res.status(400).send(err))
    })

}