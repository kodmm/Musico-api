const express = require('express');

const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Customer = require('../models').Customer;

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, done) => {
    
    Customer.findOne({
        where: {
            email: email
        }
    })
    .then(customer => {
        if (customer && bcrypt.compareSync(password, customer.password)) {
            return done(null, customer); //Successfulyy login

        }

        throw new Error()

    })
    .catch(error => {
        return done(null, false, { message: '認証情報(password)と一致するレコード(データ)がありません。'});
    });
}));

//Session
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, false);
});

module.exports = passport;