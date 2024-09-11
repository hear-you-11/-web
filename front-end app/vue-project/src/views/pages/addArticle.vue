<template>
  <div class="add-article-container">
    <h1 class="add-article-title">addArticle</h1>
    <form @submit.prevent="handleSubmit" class="add-article-form">
      <label for="title">Title: </label>
      <input name="title" v-model="title" />
      <div v-show="submitted && !title" class="validation-message">Title is required</div>
      <br /><br />

      <label for="author">Author: </label>
      <input name="author" v-model="author" />
      <div v-show="submitted && !author" class="validation-message">Author is required</div>
      <br /><br />

      <label for="article_text">Text: </label>
      <input type="article_text" v-model="article_text" />
      <div v-show="submitted && !article_text" class="validation-message">Text is required</div>
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
      const { title, author, article_text } = this;

      articleService
        .addArticle(this.title, this.author, this.article_text)
        .then((result) => {
          console.log("Auth - go to dash");
          this.$router.push("/dashboard");
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
.add-article-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

.add-article-title {
  color: #4285f4;
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
}

.add-article-form {
  text-align: left;
}

.validation-message {
  color: #e91e63;
  font-size: 14px;
  margin-top: 5px;
}

.submit-button {
  background-color: #4285f4;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
}

.error-message {
  color: #d50000;
  font-weight: bold;
  margin-top: 10px;
}
</style>
