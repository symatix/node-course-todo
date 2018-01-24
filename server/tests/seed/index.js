const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const { Todo, User } = require('../../db');
const keys = require('../../conf/keys');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [
    {
        _id: userOneId,
        email: 'test@test.com',
        password: 'test123',
        tokens: [{
            access: 'auth',
            token: jwt.sign({_id:userOneId, access: 'auth'}, keys.jwtSecret).toString()
        }]
    },{
        _id: userTwoId,
        email: 'abcd@abc.com',
        password: 'abcd123',
        tokens: [{
            access: 'auth',
            token: jwt.sign({_id:userOneId, access: 'auth'}, keys.jwtSecret).toString()
        }]
    }
]

const populateUsers = (done) => {
    User.remove({}).then(() => {
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo]);
    }).then(() => done());
}


const todos = [
    {
        _id: new ObjectID(),
        text: 'First test todo'
    }, {
        _id: new ObjectID(),
        text: 'Second test todo',
        completed: true,
        completedAt: 333
    }
];

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        Todo.insertMany(todos);
    }).then(() => done());
}

module.exports = { users, populateUsers, todos, populateTodos };