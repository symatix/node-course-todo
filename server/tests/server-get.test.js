const expect = require('expect');
const request = require('supertest');

const app = require('../index');
const { Todo } = require('../db');

const todos = [{
    text: "Test 1"
},{
    text: "Test 2"
},{
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
            Todo.findOne().then((todo) => {

                request(app)
                .get(`/todos/${todo._id}`)
                .expect(200)
                .expect((res) => {
                    expect(res.body.text).toBe(todo.text);
                })
                .end(done)
            }, e => console.log(e))
        })
        it('should get bad request on invalid id', (done) => {
            request(app)
                .get(`/todos/123`)
                .expect(400)
                .end(done)
        })
    })
})