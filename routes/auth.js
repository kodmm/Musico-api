var express = require('express');
var router = express.Router();
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var db = require('../models/index');



passport.use(new GoogleStrategy({
    clientID: '732532259790-lomstklejr6bp0idtqllibkt139dlef1.apps.googleusercontent.com',
    clientSecret: '_WD3DNlvPDrFenGFm6QNnRR-',
    callbackURL: 'http://localhost:3001/api/auth/google/callback'
},
    async function(accessToken, refreshToken, profile, done){
        await db.Customer.findOrCreate({ 
            where: { email: profile.emails[0].value},
            defaults: {
                googleId: profile.id,
                familyName: profile.name.familyName,
                givenName: profile.name.givenName,
                email: profile.emails[0].value, 
            }
        }).then((user, created) => {   
            return done(null, user[0].dataValues);
        }).catch(err => console.log(`ERRR ${err}`));
        
    }
));


router.get('/auth/google', 
    passport.authenticate('google', { scope: ['email', 'profile']}),
);

router.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/googleapi/failured/login'}),
    function(req, res) {
        
        console.log('hogegegege');
        res.json(req.user)
    }
);

passport.serializeUser(function(user, done) {
    console.log(`session: ${user}`)
    done(null, user);
    
});

passport.deserializeUser(function(user, done) {
    done(null, user.id);
    console.log('disconnection session')
});

//log out
router.get('/auth/logout',(req, res, next) => {
    req.logout();
    res.json([{msg: 'Successfully Log out'}]);
});

module.exports = router;