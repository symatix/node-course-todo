const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';

// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//         console.log(hash)
//     })
// })

var hashedPasword = '$2a$10$snB8JZwVHJzXuE2Ejf7R3ugbovF4cOUPKg6etw.CPCP83ReTNg7sy';

bcrypt.compare(password, hashedPasword,(err, res) => {
    console.log(res)
});

// var data = { id: 10 };

// var token = jwt.sign(data, '123abc');
// console.log(token);

// const decoded = jwt.verify(token, '123abc');

// console.log('decoded', decoded)

////////////////////////////////////////////////////////////////////////////
// var data = { id: 4 };

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };

// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// const flip = Math.random();

// if (flip > 0.5) {
//     token.data.id = 5
//     token.hash = SHA256(JSON.stringify(data)).toString()
//     console.log('=> flip triggered > data changed')
// } else {
//     console.log('=> flip not triggered')
// }


// if(resultHash === token.hash) {
//     console.log('User.');
// } else {
//     console.log('Hacker!')
// }