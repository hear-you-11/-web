<template>
    <div class="patch-article-container">
      <h1 class="patch-article-title">PatchArticle</h1>
      <form @submit.prevent="handleSubmit" class="patch-article-form">
        <label for="title">Title: </label>
        <input name="title" v-model="title" />
        <br /><br />
  
        <label for="author">Author: </label>
        <input name="author" v-model="author" />
        <br /><br />
  
        <label for="article_text">Text: </label>
        <input type="article_text" v-model="article_text" />
        <br /><br />
        <button class="submit-button">Submit</button>
        <div v-if="error" class="error-message">{{ error }}</div>
      </form>
    </div>
  </template>
  
  <script>
  import { articleService } from "../../services/article.service";
  
  export default {
    data() {
      return {
        id: "",
        title: "",
        author: "",
        article_text: "",
        submitted: false,
        error: "",
      };
    },
    methods: {
      handleSubmit() {
        this.submitted = true;
        this.error = "";
        this.id = localStorage.getItem("id");
  
        articleService
          .patchArticle(this.id, this.title, this.author, this.article_text)
          .then((result) => {
            console.log("Auth - go to home");
            localStorage.removeItem("id");
            this.$router.push("/");
          })
          .catch((error) => {
            this.error = error;
            this.loading = false;
          });
      },
    },
  };
  </script>
  
  <style scoped>
.patch-article-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center items horizontally */
}

.patch-article-title {
  color: #4285f4;
  font-size: 24px;
  margin-bottom: 20px;
}

.patch-article-form {
  text-align: left;
  width: 100%; /* Ensure the form takes full width */
}

.submit-button {
  background-color: #4285f4;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  align-self: center; /* Center the button within its container */
  margin-top: 20px; /* Add some top margin for spacing */
}

.error-message {
  color: #d50000;
  font-weight: bold;
  margin-top: 10px;
}
</style>
