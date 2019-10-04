const express = require('express')
const multer = require('multer')
const path = require('path')
const Farmer = require('../Model/farmer')
const Order = require('../Model/order')
const Rider = require('../Model/rider')
const Customer = require('../Model/customer')
const Product =require('../Model/products')

const { check, validationResult } = require('express-validator/check');



module.exports = function(io){
    let customer = {}
    customer.signup = (req, res) => {
        const errors = validationResult(req);
    
      if (!errors.isEmpty()) {
        
        console.log(errors.array())
        res.json(errors.array())
      }
      else{
        Customer.encryptPassword(req.body.password, (err, hash) => {
            if(err) {throw err}
            else{
           let password = hash;
           const app = Customer.build({
            name : req.body.name,
            email : req.body.email,
            password : password,
            longitude : req.body.longitude,
            latitude : req.body.latitude
        })
        app.save().then(() => {
         res.json('ok')
        })
            }
        })
      }
    }
    
    customer.login = (req, res) => {
    Customer.findOne({
        where: {email: req.body.username}
    }).then((pro) => {
        if(pro == null){
            res.json('Incorrect UserName')
        }
        else {
            console.log(pro.dataValues.password)
            Customer.comparePassword(req.body.password, pro.dataValues.password, function (err, aa) {
                   console.log(aa)
                   if(aa == true){
                       res.json(pro.dataValues)
                   }
                   else{
    res.json('Password Incorrect')
                   }
               
            })
            
        }
    
    })
    }
    
    customer.homelocation = (req, res) => {
        console.log('Khawar')
      Customer.findOne({
          where: {id : req.params.id}
      }).then((pro) => {
          console.log(pro.dataValues)
          res.json(pro.dataValues)
      })
    }
    
    customer.order = (req,res) => {
    io.emit('order',{
        cname: 'Khawar Hayat',
        milk: req.body.milk,
        butter: req.body.butter,
        cream : req.body.cream,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        farmerid: req.body.fid,
        cid: req.body.id   
    })
    
    res.json('ok')
    }
    customer.riderlogin = (req,res) => {
        Rider.findOne({
            where: {email: req.body.username}
        }).then((pro) => {
            if(pro == null){
                res.json('Incorrect UserName')
            }
            else {
                console.log(pro.dataValues.password)
                Farmer.comparePassword(req.body.password, pro.dataValues.password, function (err, aa) {
                       console.log(aa)
                       if(aa == true){
                           res.json(pro.dataValues)
                       }
                       else{
        res.json('Password Incorrect')
                       }
                   
                })
                
            }
        
        })  
    }
    return customer
}