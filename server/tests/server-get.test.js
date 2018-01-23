const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const app = require('../index');
const { Todo } = require('../db');

const todos = [{
    _id: new ObjectID(),
    text: "Test 1"
},{
    _id: new ObjectID(),
    text: "Test 2"
},{
    _id: new ObjectID(),
    text: "Test 3"
}]

describe('GET', () => {
    
    beforeEach((done) => {
        Todo.remove({}).then(() => {
            return Todo.insertMany(todos);
        }).then(() => done());
    })

    describe('/todos', () => {
        it('should get a list of all todos', (done) => {
            request(app)
                .get('/todos')
                .expect(200)
                .expect((res) => {
                    expect(res.body.todos.length).toBe(3);
                    expect(res.body.todos[1].text).toBe(todos[1].text);
                })
                .end(done)
        })
    })
    describe('/todos/:id', () => {
        it('should get a single todo', (done) => {

            request(app)
                .get(`/todos/${todos[0]._id.toHexString()}`)
                .expect(200)
                .expect((res) => {
                    expect(res.body.text).toBe(todos[0].text);
                })
                .end(done)
        })
        it('should return 404 for non-object id', (done) => {
            request(app)
                .get(`/todos/123abc`)
                .expect(404)
                .end(done)
        })
        it('should return 404 if todo not found', (done) => {
            const id = new ObjectID().toHexString();
            request(app)
                .get(`/todos/${id}`)
                .expect(404)
                .end(done)
        })
    })
})