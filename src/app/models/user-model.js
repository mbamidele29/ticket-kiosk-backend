const mongoose =require('mongoose');
const passportLocalMongoose=require('passport-local-mongoose');


const schema=mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name s=is required'],
        minLength: 3
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        minLength: 3
    },
    email: {
        type: String,
        required: [true, 'email address is required'],
    },
    phoneNumber: {
        type: Number,
        required: [true, 'phone number is required'],
    },
}, {
    timestamps: true,
});

schema.plugin(passportLocalMongoose);

module.exports=mongoose.model('User', schema);