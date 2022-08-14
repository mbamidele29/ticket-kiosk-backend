const mongoose=require('mongoose');


const schema=mongoose.Schema({
    body: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }
}, {
    timestamps: true
});

module.exports=schema;// mongoose.model('Comment', schema);