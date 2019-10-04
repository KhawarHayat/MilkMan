const Sequelize = require('sequelize');
const connection = require("../config")
const Order = require('./order')
const Farmer = require('./farmer')

var Rider = connection.define('riders', {


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
    validate: {
      notEmpty: true
    }


  },

  phoneNo: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  //password_hash: DataTypes.STRING

  deliveredOrders: {

    type: Sequelize.INTEGER,
    len: [1, 6]

  },
  fID: {
type: Sequelize.UUID,
allowNull: false
  },

  rating: {

    type: Sequelize.FLOAT,
    len: [1, 5],
    defaultValue : 0 
   
  },

  available: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue : true 
  },
  cnic: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  longitude: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '0.00'
  },
  latitude:{
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '0.00'
  }





}, {
    timestamps: true
  });

connection.sync().then(function () {
  // Rider.hasMany(Order)
  // Order.belongsTo(Rider)
  // Farmer.hasMany(Rider)
  // Rider.belongsTo(Farmer)
  console.log("Rider Table created");
});


module.exports = Rider

