var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var dbName = "clinica";
var collectionName1 = "users";
var collectionName2 = "medicos";
var collectionName3 = "patients";
var collectionName4 = "meetings";
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

            console.log("Created collection " + collectionName1 + "!");
        });
        dbo.createCollection(collectionName2, function(err, res) {
            if (err)
                throw err;

            console.log("Created collection " + collectionName2 + "!");
        });
        dbo.createCollection(collectionName3, function(err, res) {
            if (err)
                throw err;

            console.log("Created collection " + collectionName3 + "!");
        });
        dbo.createCollection(collectionName4, function(err, res) {
            if (err)
                throw err;

            console.log("Created collection " + collectionName4 + "!");
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

exports.getUsers = function(role, callback) {
    var filter = { active: true };
    if(role) {
        filter.role = role;
    }
    var proj = { projection: { _id: 0 }};
    dbo.collection(collectionName1).find(filter, proj).toArray(function(err, res) {
        if (err)
            throw err;

        callback(res);
    });
}

exports.insertUser = function(username, name, password, role, cpf, phone, callback) {
    dbo.collection(collectionName1).insertOne({ username: username, name: name, password: password, role: role, cpf: cpf, phone: phone, active: true}, function(err, res) {
        if(err)
            throw err;

        callback(res);
    });
}

exports.updateUser = function(username, name, password, role, cpf, phone, callback) {
    var filter = { username: username };
    var obj = { $set: {
        name: name,
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

exports.getPatients = function(callback) {
    var filter = { active: true };
    var proj = { projection: { _id : 0 } };
    dbo.collection(collectionName3).find(filter, proj).toArray(function(err, res) {
        if (err)
            throw err;

        callback(res);
    });
}


exports.insertPatient = function(name, age, cpf, phone, callback) {
    dbo.collection(collectionName3).insertOne({ name: name, age: age, cpf: cpf, phone: phone, active: true}, function(err, res) {
        if(err)
            throw err;

        callback(res);
    });
}

exports.updatePatient = function(name, age, cpf, phone, callback) {
    var filter = { cpf: cpf };
    var obj = { $set: {
        name: name,
        age: age,
        phone: phone
    }};
    dbo.collection(collectionName3).updateOne(filter, obj, function(err, res){
        if(err)
            throw err;

        callback(res);
    });
}

exports.deletePatient = function(cpf, callback) {
    var filter = { cpf: cpf };
    var obj = { $set: { active: false }};
    dbo.collection(collectionName3).updateOne(filter, obj, function(err, res) {
        if(err)
            throw err;

        callback(res);
    });
}

exports.getMeetings = function(callback) {
    var filter = { active: true };
    var proj = { projection: { _id : 0 } };
    dbo.collection(collectionName4).find(filter, proj).toArray(function(err, res) {
        if (err)
            throw err;

        callback(res);
    });
}

exports.insertMeeting = function(doctorName, doctorCpf, patientName, patientCpf, date, hour, callback) {
    dbo.collection(collectionName4).insertOne({ doctorName: doctorName, doctorCpf: doctorCpf, patientName: patientName, patientCpf: patientCpf, date: date, hour: hour, active: true}, function(err, res) {
        if(err)
            throw err;

        callback(res);
    });
}


exports.deleteMeeting = function(doctorCpf, patientCpf, date, hour, callback) {
    var filter = { doctorCpf: doctorCpf, patientCpf: patientCpf, date: date, hour: hour };
    var obj = { $set: { active: false }};
    dbo.collection(collectionName4).updateOne(filter, obj, function(err, res) {
        if(err)
            throw err;

        callback(res);
    });
}
