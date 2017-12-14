const mongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/confusion';

mongoClient.connect(url, (err, db) => {
    assert.equal(err, null);

    console.log('connected correctly to the server');

    const collection = db.collection("dishes");

    collection.insertOne({ "name" : "Uthappiza", "description" : "test"}, (err, result) => {
        assert.equal(err, null);

        console.log("After Insert: \n")
        console.log(result.ops);

        collection.find({}).toArray((err, docs) => {
            assert.equal(err, null);

            console.log("Found:\n")

            console.log(docs);


            db.dropCollection("dishes", (err, rsult) => {
                assert.equal(err, null);

                db.close();
                console.log();
            });
        })
    });
});