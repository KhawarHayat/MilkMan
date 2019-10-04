const express = require('express')
const multer = require('multer')
const path = require('path')
const Farmer = require('../Model/farmer')
const Order = require('../Model/order')
const Rider = require('../Model/rider')
const Customer = require('../Model/customer')
const Product =require('../Model/products')

const { check, validationResult } = require('express-validator/check');
const LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');

const storage = multer.diskStorage({
    destination: './public/Images/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
  storage : storage
}).single('image')


exports.form = (req, res) => {
    //If error 
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    
    console.log(errors.array())
    res.json(errors.array())
  }
  else{
      
    Farmer.encryptPassword(req.body.password, (err, hash) => {
        if(err) {throw err}
        else{
       let password = hash;
       const app = Farmer.build({
        image : req.body.image,
        name : req.body.name,
        email : req.body.email,
        password : password,
        city : req.body.city,
        cnic: req.body.cnic,
        phoneno: req.body.phoneno
    })
    app.save().then(() => {
     res.send('ok')
    })
        }
    })
    
  }
   
}

exports.uploaded = (req,res) => {
    upload(req, res, (err) => {
        if(err){throw err}
        else{
            console.log(req.file)
            res.json(req.file.filename)
              
        }
    })
}

exports.login = (req, res) => {
    Farmer.findOne({where :{email : req.body.username}})
    .then((user) => {
         res.json(user.dataValues.id)
           
    })
    
}

exports.loginfail = (req, res) => {
    res.json('fail')
}



exports.main = (req, res) => {
  console.log(req.params.id)
//   const riders ;
  Rider.findAll({
      where: {
          fID : req.params.id
      }
  })
  .then((pro) => {
      
    
      res.json(pro)
  })
 
}


exports.logout = (req, res) => {
    
    req.logout()
    res.json(true)
}

exports.fail = (req, res) => {
    res.json('fail')
}

exports.addrider = (req, res) => {

    console.log("addrider")
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      
      console.log(errors.array())
      res.json(errors.array())
    }
    else{
        
      Farmer.encryptPassword(req.body.password, (err, hash) => {
          if(err) {throw err}
          else{
         let password = hash;
         const app = Rider.build({
          image : req.body.image,
          name : req.body.firstname+" "+req.body.lastname,
          email : req.body.email,
          password : password,
          cnic: req.body.cnic,
          phoneNo: req.body.phoneno,
          fID : req.body.fID
      })
      app.save().then(() => {
       res.send('ok')
      })
          }
      })
      
    }
     
}
exports.yourprofile = (req, res) => {
    console.log('profile')
Farmer.findOne({
    where : {
        id : req.params.id
    }
}).then((pro) => {
    res.json(pro.dataValues)
})
}

exports.yourprofilereview = (req, res) => {
    console.log("profile Review")

    Order.findAll({
        where: {
            fID: req.params.id
        }
    }).then((pro) => {
        res.json(pro.dataValues)
    })
}

exports.yourprofiledata= (req, res) => {
    Farmer.findOne({
        where : {
            id: req.params.id
        }
    }).then((pro) => {
        console.log(pro.dataValues)
        res.json(pro.dataValues)
    })
}

exports.update = (req, res) => {
    Farmer.encryptPassword(req.body.password, (err, hash) => {
        let password = hash
        Farmer.update(
            {
                image : req.body.image,
                name : req.body.name,
                password : password
            },
            {
                where : {id : req.params.id}
            }
        ).then((pro) => {

            res.json(pro)
        })    
        
    })

    
                    
}
exports.additem = (req, res) => {
 let app = Product.build({
     milk : req.body.milk,
     butter : req.body.butter,
     cream : req.body.cream,
     fID : req.body.fID
 })
 app.save().then(() => {
    res.json('ok')
   })
}