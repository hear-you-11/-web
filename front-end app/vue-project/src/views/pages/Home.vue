<template>
  <div class="blog-container">
    <h1 class="blog-title">Welcome to my blog!</h1>

    <em v-if="loading" class="loading-message">Loading articles...</em>

    <ul v-if="articles.length" class="article-list">
      <li v-for="article in articles" :key="article.article_id" class="article-item">
        <router-link :to="'/article/' + article.article_id" class="article-link">
          {{ article.title + ' by ' + article.author }}
        </router-link>
        <button @click="PatchArticle(article.article_id)" class="action-button">Patch</button>
        <button @click="DeleteArticle(article.article_id)" class="action-button">Delete</button>
      </li>
    </ul>

    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<script>
import { articleService } from "../../services/article.service";

export default {
  data() {
    return {
      articles: [],
      error: "",
      loading: true,
    };
  },
  methods: {
    PatchArticle(id) {
      localStorage.setItem("id", id);
      if (localStorage.getItem("role") === "admin") {
      this.$router.push("/patchArticle");}
      else alert("Admin did't login,can't delete or patch articles")
    },

    DeleteArticle(id) {
      if (localStorage.getItem("role") === "admin") {
        articleService
          .deleteArticle(id)
          .then(() => {
            location.reload();
          })
          .catch((error) => {
            this.error = error;
            this.loading = false;
          });
      }
      else alert("Admin did't login,can't delete or patch articles")
    },
  },
  mounted() {
    articleService
      .getAll()
      .then((articles) => {
        this.articles = articles;
        this.loading = false;
      })
      .catch((error) => (this.error = error));
  },
};
</script>

<style scoped>
.blog-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

.blog-title {
  color: #4285f4;
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.loading-message {
  font-style: italic;
  color: #555;
}

.article-list {
  padding: 0;
}

.article-item {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.article-link {
  text-decoration: none;
  color: #4285f4;
  display: block;
  margin-bottom: 10px;
}

.action-button {
  background-color: #4285f4;
  color: #fff;
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  margin-right: 5px;
  transition: background-color 0.3s ease;
}

.action-button:hover {
  background-color: #333;
}

.error-message {
  color: #d50000;
  font-weight: bold;
  margin-top: 20px;
}
</style>
