const passport=require('passport');

module.exports={
    auth: passport.authenticate('jwt', {session: false}),
    admin: (req, res, next)=>{
        next();
    }
}