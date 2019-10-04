const express = require('express')
const farmercontrol = require('../Controller/farmercontrol')
const Farmer = require('../Model/farmer')
const path = require('path')
const passport = require("passport")
const cookie = require('cookie-parser')
const message = require('express-messages')
const session = require('express-session')
const LocalStrategy = require('passport-local').Strategy
const { check, validationResult } = require('express-validator/check');
const route = express.Router()



route.use(cookie())
route.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))
// Passport Initilize Middleware
route.use(passport.initialize());
route.use(passport.session());
// Passport Authantication Strategy-------------------------------------------------------------------------------------------

passport.use(new LocalStrategy(
    function(username, password, done) {
      Farmer.findOne({where : {email : username} })
      .then((user) => {
          if(user == null){
              return done(null, false, {message : "Incorrect Username"})
          }
          else if(user){
              Farmer.comparePassword(password, user.dataValues.password, function(err, res){
                //   console.log(res)
                 if(!res) { return done(null, false, { message: 'Incorrect password.' })}
                else{ return done(null, user)}
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
    Farmer.findOne({where : {id}}).then(
        (pro) => {
            done (null, pro.dataValues.id)
        }
    );
});


// ensureAuth Function
function ensureAuth(req, res) {
    if (req.isAuthenticated()) {
        return next()
    }
    else {
        res.redirect('/')
    }
}

route.post('/farmer', [
    // username must be an email
    check('image', 'Please upload an Image').not().isEmpty(),
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
    check('phoneno', 'Enter the Phone Number').not().isEmpty(),
    check('phoneno', 'Pattren is Wrong. Correct Pattern is xxxx-xxxxxxx').matches('^[0-9+]{4}-[0-9+]{7}$'),
    check('cnic', 'Enter the CNIN ').not().isEmpty(),
    check('cnic', 'Pattern is wrong. Correct pattern is xxxxx-xxxxxxx-x').matches('^[0-9+]{5}-[0-9+]{7}-[0-9]{1}$'),
    check('city', 'Enter the city').not().isEmpty()
], farmercontrol.form)

route.get('/', farmercontrol.fail)
route.post('/farmer/upload', farmercontrol.uploaded)

route.post('/farmer/login', farmercontrol.login)

route.get('/farmer/loginfail', farmercontrol.loginfail)

route.get('/farmer/:id', farmercontrol.main)

route.post('/farmer/rider',[
    // username must be an email
    check('image', 'Please upload an Image').not().isEmpty(),
    check('firstname', 'Enter the First Name').not().isEmpty(),
    check('lastname', 'Enter the Last Name').not().isEmpty(),
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
    check('phoneno', 'Enter the Phone Number').not().isEmpty(),
    check('phoneno', 'Pattren is Wrong. Correct Pattern is xxxx-xxxxxxx').matches('^[0-9+]{4}-[0-9+]{7}$'),
    check('cnic', 'Enter the CNIN ').not().isEmpty(),
    check('cnic', 'Pattern is wrong. Correct pattern is xxxxx-xxxxxxx-x').matches('^[0-9+]{5}-[0-9+]{7}-[0-9]{1}$'),
], farmercontrol.addrider)

route.get("/farmer/:id/yourprofile", farmercontrol.yourprofile)

route.get('/farmer/:id/yourProfileReview', farmercontrol.yourprofilereview)

route.get('/farmer/:id/yourprofiledata', farmercontrol.yourprofiledata)

route.post('/farmer/:id/update',[
    check('image', 'Please upload an Image').not().isEmpty(),
    check('name', 'Enter the First Name').not().isEmpty(),
    check('password', 'Enter the Proper Password').isLength({ min: 5 })
        .custom((value, { req, loc, path }) => {
            if (value !== req.body.cpassword) {
                // trow error if passwords do not match
                throw new Error("Passwords don't match");
            } else {
                return value;
            }
        }),

] , farmercontrol.update)

route.post('/farmer/:id/additem',farmercontrol.additem)

route.get('/farmer/logout', farmercontrol.logout)
module.exports = route