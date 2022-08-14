const passport=require('passport');
const fs=require('fs');
const path=require('path');
const Str=require('@supercharge/strings');
const User =require('../models/user-model');
const Register=require('../models/register-model');
const sendMail=require('../utils/send-mail').sendMail;
const generateJWT=require('../../config/passport').generateJWT;

const response=require('../utils/response');

async function login(req, res, next){
    try{
        req.body.username=req.body.email;
        passport.authenticate('local')(req, res, ()=>{
            if(req.user){
                const jwt=generateJWT({'id': req.user._id});
                res.json(response.success(
                    'login successful',
                    {
                        ...jwt,
                        'user': req.user,
                    }
                ));
            }else{
                const err=new Error('unable to authenticate credentials');
                err.status=400;
                next(err);
            }
        })
    }catch(err){
        next(err);
    }
}

async function register(req, res, next){
    const { firstName, lastName, email, phoneNumber }=req.body;
    try{
        const user=await User.findOne({email});
        if(user){
            const err=new Error(`${email} already registered`);
            err.status=403;
            return next(err);
        }
        const token=Str.random(50);
        const register=await Register.create({
            firstName,
            lastName,
            email,
            phoneNumber,
            token
        });
        if(register){
            const appName=process.env.APP_NAME;
            const exp=(register.expiresAt);
            const dir=path.join(__dirname, '../../views/email/register-request.html');
            const url=`${process.env.BASE_URL}api/auth/verify?token=${register.token}&email=${register.email}&exp=${exp}`;
            const content=fs.readFileSync(dir).toString().replace('{{url}}', url).replace('{{appName}}', appName);

            sendMail(email, `${appName} - Register`, content);
            delete register['token'];
            res.json(response.success('Please check your email address for a confirmation mail', register));
        }else next(new Error());
    }catch(err){
        next(err);
    }
}

async function verifyUser(req, res, next){
    try{
        const { email, token, exp }=req.query;
        if(!email || !token || !exp){
            const err=new Error('all fields required');
            err.status=400;
            next(err);
        }else{
            const register=await Register.findOne({
                token, email
            });
            if(!register){
                const err=new Error('user does not exist or token expired, please sign up again');
                err.status=400;
                return next(err);
            }
            res.json(response.success('email verified, please create a password', register));

        }
    }catch(err){
        next(err);
    }
}

async function createPassword(req, res, next){
    try{
        const { id, password, passwordConfirmation }=req.body;
        if(!id || !password || !passwordConfirmation){
            const err=new Error('all fields required');
            err.status=400;
            return next(err);
        }
        if(password!==passwordConfirmation){
            const err=new Error('password confirmation do not match');
            err.status=400;
            return next(err);
        }
        const register=await Register.findById(id);
        if(!register){
            const err=new Error('registration token expired');
            err.status=403;
            return next(err);
        }
        const { firstName, lastName, email, phoneNumber }=register;

        const exists=await User.findOne({email});
        if(exists){
            const err=new Error(`${email} already registered`);
            err.status=403;
            return next(err);
        }

        const username=email;

        const userObj=new User({
            firstName, lastName, email, phoneNumber, username, password
        });
        const validator=userObj.validateSync();
        if(validator){
            const errors={};
            Object.keys(validator.errors).forEach(key => {
                errors[key]=validator.errors[key].message;
            });
            const err=new Error(validator._message);
            err.data=errors;
            err.status=400;
            return next(err);
        }
        const user=await User.register(userObj, password);
        if(!user){
            const err=new Error('unable to create user');
            err.status=400;
            return next(err);
        }
        await Register.deleteMany({email});
        req.body.username=username;
        passport.authenticate('local')(req, res, ()=>{
            const jwt=generateJWT({'id': user._id});
            res.json(response.success(
                'registration successful',
                {
                    ...jwt,
                    'user': req.user,
                }
            ));
        })
    }catch(err){
        next(err);
    }
}

module.exports={
    login, register, verifyUser, createPassword
}