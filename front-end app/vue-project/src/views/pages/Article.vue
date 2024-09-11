<template>
    <div class="article-detail-container">
      <h1>{{ article.title }}</h1>
      <h2>{{ 'Written By ' + article.author }}</h2>
      <p>{{ 'Published: ' + article.date_published }}</p>
      <p>{{ article.article_text }}</p>
      <h2>Comments ({{ num_comments }})</h2>
      <ul>
        <li v-for="comment in comments" :key="comment.comment_id" class="comment-item">
          {{ comment.comment_text }} - {{ comment.date_published }}
          <button @click="deleteComment(comment.comment_id)" class="delete-button">Delete</button>
        </li>
      </ul>
      <label for="comment">Add a Comment</label>
      <br>
      <textarea v-model="comment" id="comment" class="comment-input"></textarea>
      <br>
      <button @click="addComment" class="submit-button">Submit Comment</button>
    </div>
  </template>
  
  <script>
  import { articleService } from "../../services/article.service";
  import { commentsService } from "../../services/comments.service";
  
  export default {
    data() {
      return {
        article: {},
        comments: [],
        num_comments: null,
        comment: "",
        error: "",
      };
    },
    methods: {
      addComment() {
        commentsService
          .addComment(this.article.article_id, this.comment)
          .then(() => {
            location.reload();
          })
          .catch((error) => {
            console.error('Submit error:', error);
          });
      },
      deleteComment(commentId) {
        console.log(commentId);
        commentsService
          .deleteComment(commentId)
          .then(() => {
            location.reload();
          })
          .catch((error) => {
            console.error('Error deleting comment:', error);
          });
      },
    },
    created() {
      this.article.loading = true;
      this.comments.loading = true;
  
      articleService
        .getOne(this.$route.params.id)
        .then((article) => {
          this.article = article;
          commentsService
            .getAll(this.$route.params.id)
            .then((comments) => {
              this.comments = comments;
              this.num_comments = comments.length;
            })
            .catch((error) => (this.error = error));
        })
        .catch((error) => (this.error = error));
    },
  };
  </script>
  
  <style scoped>
  .article-detail-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
  }
  
  h1 {
    color: #4285f4;
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  h2 {
    color: #333;
    font-size: 18px;
    margin-bottom: 5px;
  }
  
  p {
    color: #555;
    font-size: 16px;
    margin-bottom: 10px;
  }
  
  .comment-item {
    margin-bottom: 10px;
  }
  
  .delete-button {
    background-color: #e91e63;
    color: #fff;
    padding: 5px 10px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    margin-left: 10px;
  }
  
  .comment-input {
    width: 100%;
    padding: 5px;
    margin-bottom: 10px;
  }
  
  .submit-button {
    background-color: #4285f4;
    color: #fff;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>
  