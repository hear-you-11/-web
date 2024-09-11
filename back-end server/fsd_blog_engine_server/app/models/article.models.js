const sqlite3 = require("sqlite3").verbose();
const { func } = require("joi");
const db = require("../../database")

const getAllArticles=(done)=>{
    const sql='SELECT * FROM articles'
    const errors = []
    const results=[]
    db.each(
        sql,
        [],
        (err,row)=>{
            if(err) errors.push(err)
            results.push({
                article_id:row.article_id,
                title:row.title,
                author:row.author,
                date_published:new Date(row.date_published).toLocaleDateString(),
                date_edited:new Date(row.date_edited).toLocaleDateString(),
                article_text:row.article_text
                })
        },
        (err,num_rows)=>{
            return done(err,num_rows,results)
        }
    )
}
const addNewArticle =(article,done)=>{
    let date = Date.now();
    const sql='INSERT INTO articles(title,author,date_published,date_edited,article_text,created_by) VALUES(?,?,?,?,?,?)';
    let values = [article.title, article.author, date,date,article.article_text,1];

    db.run(
        sql,
        values,
        function(err){
            if(err) return done(err, null);
            return done(null , this.lastID);
        }
    )
}
const getSingleArticle = (id,done)=>{
    const sql = 'SELECT * FROM articles WHERE article_id=?'
    db.get(sql,[id],(err,row)=>{
        if(err) return done(err)
        if(!row) return done(404)

        return done(null,{
            article_id:row.article_id,
            title:row.title,
            author:row.author,
            date_published:new Date(row.date_published).toLocaleDateString(),
            date_edited:new Date(row.date_edited).toLocaleDateString(),
            article_text:row.article_text
        })
    })
}

const updateArticle = (id, article, done)=>{
    const sql = 'UPDATE articles SET title=?, author=?, article_text=? WHERE article_id=?'
    let values = [article.title, article.author, article.article_text, id];

    db.run(sql,values,(err)=>{
        if (err) return done(err,null)
        return done(null,id)
    })
}

const deleteArticebyid=(id,done)=>{
    db.run('DELETE FROM articles WHERE article_id=?',[id],
    function (err) {
        if (err) {
            console.error(err.message);
            return done(err);
        }
        console.log(`Article with ID ${id} deleted successfully!`);
        return done(null);
    }
    )
}

module.exports = {
    getAllArticles: getAllArticles,
    addNewArticle: addNewArticle,
    getSingleArticle:getSingleArticle,
    updateArticle: updateArticle,
    deleteArticebyid:deleteArticebyid,

}