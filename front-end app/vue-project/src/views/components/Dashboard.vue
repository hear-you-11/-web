<template>
  <div class="dashboard-container">
    <h1 class="dashboard-title">Dashboard</h1>
    <p class="dashboard-text">This is the dashboard page.</p>
    <button @click="handleLogout" class="dashboard-button">Logout</button>
    <button @click="handlegetAllUsers" class="dashboard-button">Get All Users</button>
    <button @click="handleAddUser" class="dashboard-button">Add User</button>
    <button @click="handleAddArticle" class="dashboard-button">Add Article</button>
  </div>
</template>

<script>
import { usersService } from "../../services/users.service";

export default {
  methods: {
    handleLogout() {
      usersService
        .logOut()
        .then(() => {
          this.$router.push("/login");
        })
        .catch((error) => {
          console.error("Logout error:", error);
        });
    },

    handleAddUser() {
      if (localStorage.getItem("role") === "admin")
        this.$router.push("/addUser");
      else alert("Admin didn't login, can not create user.");
    },

    handlegetAllUsers() {
      if (localStorage.getItem("role") === "admin")
        this.$router.push("/allUsers");
      else alert("Admin didn't login, can not create user.");
    },

    handleAddArticle() {
      if (localStorage.getItem("role") === "admin")
        this.$router.push("/addArticle");
      else alert("Admin didn't login, can not create user.");
    },
  },
};
</script>

<style scoped>
.dashboard-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

.dashboard-title {
  color: #4285f4;
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.dashboard-text {
  color: #333;
  font-size: 16px;
  margin-bottom: 20px;
}

.dashboard-button {
  background-color: #4285f4;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
  transition: background-color 0.3s ease;
}

.dashboard-button:hover {
  background-color: #333;
}
</style>
