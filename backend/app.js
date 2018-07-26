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
    var obj;

    if(req.query && req.query.username && req.query.password) {
        controlDB.login(req.query.username, req.query.password, function(data) {
            obj = req.query;
            if(data[0] && data[0].role) {
                obj.role = data[0].role;
            } else {
                obj.role = '';
            }
            res.setHeader('Content-Type', 'application/json');
            res.send(obj);         
        });

    } else {
        obj = req.query;
        obj.role = '';
        res.setHeader('Content-Type', 'application/json');
        res.send(obj);
    }
})    


app.listen(8080, 'localhost')
