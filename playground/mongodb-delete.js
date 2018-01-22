const { MongoClient, ObjectID } = require('mongodb');

var user = { name: 'Dino' , age: 33 };
var { name } = user;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server: ', err);
    }
    console.log('Connected to MongoDB server.\n--------');
    
    const db = client.db('TodoApp');

    // deleteMany
    // db.collection('Todos').deleteMany({text:"Eat lunch"})
    //    .then( res => console.log(res));


    // deleteOne
    //db.collection('Todos').deleteOne({text: "Eat lunch"})
    //    .then(res => console.log(res.result));
    
    // findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed: false})
    //     .then(res => console.log(res))
     db.collection('Users')
        .deleteMany({name:"Dino"}).then( res => console.log(res.result));

    db.collection('Users')
        .findOneAndDelete(ObjectID("5a65cf3464dbb0410cc257a3")).then(res => console.log(res));


    // client.close();
})