var express = require('express')
var bodyParser = require('body-parser')
var app = express();
var controlDB = require('./controldb.js');
var jwt = require('jsonwebtoken');

controlDB.createdb();

app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());

app.get('/api/login', function(req, res) {
    var obj = {};

    if(req.query && req.query.cpf && req.query.password) {
        controlDB.login(req.query.cpf, req.query.password, function(data) {
            if(data[0] && data[0].role && data[0].name && data[0].cpf) {
                obj.role = data[0].role;
                obj.name = data[0].name;
                obj.cpf = data[0].cpf;

                var token = jwt.sign({ role: obj.role }, 'secretKey', { expiresIn: 86400 });
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send({ auth: true, token: token, data: obj });

            } else {
                res.setHeader('Content-Type', 'application/json');
                res.status(400).send({ auth: false, message: 'Usuário não encontrado.' });
            }
        });
    } else {
        res.setHeader('Content-Type', 'application/json');
        res.status(400).send({ auth: false, message: 'Parâmetros inválidos' });
    }
})

app.all('/api/users', verifyJwt, (req, res, next) => {
    next();
})

app.get('/api/users', (req, res) => {

    controlDB.getUsers(function(data) {
        if (data)
            res.status(200).send(data);

        else 
            res.status(400).send({ message: 'Nenhum usuário encontrado.' });
    });
})

app.post('/api/users', (req, res) => {
    var response;
    var obj = req.body;

    if(obj.name && obj.password && obj.role && obj.cpf && obj.phone) {
        controlDB.insertUser(obj.name, obj.password, obj.role, obj.cpf, obj.phone, function(data) {
            if(data && data.result && data.result.ok == 1) {
                response = true;
            } else {
                response = false;
            }
            res.setHeader('Content-Type', 'application/json');
            res.send({'status': response});
        });
    } else {
        response = false;
        res.setHeader('Content-Type', 'application/json');
        res.send({'status': response});
    }
})

app.put('/api/users', (req, res) => {
    var response;
    var obj = req.body;

    if(obj.name, obj.password, obj.role, obj.cpf, obj.phone) {
        controlDB.updateUser(obj.name, obj.password, obj.role, obj.cpf, obj.phone, function(data) {
            if(data && data.result && data.result.ok == 1) {
                response = true;
            } else {
                response = false;
            }
            res.setHeader('Content-Type', 'application/json');
            res.send({'status': response});
        });
    } else {
        response = false;
        res.setHeader('Content-Type', 'application/json');
        res.send({'status': response});
    }
})

app.delete('/api/users', (req, res) => {
    var response;
    var obj = req.query;

    if(obj && obj.cpf) {
        controlDB.deleteUser(obj.cpf, function(data) {
            if(data && data.result && data.result.ok == 1) {
                response = true;
            } else {
                response = false;
            }
            res.setHeader('Content-Type', 'application/json');
            res.send({'status': response});
        });
    } else {
        response = false;
        res.setHeader('Content-Type', 'application/json');
        res.send({'status': response});
    } 
})

app.all('/api/medicines', verifyJwt, (req, res, next) => {
    next();
})


app.get('/api/medicines', function(req, res) {
    var obj;

    controlDB.getMedicines(function(data) {
       obj = data;
       res.setHeader('Content-Type', 'application/json');
       res.send(obj);
    });
})

app.post('/api/medicines', function (req, res) {
    var response;
    var obj = req.body;

    if(obj.genericName && obj.factoryName && obj.manufacturer) {
        controlDB.insertMedicine(obj.genericName, obj.factoryName, obj.manufacturer, function(data) {
            if(data && data.result && data.result.ok == 1) {
                response = true;
            } else {
                response = false;
            }
            res.setHeader('Content-Type', 'application/json');
            res.send({'status': response});
        });
    } else {
        response = false;
        res.setHeader('Content-Type', 'application/json');
        res.send({'status': response});
    }
})


