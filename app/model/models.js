var UserMeta = require('./Username.js'),
    connection = require('../connection.js')

var User = connection.define('users', UserMeta.attributes, UserMeta.options)

// you can define relationships here

module.exports.User = User