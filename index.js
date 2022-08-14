// ------------------imports-------------------
require('dotenv').config();
require('./src/config/passport');
require('./src/config/database');

const path=require('path');
const passport=require('passport');
const express = require('express');
const morgan=require('morgan');
const response=require('./src/app/utils/response');

const authRouter=require('./src/routes/auth-route');
const eventRouter=require('./src/routes/event-route');
const categoryRouter=require('./src/routes/category-route');

const middleware=require('./src/app/utils/middleware');
// ---------------x--imports--x----------------

// ------------------initializations-------------------
const app=express();
const PORT=process.env.PORT ?? 5000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('dev'));
app.use(passport.initialize());
// ---------------x--initializations--x----------------


// ------------------routes-------------------

app.use('/api/auth', authRouter);
app.use('/api/events', middleware.auth, eventRouter);
app.use('/api/events', eventRouter);
// app.use('/api/category', middleware.auth, categoryRouter);
app.use('/api/category', categoryRouter);
// app.use('/api', otherRouter);

app.use((err, req, res, next)=>{
    res.status(err.status ?? 403).json(response.error(
        err.message ?? 'an error occurred',
        err.data ?? []
    ));
});

// ---------------x--routes--x----------------


// ---------------x--listen--x----------------
app.listen(PORT, ()=>console.log(`Connected to port ${PORT}`));
// ---------------x--listen--x----------------