app.put('/api/medicines', function(req, res) {
    var response;
    var obj = req.body;

    if(obj.genericName, obj.factoryName, obj.manufacturer) {
        controlDB.updateMedicine(obj.genericName, obj.factoryName, obj.manufacturer, function(data) {
            if(data && data.result && data.result.ok == 1) {
                response = true;
            } else {
                response = false;
            }
            res.setHeader('Content-Type', 'application/json');
            res.send({'status': response});
        });
    } else {
        response = false;
        res.setHeader('Content-Type', 'application/json');
        res.send({'status': response});
    }
})

app.delete('/api/medicines', function(req, res) {
    var response;
    var obj = req.query;

    if(obj && obj.factoryName) {
        controlDB.deleteMedicine(obj.factoryName, function(data) {
            if(data && data.result && data.result.ok == 1) {
                response = true;
            } else {
                response = false;
            }
            res.setHeader('Content-Type', 'application/json');
            res.send({'status': response});
        });
    } else {
        response = false;
        res.setHeader('Content-Type', 'application/json');
        res.send({'status': response});
    } 
})

app.get('/api/patients', function(req, res) {
    var obj;

    controlDB.getPatients(function(data) {
       obj = data;
       res.setHeader('Content-Type', 'application/json');
       res.send(obj);
    });
})


app.post('/api/patients', function(req, res) {
    var response;
    var obj = req.body;

    if(obj.name && obj.age && obj.cpf && obj.phone) {
        controlDB.insertPatient(obj.name, obj.age, obj.cpf, obj.phone, function(data) {
            if(data && data.result && data.result.ok == 1) {
                response = true;
            } else {
                response = false;
            }
            res.setHeader('Content-Type', 'application/json');
            res.send({'status': response});
        });
    } else {
        response = false;
        res.setHeader('Content-Type', 'application/json');
        res.send({'status': response});
    }
})

app.put('/api/patients', function(req, res) {
    var response;
    var obj = req.body;

    if(obj.name, obj.age, obj.cpf, obj.phone) {
        controlDB.updatePatient(obj.name, obj.age, obj.cpf, obj.phone, function(data) {
            if(data && data.result && data.result.ok == 1) {
                response = true;
            } else {
                response = false;
            }
            res.setHeader('Content-Type', 'application/json');
            res.send({'status': response});
        });
    } else {
        response = false;
        res.setHeader('Content-Type', 'application/json');
        res.send({'status': response});
    }
})

app.delete('/api/patients', function(req, res) {
    var response;
    var obj = req.query;

    if(obj && obj.cpf) {
        controlDB.deletePatient(obj.cpf, function(data) {
            if(data && data.result && data.result.ok == 1) {
                response = true;
            } else {
                response = false;
            }
            res.setHeader('Content-Type', 'application/json');
            res.send({'status': response});
        });
    } else {
        response = false;
        res.setHeader('Content-Type', 'application/json');
        res.send({'status': response});
    } 
})

app.get('/api/meetings', function(req, res) {
    var obj;

    controlDB.getMeetings(function(data) {
       obj = data;
       res.setHeader('Content-Type', 'application/json');
       res.send(obj);
    });
})



app.post('/api/meetings', function(req, res) {
    var response;
    var obj = req.body;
    if(obj.doctor && obj.doctor.name && obj.doctor.cpf && obj.patient && obj.patient.name && obj.patient.cpf && obj.date && obj.hour) {
        controlDB.insertMeeting(obj.doctor.name, obj.doctor.cpf, obj.patient.name, obj.patient.cpf, obj.date, obj.hour, function(data) {
            if(data && data.result && data.result.ok == 1) {
                response = true;
            } else {
                response = false;
            }
            res.setHeader('Content-Type', 'application/json');
            res.send({'status': response});
        });
    } else {
        response = false;
        res.setHeader('Content-Type', 'application/json');
        res.send({'status': response});
    }
})


