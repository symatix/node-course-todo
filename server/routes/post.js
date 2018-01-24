const _ = require('lodash');
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

    // USERS
    app.post('/users', (req, res) => {
        var body = _.pick(req.body, ['email', 'password']);
        var user = new User(body);
      
        user.save().then(() => {
          return user.generateAuthToken();
        }).then((token) => {
            res.header('x-auth', token).send(user);
        }).catch((e) => {
            res.status(400).send(e);
        })
      });

}