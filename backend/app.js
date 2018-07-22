var express = require('express')
var bodyParser = require('body-parser')
var app = express();

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json())

app.get('/', function(req, res) {
    console.log(req);
    res.setHeader('Content-Type', 'application/json');
    res.send({
        'status' : 'success',
        'data' : 'welcome to node api root'
    });
})

app.get('/api' , function(req, res) {
    console.log(req.body);
    res.setHeader('Content-Type', 'application/json');
    res.send({
        'status' : 'success',
        'data' : 'welcome to node api'
    });
})

app.listen(8080, 'localhost')
