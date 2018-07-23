var business = {};
var repository = require('./repository.js');

business.login = function() {
    var r =  repository.getRole();
    return r;
}

module.exports = business;
