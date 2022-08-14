const mongoose =require('mongoose');

const schema=mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    cost: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        min: 0,
        required: true,
    },
    quantitySold: {
        type: Number,
        min: 0,
        default: 0,
        // required: true,
    },
}, {
    timestamps: true
});

module.exports=schema;//mongoose.model('Ticket', schema);