const Sequelize = require('sequelize');
const connection = require("../config")
const Farmer = require("./farmer")
const bcrypt = require('bcryptjs')

const Product = connection.define('products', {
    fID: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    milk: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    butter: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    cream: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    
},
{
    timestamps: true
})

connection.sync().then(function() {
    // Farmer.hasOne(Product)
    // Product.belongsTo(Farmer)
    console.log("Products Table Created!")
})
module.exports = Product