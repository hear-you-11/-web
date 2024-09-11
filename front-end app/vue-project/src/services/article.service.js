const getAll=()=>{
    return fetch("http://localhost:3333/articles")
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

const getOne=(article_id)=>{
    return fetch(`http://localhost:3333/articles/${article_id}`)
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

const addArticle = (title,author,text) => {
    const token = localStorage.getItem("session_token");
    return fetch("http://localhost:3333/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'X-Authorization': `${token}`
      },
      body: JSON.stringify({
        title: title,
        author: author,
        article_text: text
      }),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else {
          throw "Something went wrong";
        }
      })
      .then((resJson) => {
        return resJson;
      })
      .catch((error) => {
        console.log("Err", error);
        return Promise.reject(error);
      });
  };

  const patchArticle = (article_id, title,author,text) => {
    console.log(article_id, title,author,text)
    const token = localStorage.getItem("session_token");
    return fetch(`http://localhost:3333/articles/${article_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        'X-Authorization': `${token}`
      },
      body: JSON.stringify({
        title: title,
        author: author,
        article_text: text
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw "Something went wrong";
        }
      })
      .then((resJson) => {
        return resJson;
      })
      .catch((error) => {
        console.log("Err", error);
        return Promise.reject(error);
      });
  };

  const deleteArticle = (article_id) => {
    const token = localStorage.getItem("session_token");
    return fetch(`http://localhost:3333/articles/${article_id}`, {
      method: "DELETE",
      headers: {
        'X-Authorization': `${token}`
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return;
        } else {
          throw "Something went wrong";
        }
      })
      .catch((error) => {
        console.log("Err", error);
        return Promise.reject(error);
      });
  };
  
  export const articleService = {
    getAll,
    getOne,
    addArticle,
    patchArticle,
    deleteArticle,
  };
  