const db = require("../../database")

const getAllComments = (article_id,done)=>{
    const sql = 'SELECT * FROM comments WHERE article_id=?'
    const value = article_id
    const errors=[]
    const results=[]
    db.each(sql,[value],
        (err,row)=>{
            if(err) errors.push(err)
            results.push({
                comment_id:row.comment_id,
                comment_text:row.comment_text,
                date_published:new Date(row.date_published).toLocaleDateString(),
                article_id:article_id
                })
        },
        (err,num_rows)=>{
            return done(err,num_rows,results)
        }
        )

}

const addNewComment = (article_id,comment,done)=>{
    const sql = 'INSERT INTO comments (comment_text,date_published,article_id) VALUES (?,?,?)';
    const values=[comment,Date.now(),article_id];
    db.run(sql,values,(err)=>{
        if(err) return done(err)
        return done(null)
    })
}

const deleteCommentbyid = (comment_id,done)=>{
    console.log(comment_id);
    db.run('DELETE FROM comments WHERE comment_id=?',comment_id,
    (err)=>{ 
        if(err) {
            console.log(err)
            return done(404)}
        return done(null)
        }
    )
}

const getOneComment=(comment_id,done)=>{
    db.get('SELECT * FROM comments WHERE comment_id=?',comment_id,
    (err,row)=>{
        if(err) return done(500)
        if(!row) return done(404)
        return done(null)
    })
}

module.exports={
    getAllComments:getAllComments,
    addNewComment:addNewComment,
    deleteCommentbyid:deleteCommentbyid,
    getOneComment:getOneComment
}