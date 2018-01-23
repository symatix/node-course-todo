const _ = require('lodash');
const {ObjectID} = require('mongodb');
const {mongoose, Todo, User} = require('../db');

module.exports = function (app) {

    app.patch('/todos/:id', (req, res) => {
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

        Todo.findByIdAndUpdate(id, {
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

}