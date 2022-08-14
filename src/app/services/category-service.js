const Category=require('../models/category-model');
const response=require('../utils/response');

async function get(req, res, next){
    try{
        const active=true;
        const categories=await Category.find({active});
        res.json(response.success('', categories));
    }catch(err){
        next(err);
    }
}

async function getOne(req, res, next){
    try{
        const _id=req.params.id;
        const active=true;
        const category=await Category.findOne({_id, active});
        res.json(response.success('', category));
    }catch(err){
        next(err);
    }
}

async function create(req, res, next){
    try{
        const { name }=req.body;
        const createdBy=req.user._id;

        const category=new Category({name, createdBy});
        const validator=category.validateSync();
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
        await category.save();
        res.json(response.success('category created successfully', category));

    }catch(err){
        next(err);
    }
}

async function update(req, res, next){
    try{
        const { name, status }=req.body;
        const { id }=req.params;

        if(!id){
            const err=new Error('category id is required');
            err.status=400;
            return next(err);
        }
        if(!name && !status){
            const err=new Error('category name or status is required');
            err.status=400;
            return next(err);
        }

        const data={ name };
        if(status!=null)data['active']=status;

        const category=await Category.findByIdAndUpdate(id, {
            $set: data
        }, {
            new: true
        });
        res.json(response.success('update successful', category));
    }catch(err){
        next(err);
    }
}

module.exports={
    get, getOne, create, update
}