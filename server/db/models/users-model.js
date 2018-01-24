// user model
const _ = require('lodash');
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const keys = require('../../conf/keys');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email.'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true}
    }]
})

// instance methods
UserSchema.methods.toJSON = function() {
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
}

UserSchema.methods.generateAuthToken = function() {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, keys.jwtSecret).toString();
    
    user.tokens.push({ access, token });

    return user.save().then(() => {
        return token;
    });
}


// model methods
UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;

    try {
        decoded = jwt.verify(token, keys.jwtSecret)
    } catch (e) {
        return Promise.reject({error: 'Authentication required!'})
    }
    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    })
}

// middleware
UserSchema.pre('save', function(next) {
    var user = this;

    if (user.isModified('password')){
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            })
        })
    } else {
        next();
    }
})

const User = mongoose.model('User', UserSchema)

module.exports = User;