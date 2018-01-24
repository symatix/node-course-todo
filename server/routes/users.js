const _ = require('lodash');
var { ObjectID } = require('mongodb');
var { mongoose, Todo, User } = require('../db');
var authenticate = require('../middleware/auth');

module.exports = function (app) {

    /* GET */
    app.get('/users/me', authenticate, (req, res) => {
        var token = req.header('x-auth');

        User.findByToken(token).then(user => {
            if (!user) {
                return Promise.reject({error: 'User not found!'})
            }
            res.status(200).send(user);
        }).catch( err => res.status(401).send(err))
    })

    /* POST */
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