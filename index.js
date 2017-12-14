const mongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const dboper = require('./operations');

const url = 'mongodb://localhost:27017/confusion';

mongoClient.connect(url).then((db) => {

    console.log('connected correctly to the server');

    dboper.insertDocument(db, {"name": "Vadonut", "description": "test1"}, "dishes")
        .then((result) => {
            console.log("Insert Documents:\n", result.ops);
            return dboper.findDocuments(db, "dishes");
        })
        .then((docs) => {
            console.log("Found Documents:\n", docs);
            return dboper.updateDocument(db, {"name": "Vadonut"}, {"description": "Updated Test"}, "dishes");
        })
        .then((result) => {
            console.log("Updated document:\n", result.result);
            return dboper.findDocuments(db, "dishes");
        })
        .then((docs) => {
            console.log("Found Updated Documents:\n", docs);
            return db.dropCollection("dishes");
        })
        .then((result) => {
            console.log("Dropped collection");
            return db.close();
        })
        .catch((err) => {
            console.log(err);
        })
}, (err) => console.log(err))
    .catch((err) => console.log(err));