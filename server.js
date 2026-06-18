import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'express';
// import { register } from './Controllers/user.js';
import userRouter from './Routes/user.js';
import contactRouter from './Routes/contact.js';
import { config } from 'dotenv';

const app = express();

// inserting middleware
app.use(bodyParser.json())

// .env setup
config({path:'.env'})

// home route
app.get('/',(req,res)=>{
    res.json({
        massage:'This is home route working'
    })
})


// user route
// @api dsc :- user register
// @api method :- post
// @api endpoint :- /api/user/register
// app.post('/api/user/register',register )
app.use('/api/user',userRouter);

// contact router
app.use('/api/contact',contactRouter)


// database connection
mongoose.connect( process.env.MONGO_URI ,{
    dbName: 'Api_making'
}).then(()=>console.log("Mongoose Connected")).catch((err)=>console.log(err));


const port = process.env.PORT ;
app.listen(port,()=>console.log(`listened ${port}`));