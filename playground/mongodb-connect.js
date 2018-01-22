const { MongoClient, ObjectID } = require('mongodb');

var obj = new ObjectID();

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server.');
    }
    console.log('Connected to MongoDB server.');
    
    const db = client.db('TodoApp');

    // db.collection('Todos').insert({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, res) => {
    //     if (err) {
    //         return console.log('Unable to insert document: ', err)
    //     }
    //     console.log(JSON.stringify(res.ops, undefined, 3))
    // })

    db.collection('Users').insertOne({
        name: 'Dino',
        age: 35,
        location: 'Moon'
    }, (err, res) => {
        if (err) {
            return console.log('Unable to add user: ', err);
        }
        console.log(res.ops[0]._id.getTimestamp())
    })

    client.close();
})