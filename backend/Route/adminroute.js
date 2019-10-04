const express = require('express')
const admincontrol = require('../Controller/admincontrol')
const Admin = require('../Model/admin')
const passport = require("passport")
const cookie = require('cookie-parser')
const message = require('express-messages')
const session = require('express-session')
const LocalStrategy = require('passport-local').Strategy
const { check, validationResult } = require('express-validator/check');
const admin = express.Router()

//Local Strategy 
admin.use(cookie())
admin.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))
// Passport Initilize Middleware
admin.use(passport.initialize());
admin.use(passport.session());
// Passport Authantication Strategy-------------------------------------------------------------------------------------------

passport.use(new LocalStrategy(
    function (username, password, done) {
        Admin.findOne({ where: { email: username } })
            .then((user) => {
                if (user == null) {
                    return done(null, false, { message: "Incorrect Username" })
                }
                else if (user) {
                    Admin.comparePassword(password, user.dataValues.password, function (err, res) {
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
    Farmer.findOne({ where: { id } }).then(
        (pro) => {
            done(null, pro.dataValues.id)
        }
    );
});



admin.post('/signup', [
    check('name', 'Enter the Name').not().isEmpty(),
    check('email').isEmail(),
    check('email', 'Enter the Email').not().isEmpty(),
    // password must be at least 5 chars long
    check('password', 'Enter the Proper Password').isLength({ min: 5 })
        .custom((value, { req, loc, path }) => {
            if (value !== req.body.cpassword) {
                // trow error if passwords do not match
                throw new Error("Passwords don't match");
            } else {
                return value;
            }
        }),
], admincontrol.signup)

admin.post('/login', passport.authenticate('local', {
    failureRedirect: '/admin/loginfail',
}), admincontrol.login)

admin.get('/loginfail', admincontrol.loginfail)

admin.get('/topcustomer', admincontrol.topcustomer)

admin.get('/toprider', admincontrol.toprider)

admin.get('/topfarmer', admincontrol.topfarmer)

admin.post('/searchfarmer', admincontrol.searchfarmer)

admin.post('/searchfarmerrider', admincontrol.searchfarmerrider)

admin.get('/farmerweek', admincontrol.farmerweek)

admin.get('/farmermonth', admincontrol.farmermonth)

admin.get('/farmeryear', admincontrol.farmeryear)

admin.post('/searchcustomer', admincontrol.searchcustomer)

admin.get('/logout', admincontrol.logout)

module.exports = admin