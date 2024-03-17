require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const router = require('./router/router');
const crypto = require('crypto')
const cookieParser = require('cookie-parser');


const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const app = express()


app.use(cors({
    origin: 'http://localhost:5173', // Replace with the actual origin of your frontend application
    credentials: true // Allow credentials (cookies) to be sent with requests
}))


app.use(express.json())
app.use(cookieParser());
app.use(upload.single('photo'))
app.get('/',(req,res)=>{
    res.send('server is working')
})
app.post('/upload',(req,res)=>{
    console.log(req.file.path)
    res.send('fileuloaded')
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


