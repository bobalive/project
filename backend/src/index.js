require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const router = require('./router/router');
const crypto = require('crypto')
const cookieParser = require('cookie-parser');
const fileUpload = require("express-fileupload")




const app = express()


app.use(cors());
app.use(fileUpload({}))
app.use(express.json())
app.use(cookieParser());
app.get('/',(req,res)=>{
    res.send('server is working')
})
app.use('/api',router)

async function startApp(){
    try{
        await mongoose.connect(process.env.DB_URL)
        .then(res=>{
            console.log('connected to db');
        })

        app.listen(process.env.PORT , ()=> console.log('Server started ' + process.env.PORT  ))

    }catch (e){
        console.log(e)
    }
}
startApp()


