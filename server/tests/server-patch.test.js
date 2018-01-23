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

describe('PATCH', () => {

    beforeEach((done) => {
        Todo.remove({}).then(() => {
            return Todo.insertMany(todos);
        }).then(() => done());
    })
    describe('/todos/:id', () => {
        it('should update a single todo', (done) => {
            var id = todos[0]._id.toHexString();
            var updateTodo = { text:"new text", completed:true };

            request(app)
                .patch(`/todos/${id}`)
                .send(updateTodo)
                .expect(200)
                .expect((res) => {
                expect(res.body.todo.text).toBe("new text");
                expect(res.body.todo.completed).toBe(true);
                expect(res.body.todo.completedAt).not.toBeNull();
                })
                .end(done);
        })
        it('should clear completedAt when todo is not completed', (done) => {
            var id = todos[0]._id.toHexString();
            var updateTodo = { text:"new text", completed:false };

            request(app)
                .patch(`/todos/${id}`)
                .send(updateTodo)
                .expect(200)
                .expect((res) => {
                expect(res.body.todo.text).toBe("new text");
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toBeNull();
                })
                .end(done);
        })

        
        // it('should return 404 for non-object id', (done) => {
        //     request(app)
        //         .delete(`/todos/123abc`)
        //         .expect(404)
        //         .end(done)
        // })
        // it('should return 404 if todo not found', (done) => {
        //     const id = new ObjectID().toHexString();
        //     request(app)
        //         .delete(`/todos/${id}`)
        //         .expect(404)
        //         .end(done)
        // })
    })
})