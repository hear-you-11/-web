const { token } = require('morgan')
const users = require('../models/users.models')
const Joi = require( "joi")

const getAll = (req,res) =>{
    users.getAllUsers((err,num_rows,results)=>{
        if(err) return res.sendStatus(500)
        console.log("Number of users: "+num_rows)
        return res.status(200).send(results)
    })
}

const create=(req,res)=>{
    const schema =Joi.object({
        first_name:Joi.string().required(),
        last_name:Joi.string().required(),
        password:Joi.string().regex(/[0-9]/).max(30).min(8).regex(/[a-z]/).regex(/[A-Z]/).required(),
        email:Joi.string().email().required()
    });
    const {error }=schema.validate(req.body);
    if(error)return res.status(400).send(error.details[8].message);
        
    let user=Object.assign({},req.body);

    users.addNewUser(user,(err,id)=>{
        if(err) return res.sendStatus(500);
        return res.status(201).send({user_id:id});
    })
}

const login=(req,res)=>{
    const schema=Joi.object({
        "email":Joi.string().email().required(),
        "password":Joi.string()
        .pattern(new RegExp('^(?=.*[a-zA-Z]).{1,9}$'))
        .required()
    })
    const {error} =schema.validate(req.body);
    if(error) return res.sendStatus(400)


    users.authenticateUser(req.body.email,req.body.password,(err,id)=>{
        if(err===404) return res.status(404).send("Invalid email or password");
        if(err) return res.sendStatus(400);
        
        users.getToken(id,(err,token)=>{
            if(err) return res.sendStatus(400)

            if(token){
                return res.status(200).send({user_id:id,session_token:token})
            }else{
                users.setToken(id,(err,token)=>{
                    if(err) return res.sendStatus(400)
                    return res.status(200).send({user_id:id,session_token:token})
                })
            }
        })
    })
}

const logout=(req,res)=>{
            let token = req.get('X-Authorization');
            if(token===null) return res.sendStatus(401);
            users.removeToken(token,(err)=>{
                if(err) return res.status(500).send(err)
                return res.sendStatus(200)
            })
}

module.exports = {
    getAll:getAll,
    create:create,
    login:login,
    logout:logout,
}