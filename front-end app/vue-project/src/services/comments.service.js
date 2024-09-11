const getAll=(article_id)=>{
    return fetch(`http://localhost:3333/articles/${article_id}/comments`)
    .then((response)=>{
        if(response.status===200){
            return response.json();
        }else{
            throw "Something went wrong"
        }
    })
    .then((resJson)=>{
        return resJson
    })
    .catch((error)=>{
        console.log("Err",error)
        return Promise.reject(error)
    })
}

const addComment = (article_id, comment) => {
    const token = localStorage.getItem("session_token");
  
    return fetch(`http://localhost:3333/articles/${article_id}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': `${token}`,
      },
      body: JSON.stringify({
        comment_text: comment,
      }),
    })
    .then(response => {
      if (response.status===201) {
        return response.json();
      }
      if (response.status===404) {
        alert("Your comment has sensitive words, submit failed.")
      }
      throw new Error(`Failed to add comment. Status: ${response.status}`);
    })
    .then(comment => {
      console.log('Comment added successfully:', comment);
      return comment;
    })
    .catch(error => {
      console.error('Error adding comment:', error.message);
      return Promise.reject(error);
    });
  };
  
const deleteComment = (comment_id) => {
    const token = localStorage.getItem("session_token");
    console.log(token,comment_id)
    return fetch(`http://localhost:3333/comments/${comment_id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': `${token}`,
        },
    })
    .then(response => {
        if (response.status === 200) {
            console.log('Comment deleted successfully');
            return;
        }
        throw new Error(`Failed to delete comment. Status: ${response.status}`);
    })
    .catch(error => {
        console.error('Error deleting comment:', error.message);
        return Promise.reject(error);
    });
};

export const commentsService ={
    getAll,
    addComment,
    deleteComment,
}