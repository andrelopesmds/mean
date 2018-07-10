var express = require('express')
//var bodyParser = require('body-parser')
var app = express();

//app.use(bodyParser.urlencoded({extended : false}));
//app.use(bodyParser.json())

app.get('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
        'status' : 'success',
        'data' : 'welcome to node api'
    }));
next();
})

app.listen(8080, 'localhost')
