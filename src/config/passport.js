const passport=require('passport');
const jwt=require('jsonwebtoken');
const LocalStrategy=require('passport-local').Strategy;
const JWTStrategy=require('passport-jwt').Strategy;
const ExtractJWT=require('passport-jwt').ExtractJwt;

const User=require('../app/models/user-model');

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const JWTOptions={
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_KEY
}

passport.use(new JWTStrategy(JWTOptions, (payload, done)=>{
    User.findOne({_id: payload.id}, (err, user)=>{
        if(err)done(err, null);
        else if(user)done(false, user);
        else done(false, null);
    })
}));


module.exports.generateJWT=(payload)=>{
    const expiresIn=2*60*60;
    const refreshExpiresIn=2.5*60*60;
    const token = 'Bearer '+ jwt.sign(payload, process.env.JWT_KEY, {
        expiresIn
    });

    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, {
        expiresIn
    });

    return {
        token, expiresIn, refreshToken, refreshExpiresIn
    }
}