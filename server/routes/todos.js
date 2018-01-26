const _ = require('lodash');
var { ObjectID } = require('mongodb');
var { mongoose, Todo, User } = require('../db');
var authenticate = require('../middleware/auth');

module.exports = function (app) {

    /* GET */
	app.get('/todos', authenticate, (req, res) => {
        Todo.find({_creator: req.user._id}).then( todos => {
            res.status(200).send({todos});
        }, err => res.status(400).send(err));
        
    })

    app.get('/todos/:id', authenticate, (req, res) => {
        var id = req.params.id;

        if (!ObjectID.isValid(id)){
            return res.status(404).send();
        }

        Todo.findOne({_id: id, _creator: req.user._id}).then( todo => {
            if (!todo) {
                return res.status(404).send({error: 'Todo does not exist!'});
            }
            res.status(200).send(todo);
        }).catch(err => res.status(400).send(err))
    })
    
    /* POST */
    app.post('/todos', authenticate, (req, res) => {
        var todo = new Todo({ 
            text: req.body.text,
            _creator: req.user._id
        });
    
        todo.save().then( doc => {
            res.status(200).send(doc);
        }, err => {
            res.status(400).send(err);
        });
    })

    /* PATCH */
    app.patch('/todos/:id', authenticate, (req, res) => {
        var id = req.params.id;
        var body = _.pick(req.body, ['text', 'completed']);

        if (!ObjectID.isValid(id)) {
            return res.status(404).send();
        }

        if (_.isBoolean(body.completed) && body.completed) {
            body.completedAt = new Date().getTime();
        } else {
            body.completed = false;
            body.completedAt = null;
        }

        Todo.findOneAndUpdate({ _id: id, _creator: req.user._id }, {
            $set: body
        }, {new: true}).then((todo) => {
            if (!todo) {
                return res.status(404).send();
            }

            res.send({todo});
        }).catch((e) => {
            res.status(400).send();
        })
    });

    /* DELETE */
    app.delete('/todos/:id', authenticate, (req, res) => {
        var id = req.params.id;

        if (!ObjectID.isValid(id)){
            return res.status(404).send();
        }
        Todo.findOneAndRemove({_id: id, _creator: req.user._id}).then( todo => {
            if (!todo) {
                return res.status(404).send();
            }
            res.status(200).send(todo);
        }).catch(err => res.status(400).send(err))
    })
}