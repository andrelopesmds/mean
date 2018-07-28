var express = require('express')
var bodyParser = require('body-parser')
var app = express();
var controlDB = require('./controldb.js');

controlDB.createdb();

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json())

app.get('/api' , function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send("hello world from api");
})

app.get('/api/login', function(req, res) {
    var obj = req.query;

    if(obj && obj.username && obj.password) {
        controlDB.login(obj.username, obj.password, function(data) {
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

    controlDB.getUsers(function(data) {
       obj = data;
       res.setHeader('Content-Type', 'application/json');
       res.send(obj);
    });
})

app.post('/api/users', function(req, res) {
    var response;
    var obj = req.body;

    if(obj.username && obj.password && obj.role && obj.cpf && obj.phone) {
        controlDB.insertUser(obj.username, obj.password, obj.role, obj.cpf, obj.phone, function(data) {
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
