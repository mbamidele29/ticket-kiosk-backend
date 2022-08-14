const mongoose=require('mongoose');

const schema=mongoose.Schema({
    'firstName': {
        type: String,
        required: [true, 'Firstname is required'],
    },
    'lastName': {
        type: String,
        required: [true, 'Lastname is required'],
    },
    'email': {
        type: String,
        unique: false,
        required: [true, 'Email is required'],
    },
    'phoneNumber': {
        type: Number,
        required: [true, 'Phone Number is required'],
    },
    'token': {
        type: String,
        required: true
    },
    'createdAt': {
        type: Date,
        default: Date.now,
        expires: '30m'
    },
    'expiresAt': {
        type: Number,
        default: new Date().getTime()+30*60000,
    }
});

module.exports=mongoose.model('Register', schema);