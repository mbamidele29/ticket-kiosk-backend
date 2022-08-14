const Event=require('../models/event-model');
const Category=require('../models/category-model');

const response =require('../utils/response');

async function get(req, res, next){
    try{
        const eventType='Public';
        const events=await Event.find({eventType})
                                .populate('category');
        res.json(response.success('', events));
    }catch(err){
        next(err);
    }
}

async function getOne(req, res, next){
    try{
        const _id=req.params.id;
        const eventType='Public';

        const event=await Event.findOne({_id, eventType});
        res.json(response.success('', event));
    }catch(err){
        next(err);
    }
}

async function upload(req, res, next){
    try{
        res.json(response.success(
            'upload successful',
            {
                path: req.file.path
            }
        ));
    }catch(err){
        next(err);
    }
}

async function create(req, res, next){
    try{
        let { title, description, categoryId:category }=req.body;
        let { eventType }=req.body;
        let { tickets, eventDates, placeId, address, banner }=req.body;

        const createdBy=req.user._id;
        const categoryObj=await Category.findOne({'_id': category});
        if(!categoryObj){
            const err=new Error('Category does not exist');
            err.status=400;
            return next(err);
        }

        const event=new Event({
            title, description, category, banner, eventType, tickets, 
            eventDates, placeId, address, createdBy
        });

        const validator=event.validateSync();
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
        await event.save();
        res.json(response.success('event created successfully', event));
    }catch(err){
        next(err);
    }

}


module.exports={
    get, getOne, create, upload
};