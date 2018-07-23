var express = require('express')
var bodyParser = require('body-parser')
var app = express();
var business = require('./business.js');

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json())

app.get('/api' , function(req, res) {
    var json = req.query;

    if(req.query && req.query.route == 'login') {
        var r = business.login();
        json.role = r;
    }
    else {
        json.role = '';
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(json);
})

app.listen(8080, 'localhost')
