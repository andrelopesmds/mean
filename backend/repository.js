var repository = {};
var dataaccess = require('./dataaccess.js');

repository.getRole = function() {
    var r = dataaccess.getRole();
    return r;
}

module.exports = repository;
