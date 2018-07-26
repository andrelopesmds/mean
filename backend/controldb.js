var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var dbName = "clinica";
var collectionName1 = "users";
var collectionName2 = "medicos";
var dbo;

exports.createdb = function() {
    MongoClient.connect(url, function(err, db) {
        if (err)
            throw err;

        console.log("Created clinica db");
        dbo = db.db(dbName);
        dbo.createCollection(collectionName1, function(err, res) {
            if (err)
                throw err;

            console.log("Created collection Users!");
        });
        dbo.createCollection(collectionName2, function(err, res) {
            if (err)
                throw err;

            console.log("Created collection Medicos");
        });
    });
}

exports.login = function(username, password, callback) {

    dbo.collection(collectionName1).find({ username: username, password: password }).toArray(function(err, res) {
        if (err)
            throw err;

        callback(res);
    });
}
