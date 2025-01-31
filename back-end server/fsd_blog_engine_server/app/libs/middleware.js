const users = require('../models/users.models')

const isAuthenticated =function(req,res,next){
    let token = req.get('X-Authorization');
    if(token===null) return res.sendStatus(401);
    users.getIdFormToken(token,(err,id)=>{
        if(err || id === null){
            return res.sendStatus(401);
        }
        next();
    });
}

module.exports = {
    isAuthenticated:isAuthenticated,
}