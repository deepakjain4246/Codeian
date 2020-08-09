const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const { callbackify } = require('util');

passport.use(new googleStrategy({
    clientID:"956463278618-fp91cmcef29qi4ln0s36fnncu302ia83.apps.googleusercontent.com",
    clientSecret:"k4xoXx-kwop1d8df3bmheoVp",
    callbackURL:"http://localhost:8000/users/auth/google/callback"
},

function(accessToken, refreshToken, profile, done){
    //find a user
    User.findOne({
        email:profile.emails[0].value}).exec(function(err,user){
            if(err){console.log('error in google stratgy-passport',err);return;}

            console.log(profile);

            if(user){
                return done(null,user);
            }else{

User.create({
    name:profile.displayName,
    email:profile.emails[0].value,
    password:crypto.randomBytes(20).toString('hex')
}, function(err,user){
    if(err){
        console.log('error in creating user google strategy-passport',err);
        return;
    }
    return done(null,user);
})

            }
        })
    }))


