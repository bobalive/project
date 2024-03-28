require('dotenv').config();

const mongoose = require('mongoose')
const cors = require('cors');
const router = require('./router/router');
const crypto = require('crypto')
const cookieParser = require('cookie-parser');
const {ws} = require('ws')
const wsConnect = require('./ws.js')



const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);

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

app.ws('/', wsConnect);


async function startApp(){
    try{
        await mongoose.connect(process.env.DB_URL)
        .then(res=>{
            console.log('connected to db');
        })


        app.listen(process.env.PORT , ()=> console.log('Server started ' + process.env.PORT  ))

        // wsConnect()

    }catch (e){
        console.log(e)
    }
}
startApp()


