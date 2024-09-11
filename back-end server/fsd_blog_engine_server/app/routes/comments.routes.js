const comments=require('../controllers/comments.controller')
const auth=require('../libs/middleware')

module.exports=function(app){
    app.route('/articles/:article_id/comments')
        .get(comments.getAll)
    app.route('/articles/:article_id/comments')
        .post(comments.create)
    app.route('/comments/:comment_id')
        .delete(auth.isAuthenticated,comments.Delete)
}