var { mongoose, Todo, User } = require('../db');

module.exports = function (app) {

    // endpoint for creating new todos
	app.get('/todos', async (req, res) => {
        var todos = await Todo.find({});
        res.status(200).send(todos);
    })

}