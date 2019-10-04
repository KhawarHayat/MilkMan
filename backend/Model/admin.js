const Sequelize = require('sequelize');
const connection = require("../config")
const bcrypt = require('bcryptjs')
var Admin = connection.define('admin', {

	name: {
		type: Sequelize.TEXT,

		len: [2, 50],
		allowNull: false

	},
	email: {
		type: Sequelize.STRING,
		len: [5, 50],
		allowNull: false,
		unique: true,
	},
	//password_hash: DataTypes.STRING

	password: {

		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}


	},
	

}, {
		timestamps: true
	});

connection.sync().then(function () {
	// Customer.hasMany(Order)
	// Order.belongsTo(Customer)
console.log("Admin Table Created!")
})

Admin.encryptPassword = (password, callback) => {
    bcrypt.genSalt(10, function(err, admin) {
        bcrypt.hash(password, admin, function(err, hash) {
            callback(err, hash)
        });
    });
}

Admin.comparePassword = (password, hash, callback) => {
    bcrypt.compare(password, hash, function(err, res) {
        if(err){
            console.log(err)
        }
        else{
            callback(null, res)
        }
    });
}

Admin.timestamp = (strDate) => {
	var datum = Date.parse(strDate);
	return datum/1000;
	   }


module.exports = Admin