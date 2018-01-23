var { mongoose, Todo, User } = require('../db');

module.exports = function (app) {

    // endpoint for creating new todos
	app.post('/todos', (req, res) => {
        var todo = new Todo({ text: req.body.text });
    
        todo.save().then( doc => {
            res.status(200).send(doc);
        }, err => {
            res.status(400).send(err);
        });
    })

}