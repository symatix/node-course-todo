const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const app = require('../');
const { User } = require('../db');
const { users, populateUsers } = require('./seed');

describe('=> API - USERS', () => {

    // do a clean slate of the test DB
    beforeEach(populateUsers);
    
    describe('GET /users/me', () => {
        it('should return user if authenticated', (done) => {
            request(app)
                .get('/users/me')
                .set('x-auth', users[0].tokens[0].token)
                .expect(200)
                .expect((res) => {
                    expect(res.body._id).toBe(users[0]._id.toHexString());
                    expect(res.body.email).toBe(users[0].email);
                })
                .end(done);
        })
        it('should return 401 if not authenticated', (done) => {
            request(app)
                .get('/users/me')
                .expect(401)
                .expect((res) => {
                    expect(res.body.error).toBeTruthy();
                })
                .end(done);
        })
    })

    describe('POST /users', () => {
        it('should create new user', (done) => {
            var email ='generate@user.com';
            var password = 'test123';
    
            request(app)
                .post('/users')
                .send({email, password})
                .expect(200)
                .expect((res) => {
                    expect(res.headers['x-auth']).toBeTruthy();
                    expect(res.body._id).toBeTruthy();
                    expect(res.body.email).toBe(email);
                })
                .end((err) => {
                    if(err) {
                        return done(err);
                    }

                    User.findOne({ email }).then(user => {
                        expect(user).toBeTruthy();
                        expect(user.password).not.toBe(password);
                        expect(user.email).toBe(email);
                        done();
                    }).catch(err => done(err))
                });
        });
        it('should return validation errors if request is invalid', (done) => {
            request(app)
                .post('/users')
                .send({
                    email:"abc",
                    password:"123"
                })
                .expect(400)
                .expect((res) => {
                    expect(res.headers['x-auth']).toBeFalsy();
                    expect(res.body.errors).toBeTruthy();
                }).end(done)
        });
        it('should not create user if email in use', (done) => {
            request(app)
                .post('/users')
                .send(users[0])
                .expect(400)
                .expect((res) => {
                    expect(res.headers['x-auth']).toBeFalsy();
                }).end(done)
        });
    })
})