app.put('/api/meetings', function(req, res) {
    var response;
    var obj = req.body;

    if(obj.doctor, obj.doctor.cpf, obj.patient, obj.patient.cpf, obj.oldDate, obj.newDate, obj.oldHour, obj.newHour) {
        controlDB.updateMeeting(obj.doctor.cpf, obj.patient.cpf, obj.oldDate, obj.newDate, obj.oldHour, obj.newHour, function(data) {
            if(data && data.result && data.result.ok == 1) {
                response = true;
            } else {
                response = false;
            }
            res.setHeader('Content-Type', 'application/json');
            res.send({'status': response});
        });
    } else {
        response = false;
        res.setHeader('Content-Type', 'application/json');
        res.send({'status': response});
    }
})


app.delete('/api/meetings', function(req, res) {
    var response;
    var obj = req.query;

    if(obj && obj.doctorCpf && obj.patientCpf && obj.date && obj.hour) {
        controlDB.deleteMeeting(obj.doctorCpf, obj.patientCpf, obj.date, obj.hour, function(data) {
            if(data && data.result && data.result.ok == 1) {
                response = true;
            } else {
                response = false;
            }
            res.setHeader('Content-Type', 'application/json');
            res.send({'status': response});
        });
    } else {
        response = false;
        res.setHeader('Content-Type', 'application/json');
        res.send({'status': response});
    } 
})

app.get('/api/prescriptions', function(req, res) {
    var obj;

    controlDB.getPrescriptions(function(data) {
       obj = data;
       res.setHeader('Content-Type', 'application/json');
       res.send(obj);
    });
})

app.post('/api/prescriptions', function(req, res) {
    var response;
    var obj = req.body;

    if(obj.doctor && obj.doctor.name && obj.doctor.cpf && obj.date && obj.patient && obj.patient.name && obj.patient.cpf && obj.medicine && obj.medicine.factoryName && obj.medicine.genericName) {
        controlDB.insertPrescription(obj.doctor.name, obj.doctor.cpf, obj.date, obj.patient.name, obj.patient.cpf, obj.medicine.factoryName, obj.medicine.genericName, function(data) {
            if(data && data.result && data.result.ok == 1) {
                response = true;
            } else {
                response = false;
            }
            res.setHeader('Content-Type', 'application/json');
            res.send({'status': response});
        });
    } else {
        response = false;
        res.setHeader('Content-Type', 'application/json');
        res.send({'status': response});
    }
})

app.get('/api/examTypes', function(req, res) {
    var obj;

    controlDB.getExamTypes(function(data) {
       obj = data;
       res.setHeader('Content-Type', 'application/json');
       res.send(obj);
    });
})

app.get('/api/exams', function(req, res) {
    var obj;

    controlDB.getExams(function(data) {
       obj = data;
       res.setHeader('Content-Type', 'application/json');
       res.send(obj);
    });
})

app.post('/api/exams', function(req, res) {
    var response;
    var obj = req.body;
    if(obj.doctor && obj.doctor.cpf && obj.patient && obj.patient.cpf && obj.date && obj.examType) {
        controlDB.insertExam(obj, function(data) {
            if(data && data.result && data.result.ok == 1) {
                response = true;
            } else {
                response = false;
            }
            res.setHeader('Content-Type', 'application/json');
            res.send({'status': response});
        });
    } else {
        response = false;
        res.setHeader('Content-Type', 'application/json');
        res.send({'status': response});
    }
})


app.put('/api/exams', function(req, res) {
    var response;
    var obj = req.body;

    if(obj.doctorCpf && obj.patientCpf, obj.examType, obj.result) {
        controlDB.updateExam(obj, function(data) {
            if(data && data.result && data.result.ok == 1) {
                response = true;
            } else {
                response = false;
            }
            res.setHeader('Content-Type', 'application/json');
            res.send({'status': response});
        });
    } else {
        response = false;
        res.setHeader('Content-Type', 'application/json');
        res.send({'status': response});
    }
})


function verifyJwt(req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token)
        res.status(400).send({ auth: false, message: 'Token não encontrado' });

    else { 
        jwt.verify(token, 'secretKey', function(err, decoded) {
            if (err)
                res.status(400).send({ auth: false, message: 'Token expirado' });

            req.role = decoded.role;
            next();
        });
    }
}


app.listen(8080, 'localhost')
