var express = require('express')
var bodyParser = require('body-parser')
var app = express();
var controlDB = require('./controldb.js');

controlDB.createdb();

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json())

app.get('/api/login', function(req, res) {
    var obj = req.query;

    if(obj && obj.cpf && obj.password) {
        controlDB.login(obj.cpf, obj.password, function(data) {
            if(data[0] && data[0].role) {
                obj.role = data[0].role;
            } else {
                obj.role = '';
            }
            res.setHeader('Content-Type', 'application/json');
            res.send(obj);         
        });

    } else {
        obj.role = '';
        res.setHeader('Content-Type', 'application/json');
        res.send(obj);
    }
})    


app.get('/api/users', function(req, res) {
    var obj;
    var role;
    if(req.query && req.query && req.query.role) {
        role = req.query.role
    }
    controlDB.getUsers(role, function(data) {
       obj = data;
       res.setHeader('Content-Type', 'application/json');
       res.send(obj);
    });
})

app.post('/api/users', function(req, res) {
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

app.put('/api/users', function(req, res) {
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

app.delete('/api/users', function(req, res) {
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


app.listen(8080, 'localhost')
