var Sequelize = require('sequelize')
var sequelize = require("../sequelize.js")
var Users = sequelize.define("users",{
    firstname: {
        type: Sequelize.STRING
    },
    lastname: {
        type: Sequelize.STRING
    },
    emailaddress: {
        type: Sequelize.STRING,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            is: /^[a-z0-9\_\-]+$/i,
        }
    },
    password: {
        type: Sequelize.STRING,
    },
    password2: {
        type: Sequelize.STRING,
    },
    salt: {
        type: Sequelize.STRING
    }
})

// var options = {
//   freezeTableName: true
// }

module.exports = Users;
// module.exports.options = options;