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
            const users = await Users.find({email:email})
            const enctyptedPass = enctypt(password)

        
            if(users.length == 0){
                const user = await Users.create({name , email, password:enctyptedPass,status:'active',role:'user'})

                console.log(user);
                const newToken = jwt.sign({ user:[user] }, process.env.TOKENKEY, { expiresIn:"24h"});

                res.cookie('token', newToken, { domain:'.'+process.env.DOMAIN, path: '/', maxAge: 900000, httpOnly: true });

                return res.status(200).json(user);

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


    async getUser(req,res){
        const token = req.cookies.token;

        try{

                jwt.verify(token, process.env.TOKENKEY, (err, decoded) => {
                    if (err) {
                        return res.sendStatus(403); // Forbidden if token is invalid
                    }
                    req.user = decoded.user;
                    return res.status(200).json(decoded.user)
                });
            }catch (e){
            return res.json(e)
        }
    }
    async login(req,res){
        try{



            const {email , password} = req.body
                const ecryptedPass = enctypt(password)
                const user = await Users.find({email: email})

            if (user[0] && (user[0].password === ecryptedPass && user[0].status !== 'blocked')) {
                const newToken = jwt.sign({ user }, process.env.TOKENKEY, { expiresIn:"24h"});

                res.cookie('token', newToken,{ domain: '.'+process.env.DOMAIN, path: '/', maxAge: 900000, httpOnly: true });

                return res.status(200).json(user);
            }
            else {
                return res.status(400).json({ error: 'Invalid email or password' });
            }


            }catch (e){
                res.status(500).json(e)
            }
        }

    async changeStatus(req, res) {
        try {
            const { ids, status } = req.body;

            const updatedUsers = await Users.updateMany({ _id: { $in: ids } }, { $set: { status: status } });

            return res.status(200).json('updated');
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async changeRole(req,res){
        try{
            const {ids,role}= req.body

            const updatedUsers = await Users.updateMany({_id: {$in: ids}} ,{$set:{role:role}})
            return res.status(200).json('updated')
        }catch (e){
            res.status(500).json(e)
        }
    }
    async delete(req,res){
        try{
            const {ids} = req.body

            if(!ids){
                res.status(400).json({message:'no id'})
            }
            const user = await Users.deleteMany({_id: {$in: ids}})
            return res.status(200).json('deleted')

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