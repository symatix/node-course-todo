var { User } = require('../db');

const authenticate = (req, res, next) => {
    var token = req.header('x-auth');

    User.findByToken(token).then(user => {
        if (!user){
            return Promise.reject({error: 'User not found!'})
        }

        req.user = user;
        req.token = token;
        next();
    }).catch(err => res.status(401).send(err));
}

module.exports = authenticate;