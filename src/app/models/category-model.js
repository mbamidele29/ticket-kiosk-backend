const mongoose=require('mongoose');

const schema=mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true
});

module.exports=mongoose.model('Category', schema);