const Sequelize = require('sequelize');
const connection = require("../config")
const Order = require('./order')
const bcrypt = require('bcryptjs')

const Farmer = connection.define('farmers', {
    image: {
        type: Sequelize.STRING,
        len: [5,500],
        unique: true,
        allowNull: false
    },
    name: {
        type: Sequelize.TEXT,

        len: [5, 50],
        allowNull: false

    },
    email: {
        type: Sequelize.STRING,
        len: [5, 50],
        allowNull: false,
        unique: true,

    },
    password: {

        type: Sequelize.STRING,
        allowNull: false,

    },
    serveorders: {
        type: Sequelize.INTEGER,
        len: [1, 10],
        defaultValue: 0
    },


    phoneno: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        
    },

    rating: {

        type: Sequelize.FLOAT,
        len: [1, 5],
        defaultValue: 0

    },
    revenue: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    cnic: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false,
        
    }



}, {
        timestamps: true
    });

connection.sync().then(function () {
    // Farmer.hasMany(Order)
    // Order.belongsTo(Farmer)
    console.log("Table created");
}).then(function (err) {
    if (err) console.log(err);
});
Farmer.encryptPassword = (password, callback) => {
    bcrypt.genSalt(10, function(err, doodhwala) {
        bcrypt.hash(password, doodhwala, function(err, hash) {
            callback(err, hash)
        });
    });
}

Farmer.comparePassword = (password, hash, callback) => {
    bcrypt.compare(password, hash, function(err, res) {
        if(err){
            console.log(err)
        }
        else{
            callback(null, res)
        }
    });
}
module.exports = Farmer;

