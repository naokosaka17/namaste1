var Sequelize = require('sequelize')
var sequelize = require("../sequelize.js")

var Quotes = sequelize.define("quotes", {
	quote: {
		type: Sequelize.STRING
	},
	author: {
		type: Sequelize.STRING
	},
	createdAt: {
		type: Sequelize.STRING
	},
	updatedAt: {
		type:Sequelize.STRING
	}

})

module.exports = Quotes;