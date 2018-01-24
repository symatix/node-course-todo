var { ObjectID } = require('mongodb');
var { mongoose, Todo, User } = require('../db');

module.exports = function (app) {

	app.delete('/todos/:id', (req, res) => {
        var id = req.params.id;

        if (!ObjectID.isValid(id)){
            return res.status(404).send();
        }
        Todo.findByIdAndRemove(id).then( todo => {
            if (!todo) {
                return res.status(404).send();
            }
            res.status(200).send(todo);
        }).catch(err => res.status(400).send(err))
    })
}