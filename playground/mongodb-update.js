const { MongoClient, ObjectID } = require('mongodb');

var user = { name: 'Dino' , age: 33 };
var { name } = user;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server: ', err);
    }
    console.log('Connected to MongoDB server.\n--------');
    
    const db = client.db('TodoApp');

    // db.collection('Todos').findOneAndUpdate({
    //         _id: new ObjectID("5a65caf8121fc6314891f2c8")
    //     },{
    //         $set: { completed: true }
    //     },{
    //         returnOriginal: false
    //     })
    //     .then(res => console.log(res))

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID("5a65faa6827539f04ad7e1d0")
    },{
        $set: { name: 'Dino' },
        $inc: { age: 1 }
    },{
        returnOriginal: false
    }).then( res => console.log(res));

    client.close();
})