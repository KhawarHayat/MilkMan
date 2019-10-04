const express = require('express')
const Customer = require('../Model/customer')
const Admin = require('../Model/admin')
const passport = require("passport")
const cookie = require('cookie-parser')
const message = require('express-messages')
const session = require('express-session')
const LocalStrategy = require('passport-local').Strategy
const { check, validationResult } = require('express-validator/check');
const customer = express.Router()


//Local Strategy 
customer.use(cookie())
customer.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))
// Passport Initilize Middleware
customer.use(passport.initialize());
customer.use(passport.session());
// Passport Authantication Strategy-------------------------------------------------------------------------------------------

passport.use(new LocalStrategy(
    function (username, password, done) {
        Customer.findOne({ where: { email: username } })
            .then((user) => {
                if (user == null) {
                    return done(null, false, { message: "Incorrect Username" })
                }
                else if (user) {
                   Customer.comparePassword(password, user.dataValues.password, function (err, res) {
                        //   console.log(res)
                        if (!res) { return done(null, false, { message: 'Incorrect password.' }) }
                        else { return done(null, user) }
                    })
                }
            })
    }
));


//Passport Serilization & Deserilization ------------------------------------------------------------------------------------------------------------

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    Customer.findOne({ where: { id } }).then(
        (pro) => {
            done(null, pro.dataValues.id)
        }
    );
});






module.exports = function(io){
    const customercontrol = require('../Controller/customercontrol')(io)
    
customer.post('/signup',[
    // username must be an email
    check('name', 'Enter the Name').not().isEmpty(),
    check('email').isEmail(),
    check('email', 'Enter the Email').not().isEmpty(),
    // password must be at least 5 chars long
    check('password', 'Enter the Proper Password').isLength({ min : 5 })
        .custom((value, { req, loc, path }) => {
            if (value !== req.body.cpassword) {
                // trow error if passwords do not match
                throw new Error("Passwords don't match");
            } else {
                return value;
            }
        })
],customercontrol.signup)

customer.post('/login',customercontrol.login)

customer.get('/:id/homelocation', customercontrol.homelocation)

    customer.post('/order',customercontrol.order)

    customer.post('/rider/login', customercontrol.riderlogin)
    return customer

}