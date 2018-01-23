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

describe('DELETE', () => {
    
    beforeEach((done) => {
        Todo.remove({}).then(() => {
            return Todo.insertMany(todos);
        }).then(() => done());
    })
    describe('/todos/:id', () => {
        it('should delete a single todo', (done) => {
            var id = todos[0]._id.toHexString();
            request(app)
                .delete(`/todos/${id}`)
                .expect(200)
                .expect((res) => {
                    expect(res.body._id).toBe(id);
                })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    Todo.findById(id).then( todo => {
                        expect(todo).toBe(null);
                        done();
                    }).catch( err => done(err))
                })
        })
        it('should return 404 for non-object id', (done) => {
            request(app)
                .delete(`/todos/123abc`)
                .expect(404)
                .end(done)
        })
        it('should return 404 if todo not found', (done) => {
            const id = new ObjectID().toHexString();
            request(app)
                .delete(`/todos/${id}`)
                .expect(404)
                .end(done)
        })
    })
})