<template>
    <div class="all-users-container">
      <h1 class="all-users-title">All users</h1>
  
      <em v-if="loading" class="loading-message">Loading users...</em>
  
      <ul v-if="users.length" class="user-list">
        <li v-for="user in users" :key="user.user_id" class="user-item">
          <div>
            {{ "User ID: " + user.user_id }}<br />
            {{ "Firstname: " + user.first_name }}<br />
            {{ "Lastname: " + user.last_name }}
          </div>
        </li>
      </ul>
  
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
    </div>
  </template>
  
  <script>
  import { usersService } from "../../services/users.service";
  
  export default {
    data() {
      return {
        users: [],
        error: "",
        loading: true,
      };
    },
    mounted() {
      usersService
        .getAll()
        .then((users) => {
          this.users = users;
          this.loading = false;
        })
        .catch((error) => (this.error = error));
    },
  };
  </script>
  
  <style scoped>
  .all-users-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
  }
  
  .all-users-title {
    color: #4285f4;
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .loading-message {
    color: #9e9e9e;
    font-style: italic;
  }
  
  .user-list {
    list-style: none;
    padding: 0;
  }
  
  .user-item {
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  
  .error-message {
    color: #d50000;
    font-weight: bold;
    margin-top: 10px;
  }
  </style>
  