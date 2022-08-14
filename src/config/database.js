const mongoose=require('mongoose');

const url=process.env.MONGO_URL;

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>console.log(`connected to ${url}`))
.catch(err=>console.log(err));