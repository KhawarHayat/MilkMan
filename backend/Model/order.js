const Sequelize = require('sequelize');
const connection = require("../config")
const Farmer = require('./farmer')

var Order = connection.define('orders',{

  product: {
    type: Sequelize.STRING,

        len: [1,50]
        
    
  },
  /*
  Email:{
        type: Sequelize.STRING,
        len: [5,50],
        allowNull: false,
        unique: true,

        validate: {
        isUnique: function (value, next) {
        var self = this;
        User.find({ where: { email: value } })
        .then(function (user) {
          // reject if a different user wants to use the same email
          if (user && self.id !== user.id) {
            return next('Email already in use!');
          }
          return next();
        })
        .catch(function (err) {
          return next(err);
        });
      }
    }
  },*/
  //password_hash: DataTypes.STRING
  
  price:{

    type: Sequelize.INTEGER,
    len: [1,6]
    
  },

  date:{

    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    allowNull: false


  },
  received:{
    type:Sequelize.BOOLEAN,
    allowNull: false
  },
  fID : {
    type:Sequelize.INTEGER,
    allowNull: false
  },
 cID : {
  type:Sequelize.INTEGER,
  allowNull: false
 },
  rID : {
 type : Sequelize.INTEGER,
 allowNull: false
  },
  rating:{
    type:Sequelize.FLOAT,
    len:[1,5]
  },

  review: {
    type:Sequelize.STRING,
    len:[8,500]
  }



},{
  timestamps: true
});

connection.sync().then(function(){
console.log("Order Table Created")

});



module.exports = Order