const Sequelize = require('sequelize');
const connection = require("../config")
const Order = require('./order')
const bcrypt = require('bcryptjs')



var Customer = connection.define('customers', {




	//title: Sequelize.STRING,   OR

	//body: Sequelize.TEXT OR
	name: {
		type: Sequelize.TEXT,

		len: [2, 50],
		allowNull: false

	},
	email: {
		type: Sequelize.STRING,
		len: [5, 50],
		allowNull: false,
		
	},
	//password_hash: DataTypes.STRING

	password: {

		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}


	},
	longitude: {

		type: Sequelize.STRING,
		allowNull: false


	},
	latitude: {
		type: Sequelize.STRING,
		allowNull: false
	},
	noOfOrders: {
		type: Sequelize.INTEGER
	},
	bill: {

		type: Sequelize.INTEGER



	}

}, {
		timestamps: true
	});

connection.sync().then(function () {
	// Customer.hasMany(Order)
	// Order.belongsTo(Customer)
console.log("Customer Table Created!")
})

Customer.encryptPassword = (password, callback) => {
    bcrypt.genSalt(10, function(err, doodhwala) {
        bcrypt.hash(password, doodhwala, function(err, hash) {
            callback(err, hash)
        });
    });
}

Customer.comparePassword = (password, hash, callback) => {
    bcrypt.compare(password, hash, function(err, res) {
        if(err){
            console.log(err)
        }
        else{
            callback(null, res)
        }
    });
}

module.exports = Customer