const path=require('path');
const multer=require('multer');
const fs=require('fs');
const Str=require('@supercharge/strings');


const diskStorage=multer.diskStorage({
    destination: (req, file, cb)=>{
        const dir=`./public/storage/uploads/${file.fieldname}`;
        fs.mkdir(dir, (req, file)=>{
            cb(
                null, 
                dir
            )
        })
    },
    filename: (req, file, cb)=>{
        cb(
            null, 
            `${Str.random(20)}_${Date.now()}${path.extname(file.originalname)}`
        );
    }
});
module.exports=multer({
    storage: diskStorage,
    limits: {
        fileSize: 2*1024*1024, // 2MB
    },
    fileFilter: (req, file, cb)=>{
        if(!file.originalname.match(/\.(png|jpg)$/))
            return cb(new Error('invalid file type'), false);
        return cb(null, true);
    }
});