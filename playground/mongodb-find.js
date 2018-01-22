const { MongoClient, ObjectID } = require('mongodb');

var user = { name: 'Dino' , age: 33 };
var { name } = user;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server: ', err);
    }
    console.log('Connected to MongoDB server.\n--------');
    
    const db = client.db('TodoApp');

    // db.collection('Todos')
    //     .find({_id:ObjectID("5a65d119827539f04ad7d498")})
    //     .toArray()
    //     .then( docs => {
    //             console.log('Todos');
    //             console.log(JSON.stringify(docs, undefined, 3));
    //         }, err => console.log('Unable to fetch documents: ', err)
    //     )

    // db.collection('Todos')
    //     .find({_id:ObjectID("5a65d119827539f04ad7d498")})
    //     .count()
    //     .then( count => console.log(`Todos count: ${count}`)
    //         , err => console.log(`Unable to count todos`)
    //     );

    db.collection('Users')
        .find({name: 'Dino'})
        .toArray()
        .then( docs => console.log(`Found ${docs.length} documents matching your query\n`, JSON.stringify(docs, undefined, 3))
            , err => console.log(`Unable to find documents: ${err}`)
        );


    client.close();
})