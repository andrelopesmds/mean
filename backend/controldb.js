var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var dbName = 'clinica';
var collectionName1 = 'users';
var collectionName2 = 'medicines';
var collectionName3 = 'patients';
var collectionName4 = 'meetings';
var collectionName5 = 'prescriptions';
var collectionName6 = 'examTypes';
var collectionName7 = 'exams';
var dbo;

exports.createdb = function() {
    MongoClient.connect(url, function(err, db) {
        if (err)
            throw err;

        console.log('Created/connected to clinica database');
        dbo = db.db(dbName);
        dbo.createCollection(collectionName1, function(err, res) {
            if (err)
                throw err;

            console.log('Created collection ' + collectionName1 + '!');
        });
        dbo.createCollection(collectionName2, function(err, res) {
            if (err)
                throw err;

            console.log('Created collection ' + collectionName2 + '!');
        });
        dbo.createCollection(collectionName3, function(err, res) {
            if (err)
                throw err;

            console.log('Created collection ' + collectionName3 + '!');
        });
        dbo.createCollection(collectionName4, function(err, res) {
            if (err)
                throw err;

            console.log('Created collection ' + collectionName4 + '!');
        });
    });
}

exports.login = function(cpf, password, callback) {

    dbo.collection(collectionName1).find({ cpf: cpf, password: password, active: true }).toArray(function(err, res) {
        if (err)
            throw err;

        callback(res);
    });
}

exports.getUsers = function(role, callback) {
    var filter;
    if (role) {
        filter = { active: true, role: role };
    } else {
        var filter = { active: true };
    }
    var proj = { projection: { _id: 0 }};

    dbo.collection(collectionName1).find(filter, proj).toArray(function(err, res) {
        if (err)
            throw err;

        callback(res);
    });
}

exports.insertUser = function(name, password, role, cpf, phone, callback) {
    dbo.collection(collectionName1).insertOne({ name: name, password: password, role: role, cpf: cpf, phone: phone, active: true}, function(err, res) {
        if(err)
            console.log("Erro ao tentar inserir usuário no banco. Cpf: " + cpf);

        callback(res);
    });
}

exports.updateUser = function(name, password, role, cpf, phone, callback) {
    var filter = { cpf: cpf };
    var obj = { $set: {
        name: name,
        password: password,
        role: role,
        phone: phone
    }};
    dbo.collection(collectionName1).updateOne(filter, obj, function(err, res){
        if(err)
            throw err;

        callback(res);
    });
}

exports.deleteUser = function(cpf, callback) {
    var filter = { cpf: cpf };
    var obj = { $set: { active: false }};
    dbo.collection(collectionName1).updateOne(filter, obj, function(err, res) {
        if(err)
            throw err;

        callback(res);
    });
}

exports.getMedicines = function(callback) {
    var filter = { active: true };
    var proj = { projection: { _id: 0 } };
    dbo.collection(collectionName2).find(filter, proj).toArray(function(err, res) {
        if(err)
            throw err;

        callback(res);
    })
}

exports.insertMedicine = function(genericName, factoryName, manufacturer, callback) {
    dbo.collection(collectionName2).insertOne({ genericName: genericName, factoryName: factoryName, manufacturer: manufacturer, active: true}, function(err, res) {
        if(err)
            console.log('Erro ao tentar inserir medicamento. genericName: ' + genericName);

        callback(res);
    });
}

exports.updateMedicine = function(genericName, factoryName, manufacturer, callback) {
    var filter = { factoryName: factoryName };
    var obj = { $set: {
        genericName: genericName,
        manufacturer: manufacturer
    }};
    dbo.collection(collectionName2).updateOne(filter, obj, function(err, res){
        if(err)
            throw err;

        callback(res);
    });
}

exports.deleteMedicine = function(factoryName, callback) {
    var filter = { factoryName: factoryName };
    var obj = { $set: { active: false }};

    dbo.collection(collectionName2).updateOne(filter, obj, function(err, res) {
        if(err)
            throw err;

        callback(res);
    });
}

exports.getPatientEmail = function(cpf, callback) {
    var filter = { active: true, cpf: cpf };
    var proj = { projection: { _id : 0 } };

    dbo.collection(collectionName3).find(filter, proj).toArray(function(err, res) {
        if (err)
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


exports.insertPatient = function(name, age, cpf, phone, email, callback) {
    dbo.collection(collectionName3).insertOne({
        name: name,
        age: age,
        cpf: cpf,
        phone: phone,
        email: email,
        active: true
    }, function(err, res) {
        if(err)
            console.log("Erro ao tentar inserir paciente no banco. Cpf: " + cpf);

        callback(res);
    });
}

exports.updatePatient = function(name, age, cpf, phone, email, callback) {
    var filter = { cpf: cpf };
    var obj = { $set: {
        name: name,
        age: age,
        phone: phone,
        email: email
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
            console.log("Erro ao tentar inserir agendamento. { doctorCpf: " + doctorCpf + ", date: " + date + ", hour: " + hour + " }");

        callback(res);
    });
}

exports.updateMeeting = function(doctorCpf, patientCpf, oldDate, newDate, oldHour, newHour, callback) {
    var filter = { 
        doctorCpf: doctorCpf,
        patientCpf: patientCpf,
        date: oldDate,
        hour: oldHour
    };
    var obj = { $set: {
        date: newDate,
        hour: newHour
    }};
    dbo.collection(collectionName4).updateOne(filter, obj, function(err, res){
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

exports.getPrescriptions = function(callback) {
    var proj = { projection: { _id : 0 } };
    dbo.collection(collectionName5).find({}, proj).toArray(function(err, res) {
        if (err)
            throw err;

        callback(res);
    });
}


exports.insertPrescription = function(doctorName, doctorCpf, date, patientName, patientCpf, factoryName, genericName,  callback) {
    dbo.collection(collectionName5).insertOne({
        doctorName: doctorName,
        doctorCpf: doctorCpf,
        date: date,
        patientName: patientName,
        patientCpf: patientCpf,
        factoryName: factoryName,
        genericName: genericName,
        active: true
    }, function(err, res) {
            if(err)
                console.log('Erro ao tentar inserir prescrição de medicamento.');

            callback(res);
        }
    );
}


exports.getExamTypes = function(callback) {
    var proj = { projection: { _id : 0 } };
    dbo.collection(collectionName6).find({}, proj).toArray(function(err, res) {
        if (err)
            throw err;

        callback(res);
    });
}


exports.getExams = function(callback) {
    var filter = { active: true };
    var proj = { projection: { _id : 0 } };
    dbo.collection(collectionName7).find(filter, proj).toArray(function(err, res) {
        if (err)
            throw err;

        callback(res);
    });
}


exports.insertExam = function(obj,  callback) {
    dbo.collection(collectionName7).insertOne({
        doctorName: obj.doctor.name,
        doctorCpf: obj.doctor.cpf,
        date: obj.date,
        patientName: obj.patient.name,
        patientCpf: obj.patient.cpf,
        examType: obj.examType,
        received: false,
        active: true
    }, function(err, res) {
            if(err)
                console.log('Erro ao tentar inserir exame.');

            callback(res);
        }
    );
}


exports.updateExam = function(obj, callback) {
    var filter = { 
        doctorCpf: obj.doctorCpf,
        patientCpf: obj.patientCpf,
        date: obj.date,
        examType: obj.examType,
        received: false
    };
    var obj = { $set: {
        received: true,
        result: obj.result
    }};
    dbo.collection(collectionName7).updateOne(filter, obj, function(err, res){
        if(err)
            throw err;

        callback(res);
    });
}

