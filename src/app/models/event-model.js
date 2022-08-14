const mongoose=require('mongoose');
const ticket=require('../models/ticket-model');
const comment=require('../models/comment-model');

const schema=mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: 255,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    eventType: {
        type: String,
        default: 'Public',
        enum: ['Public', 'Private'],
        required: true,
    },
    // rsvp: {
    //     type: [String], // name, phone, email; defaults to info of creator
    //     required: true,
    // },
    // inviteOnly: {
    //     type: Boolean,
    //     default: false
    // },
    // invitePassword: {
    //     type: String,
    //     required: false,
    // },
    tags: {
        type: [String],
    },
    tickets: {
        type: [ticket],
        required: true
    },
    comments: {
        type: [comment],
    },
    eventDates: {
        type: [String],
        required: true,
    },
    // longitude: {
    //     type: Number,
    //     required: true,
    // },
    // latitude: {
    //     type: Number,
    //     required: true,
    // },
    placeId: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    banner: {
        type: String,
        required: [true, 'Banner is required'],
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true,
});

module.exports=mongoose.model('Event', schema);