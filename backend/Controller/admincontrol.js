const Admin = require('../Model/admin')
const Farmer = require('../Model/farmer')
const Order = require('../Model/order')
const Rider = require('../Model/rider')
const Customer = require('../Model/customer')
const sequelize = require('sequelize')
const Op = sequelize.Op;
const moment = require('moment')
const { check, validationResult } = require('express-validator/check');




exports.login = (req, res) => {
    Admin.findOne({
        where: { email: req.body.username }
    }).then((pro) => {
        res.json(pro.dataValues)
    })
}



exports.signup = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        console.log(errors.array())
        res.json(errors.array())
    }
    else {
        Admin.encryptPassword(req.body.password, (err, hash) => {
            if (err) { throw err }
            else {
                let password = hash;
                const app = Admin.build({
                    name: req.body.name,
                    email: req.body.email,
                    password: password
                })
                app.save().then(() => {
                    res.send('ok')
                })
            }
        })
    }

}



exports.loginfail = (req, res) => {
    res.json('fail')
}



exports.topcustomer = (req, res) => {
    Customer.findAll({
        order: [
            ['noOfOrders', 'DESC']
        ]
    }).then((pro) => {
        res.json(pro)
    })
}



exports.topfarmer = (req, res) => {
    Farmer.findAll({
        order: [
            ['serveorders', 'DESC']
        ]
    }).then((pro) => {
        // console.log(pro)
        res.json(pro)
    })
}



exports.toprider = (req, res) => {
    Rider.findAll({
        order: [
            ['deliveredOrders', 'DESC']
        ]
    }).then((pro) => {
        // console.log(pro)
        res.json(pro)
    })
}



exports.searchfarmer = (req, res) => {
    console.log(req.body.value)

    if (req.body.value == '') {
        Farmer.findAndCountAll({
            order: [
                ['id', 'ASC']
            ]
        }).then((pro) => {
            res.json(pro)
        })
    }
    else {
        Farmer.findAndCountAll({
            where: { name: { [Op.like]: `%${req.body.value}%` } }
        }).then((pro) => {
            // console.log(pro.count)
            // console.log(pro.rows)

            res.json(pro)
        })
    }

}



exports.farmerweek = (req, res) => {
    let date = moment()
    date = Admin.timestamp(date)
    // console.log(date)
    Order.findAndCountAll({
        order: [
            ['id', 'ASC']
        ]
    }).then((pro) => {
        
        let arr = []
        let arr1 = []
        // console.log(pro.count)
        for (let i = 0; i < pro.count; i++) {
            // console.log(Admin.timestamp(pro.rows[i].dataValues.createdAt))
            let date = Admin.timestamp(pro.rows[i].dataValues.createdAt)
            pro.rows[i].dataValues.createdAt = date
            // console.log(pro.rows[i].dataValues)
            arr.push(pro.rows[i].dataValues)
        }
        // console.log(arr)
        for(let j = 0; j < 7; j++){
            let com = date - 86400;
            let sum = 0
            
            // console.log(arr[0].createdAt)
            for (let i = 0; i < pro.count; i++) {
                
                if(date > arr[i].createdAt && arr[i].createdAt > com ){
                sum +=  1
                // console.log(sum)
                }
                // console.log(sum)
              }
              arr1.push(sum)
                date = com
        }
        console.log(arr1)
        res.json(arr1)
    })

}



exports.farmermonth = (req, res) => {
    let date = moment()
    date = Admin.timestamp(date)
    // console.log(date)
    Order.findAndCountAll({
        order: [
            ['id', 'ASC']
        ]
    }).then((pro) => {
        
        let arr = []
        let arr1 = []
        for (let i = 0; i < pro.count; i++) {
            let date = Admin.timestamp(pro.rows[i].dataValues.createdAt)
            pro.rows[i].dataValues.createdAt = date
            arr.push(pro.rows[i].dataValues)
        }
        
        for(let j = 0; j < 4; j++){
            let com = date - 604800;
            let sum = 0
            
            
            for (let i = 0; i < pro.count; i++) {
                
                if(date > arr[i].createdAt && arr[i].createdAt > com ){
                sum +=  1
                
                }
                // console.log(sum)
              }
              arr1.push(sum)
                date = com
        }
        
         res.json(arr1)
    })

}



exports.farmeryear = (req, res) => {
    let date = moment()
    date = Admin.timestamp(date)
    // console.log(date)
    Order.findAndCountAll({
        order: [
            ['id', 'ASC']
        ]
    }).then((pro) => {
        
        let arr = []
        let arr1 = []
        for (let i = 0; i < pro.count; i++) {
            let date = Admin.timestamp(pro.rows[i].dataValues.createdAt)
            pro.rows[i].dataValues.createdAt = date
            arr.push(pro.rows[i].dataValues)
        }
        
        for(let j = 0; j < 12; j++){
            let com = date - 2592000;
            let sum = 0
            
            
            for (let i = 0; i < pro.count; i++) {
                
                if(date > arr[i].createdAt && arr[i].createdAt > com ){
                sum +=  1
                
                }
                // console.log(sum)
              }
              arr1.push(sum)
                date = com
        }
        
         res.json(arr1)
    })

}


exports.searchfarmerrider = (req, res) => {
    console.log(req.body.value)

    if (req.body.value == '') {
        Rider.findAndCountAll({
            order: [
                ['id', 'ASC']
            ]
        }).then((pro) => {
            res.json(pro)
        })
    }
    else {
        Rider.findAndCountAll({
            where: { name: { [Op.like]: `%${req.body.value}%` } }
        }).then((pro) => {
            // console.log(pro.count)
            // console.log(pro.rows)

            res.json(pro)
        })
    }

}


exports.searchcustomer = (req, res) => {
    console.log(req.body.value)

    if (req.body.value == '') {
        Customer.findAndCountAll({
            order: [
                ['id', 'ASC']
            ]
        }).then((pro) => {
            res.json(pro)
        })
    }
    else {
        Customer.findAndCountAll({
            where: { name: { [Op.like]: `%${req.body.value}%` } }
        }).then((pro) => {
            // console.log(pro.count)
            // console.log(pro.rows)

            res.json(pro)
        })
    }
}

exports.logout = (req, res) =>  {
    req.logout()
    res.json(true)
}