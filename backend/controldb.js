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

        console.log("Created/connected to clinica database");
        dbo = db.db(dbName);
        dbo.createCollection(collectionName1, function(err, res) {
            if (err)
                throw err;

            console.log("Created collection Users!");
        });
        dbo.createCollection(collectionName2, function(err, res) {
            if (err)
                throw err;

            console.log("Created collection Medicos!");
        });
    });
}

exports.login = function(username, password, callback) {

    dbo.collection(collectionName1).find({ username: username, password: password, active: true }).toArray(function(err, res) {
        if (err)
            throw err;

        callback(res);
    });
}

exports.getUsers = function(callback) {
    var filter = { active: true };
    dbo.collection(collectionName1).find(filter).toArray(function(err, res) {
        if (err)
            throw err;

    callback(res);
    });
}

exports.insertUser = function(username, password, role, cpf, phone, callback) {
    dbo.collection(collectionName1).insertOne({ username: username, password: password, role: role, cpf: cpf, phone: phone, active: true}, function(err, res) {
        if(err)
            throw err;

        callback(res);
    });
}

exports.updateUser = function(username, password, role, cpf, phone, callback) {
    var filter = { username: username };
    var obj = { $set: {
        password: password,
        role: role,
        cpf: cpf,
        phone: phone
    }};
    dbo.collection(collectionName1).updateOne(filter, obj, function(err, res){
        if(err)
            throw err;

        callback(res);
    });
}

exports.deleteUser = function(username, callback) {
    var filter = { username: username };
    var obj = { $set: { active: false }};
    dbo.collection(collectionName1).updateOne(filter, obj, function(err, res) {
        if(err)
            throw err;

        callback(res);
    });
}
