<template>
  <div>
    <nav class="navigation">
      <router-link to="/" class="nav-link home-link">Home</router-link>
      <router-link to="/login" class="nav-link login-link">Login</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style scoped>
  .navigation {
    background-color: #4285f4;
    padding: 10px;
    text-align: center;
  }

  .nav-link {
    color: #fff;
    text-decoration: none;
    margin: 0 10px;
    font-size: 16px;
    padding: 8px 16px;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }

  .home-link {
    background-color: #4caf50; /* Green color */
  }

  .login-link {
    background-color: #e91e63; /* Pink color */
  }

  .nav-link:hover {
    background-color: #333; /* Darker color on hover */
  }
</style>
