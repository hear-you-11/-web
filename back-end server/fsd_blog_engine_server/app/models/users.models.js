const { get } = require("http");
const db = require("../../database")
const crypto = require('crypto');

const getAllUsers=(done)=>{
    const sql='SELECT * FROM users'
    const errors = []
    const results=[]
    db.each(
        sql,
        [],
        (err,row)=>{
            if(err) errors.push(err)
            results.push({
                user_id:row.user_id,
                first_name:row.first_name,
                last_name:row.last_name,
                email:row.email,
                })
        },
        (err,num_rows)=>{
            return done(err,num_rows,results)
        }
    )
}

const addNewUser = (user, done)=>{
    console.log(user.first_name);
    const salt = crypto.randomBytes(64);
    const hash = getHash(user.password, salt);

    const sql = 'INSERT INTO users (first_name,last_name,email,password,salt) VALUES (?,?,?,?,?)';
    let values = [user.first_name, user.last_name,user.email,hash,salt.toString('hex')];

    db.run(sql,values,function(err){
        if(err) return done(err,null);
        console.log(this.lastID)
        return done(null,this.lastID)
    })
}
const getHash=function(password,salt){
    return crypto.pbkdf2Sync(password, salt, 100000, 256, 'sha256').toString('hex')
};

const authenticateUser=(email,password,done)=>{
    const sql = 'SELECT user_id,password,salt FROM users WHERE email=?';

    db.get(sql,[email],(err,row)=>{
        if(err) return done(err)
        if(!row) return done(404) //wrong email

        if(row.salt===null) row.salt = ''

        let salt = Buffer.from(row.salt,'hex')

        if(row.password === getHash(password,salt)){
            return done(false, row.user_id)
        }else{
            return done(404) //wrong password
        }
    })
}
const setToken = (id,done)=>{
    let token = crypto.randomBytes(16).toString('hex');

    const sql='UPDATE users SET session_token=? WHERE user_id=?'

    db.run(sql,[token,id],(err)=>{
        return done(err,token)
    })
}
const getToken = (id, done) =>{
    db.get('SELECT session_token FROM users WHERE user_id=?',id,(err,row)=>{
        if(err) return done(err,null)
        if(!row) return done(null,null)
        return done(null,row.session_token)
    }
    )
}

const removeToken = (token, done)=>{
    const sql = 'UPDATE users SET session_token=null WHERE session_token=?';
    db.run(sql,[token],(err)=>{
        if(err) return done(err)
        return done(null)
    })
}

const getIdFormToken = (token, done) => {
    const sql = 'SELECT user_id FROM users WHERE session_token=?';
    const params = [token];
    db.get(sql, params, (err, row) => {
        if (err) return done(err)
        if(!row) return done(404)
        return done(null,row.user_id);
    });
}

module.exports = {
    getAllUsers:getAllUsers,
    addNewUser: addNewUser,
    getHash: getHash,
    authenticateUser: authenticateUser,
    setToken:setToken,
    getToken:getToken,
    removeToken: removeToken,
    getIdFormToken:getIdFormToken,
}