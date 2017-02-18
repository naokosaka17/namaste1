var Sequelize = require('sequelize')
var sequelize = require("../sequelize.js")

var Journal = sequelize.define("userthoughts", {
	id: {
    // capital "S"!! bcz it is create table use by npm sequelize
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
	},
	userthought: {
	type: Sequelize.STRING
	}
});

Journal.sync();


module.exports = Journal;