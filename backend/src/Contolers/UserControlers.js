const Users = require("../db/Users")
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

function enctypt(password){
    let hmac = crypto.createHmac('sha3-256', process.env.key)
    hmac.update(password)
    return hmac.digest('hex');
}

class UserContolers{

    async createUsers(req,res){
        try{
            const {name , email, password }= req.body
            const users = await Users.find({email})
            const enctyptedPass = enctypt(password)
            
        
            if(users.length === 0){  
                const user = await Users.create({name , email, password:enctyptedPass,status:'active',role:'admin'})

                const token = jwt.sign({ user }, process.env.TOKENKEY, { expiresIn: '7d' })
                console.log(token);
                res.cookie('token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 })

                return res.status(200).json(user)
            }else{
                return res.status(400).json('false')
            }

        }catch (e){
            res.status(500).json(e)
        }
    }
    async users(req,res){
        try{
            const users = await Users.find()
            res.json(users)
        }catch (e){
            res.status(500).json(e)
        }

    } 
    
    async login(req,res){
        try{
            const {email , password} = req.body
            const ecryptedPass = enctypt(password)

            const user = await Users.find({email: email}) 

            if(user[0].password === ecryptedPass && user[0].status != 'blocked'){
                const token = jwt.sign({ user }, process.env.TOKENKEY, { expiresIn: '7d' })
                res.cookie('token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 })

                res.status(200).json(user)
            }else{
                res.status(400).json('false')
            }
        }catch (e){
            res.status(500).json(e)
        }
    }

    async block(req,res){
        try{
            const users = req.body.users
            const newStatus = req.body.type
            
            const updatedUsers = []

            users.forEach( async (id)=>{

                if(!id){
                    res.status(400).json({message:'no id'})
                 }
                
                 const updateUser = await Users.findByIdAndUpdate(id , {status:newStatus} , {new:true})
                 
                 updatedUsers.push(updateUser)
            })


            return res.status(200).json(updatedUsers)
        }catch (e){
            res.status(500).json(e)
        }
    }

    async delete(req,res){
        try{
            const {id} = req.params

            if(!id){
                res.status(400).json({message:'no id'})
            }
            const user = await User.findByIdAndDelete(id)
            return res.json(user)

        }catch (e){
            res.status(500).json(e)
        }
    }
    async logout(req,res){
        res.clearCookie('token'); 
        res.sendStatus(200);
    }
}

module.exports = new UserContolers()