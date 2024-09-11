<template>
    <div class="add-user-container">
      <h1 class="add-user-title">addUser</h1>
      <form @submit.prevent="handleSubmit" class="add-user-form">
        <label for="first_name">Firstname: </label>
        <input name="first_name" v-model="first_name" />
        <div v-show="submitted && !first_name" class="validation-message">Firstname is required</div>
        <br /><br />
  
        <label for="last_name">Lastname: </label>
        <input name="last_name" v-model="last_name" />
        <div v-show="submitted && !last_name" class="validation-message">Lastname is required</div>
        <br /><br />
  
        <label for="email">Email: </label>
        <input type="email" name="email" v-model="email" />
        <div v-show="submitted && !email" class="validation-message">Email is required</div>
        <br /><br />
  
        <label for="password">Password: </label>
        <input type="password" name="password" v-model="password" />
        <div v-show="submitted && !password" class="validation-message">Password is required</div>
        <br /><br />
  
        <button class="submit-button">Submit</button>
        <div v-if="error" class="error-message">{{ error }}</div>
      </form>
    </div>
  </template>
  
  <script>
  import EmailValidator from "email-validator";
  import { usersService } from "../../services/users.service";
  
  export default {
    data() {
      return {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        submitted: false,
        error: "",
      };
    },
    methods: {
      handleSubmit() {
        this.submitted = true;
        this.error = "";
        const { first_name, last_name, email, password } = this;
  
        if (!(email && password)) {
          return;
        }
  
        if (!EmailValidator.validate(email)) {
          this.error = "Email must be a valid email.";
          return;
        }
  
        const password_pattern = /^(?=(.*[a-z]))(?=(.*[A-Z]))^/;
        if (!password_pattern.test(password)) {
          this.error = "Password not strong enough.";
          return;
        }
        usersService
          .addUser(this.first_name, this.last_name, this.email, this.password)
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
  .add-user-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
  }
  
  .add-user-title {
    color: #4285f4;
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .add-user-form {
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
  }
  
  .error-message {
    color: #d50000;
    font-weight: bold;
    margin-top: 10px;
  }
  </style>
  