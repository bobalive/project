const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');




const PORT = 5000;

const app = express()


app.use(cors());
app.use(express.json())


async function startApp(){
    try{

        app.listen(PORT , ()=> console.log('Server started ' + PORT ))

    }catch (e){
        console.log(e)
    }
}
startApp()


