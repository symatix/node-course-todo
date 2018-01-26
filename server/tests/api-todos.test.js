const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const app = require('../');
const { Todo } = require('../db');
const { users, todos, populateTodos, populateUsers } = require('./seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('=> API - TODOS', () => {

    // do a clean slate of the test DB


    describe('GET /todos', () => {
        it('should fetch all todo documents', (done) => {
            request(app)
                .get('/todos')
                .set('x-auth', users[0].tokens[0].token)
                .expect(200)
                .expect((res) => {
                    expect(res.body.todos.length).toBe(1);
                })
                .end(done)
        })
    });

    describe('GET /todos/:id', () => {
        it('should get a single todo', (done) => {
            const hexId = todos[0]._id.toHexString();
            request(app)
                .get(`/todos/${hexId}`)
                .set('x-auth', users[0].tokens[0].token)
                .expect(200)
                .expect((res) => {
                    expect(res.body.text).toBe(todos[0].text);
                })
                .end(done)
        })
        it('should not return a single todo of different creator', (done) => {
            const id = todos[0]._id.toHexString();
            request(app)
                .get(`/todos/${id}`)
                .set('x-auth', users[1].tokens[0].token)
                .expect(404)
                .end(done)
        })
        it('should return 404 for non-object id', (done) => {
            request(app)
                .get(`/todos/123abc`)
                .set('x-auth', users[0].tokens[0].token)
                .expect(404)
                .end(done)
        })
        it('should return 404 if todo not found', (done) => {
            const id = new ObjectID().toHexString();
            request(app)   
                .get(`/todos/${id}`)
                .set('x-auth', users[0].tokens[0].token)     
                .expect(404)
                .end(done)
        })
    });

    describe('POST /todos', () => {
        it('should create new todo', (done) => {
            var text = 'changed';
    
            request(app)
                .post('/todos')
                .set('x-auth', users[0].tokens[0].token)
                .send({ text })
                .expect(200)
                .expect((res) => {
                    expect(res.body.text).toBe(text)
                })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    Todo.find().then( todos => {
                        expect(todos.length).toBe(3);
                        expect(todos[2].text).toBe(text);
                        done();
                    }).catch( e => done(e))
                })
        });
        it('should not create todo with invalid body data', (done) => {
            request(app)
                .post('/todos')
                .send({})
                .expect(401)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    Todo.find().then( todos => {
                        expect(todos.length).toBe(2);
                        done();
                    }).catch( e => done(e))
                })
        })
    });

    
    describe('PATCH /todos/:id', () => {
        it('should update a single todo', (done) => {
            var id = todos[0]._id.toHexString();
            var updateTodo = { text:"new text", completed:true };

            request(app)
                .patch(`/todos/${id}`)
                .set('x-auth', users[0].tokens[0].token)
                .send(updateTodo)
                .expect(200)
                .expect((res) => {
                expect(res.body.todo.text).toBe(updateTodo.text);
                expect(res.body.todo.completed).toBe(true);
                expect(res.body.todo.completedAt).not.toBeNull();
                })
                .end(done);
        })
        it('should not update a todo of different user', (done) => {
            var id = todos[0]._id.toHexString();
            var updateTodo = { text:"new text", completed:true };

            request(app)
                .patch(`/todos/${id}`)
                .set('x-auth', users[1].tokens[0].token)
                .send(updateTodo)
                .expect(404)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    Todo.findById(id).then( todo => {
                        expect(todo).not.toBe(updateTodo);
                        done();
                    }).catch( err => done(err));
            })
        })
        it('should clear completedAt when todo is not completed', (done) => {
            var id = todos[0]._id.toHexString();
            var updateTodo = { text:"new text", completed:false };

            request(app)
                .patch(`/todos/${id}`)
                .set('x-auth', users[0].tokens[0].token)
                .send(updateTodo)
                .expect(200)
                .expect((res) => {
                expect(res.body.todo.text).toBe("new text");
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toBeNull();
                })
                .end(done);
        })
    });

    describe('DELETE /todos/:id', () => {
        it('should delete a single todo', (done) => {
            var id = todos[0]._id.toHexString();
            request(app)
                .delete(`/todos/${id}`)
                .set('x-auth', users[0].tokens[0].token)
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
        
        it('should not delete a todo of different creator', (done) => {
            var id = todos[0]._id.toHexString();
            request(app)
                .delete(`/todos/${id}`)
                .set('x-auth', users[1].tokens[0].token)
                .expect(404)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    Todo.findById(id).then( todo => {
                        expect(todo).toBe(todo);
                        done();
                    }).catch( err => done(err))
                })
        })
        it('should return 404 for non-object id', (done) => {
            request(app)
                .delete(`/todos/123abc`)
                .set('x-auth', users[0].tokens[0].token)
                .expect(404)
                .end(done)
        })
        it('should return 404 if todo not found', (done) => {
            const id = new ObjectID().toHexString();
            request(app)
                .delete(`/todos/${id}`)
                .set('x-auth', users[0].tokens[0].token)
                .expect(404)
                .end(done)
        })
    })
})