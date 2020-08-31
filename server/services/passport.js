//We send token here, it's a middleware for Passport:

const passport = require('passport');
const User = require("../models/user");
const config = require("../../config");
const JwtStrategy = require("passport-jwt").Strategy ;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;

const jwtOptions = {
    jwtFromRequest : ExtractJwt.fromHeader("authorization"),
    secretOrKey : config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    const userId = payload.sub; //where the id is
    User.findById(userId, function(err, user){
        if(err){
            return done(err, false)
        }
        if(user){
            return done(null, user);
        } else {
            return done(null, false);
        }
    })
});

const localOptions = { 
    usernameField: "email", 
    // passReqToCallBack: true
}

const localLoginStrategy = new LocalStrategy(localOptions, function(

    email, 
    password, 
    done
    
    ){

    User.findOne({email}, function(err, user){

        if(err) {
             return done(err)
        };
        if(!user) {
            return done(null, false, { message: 'Incorrect username.' })
        };

        user.isPasswordEqualTo(password, function( err, isMatch){
            if(err) {
                return done(err)
            }
            if(!isMatch){ 
                return done(null, false,  { message: 'Incorrect password.' })
            }
            return done(null, user);
        })


    })
})

passport.use(jwtLogin);
passport.use(localLoginStrategy);