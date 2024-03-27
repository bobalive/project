require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const router = require('./router/router');
const crypto = require('crypto')
const cookieParser = require('cookie-parser');
const wsConnect = require('./ws.js')



const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const app = express()


app.use(cors({
    origin:process.env.FRONTEND,
    credentials: true
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
        wsConnect()

    }catch (e){
        console.log(e)
    }
}
startApp()


