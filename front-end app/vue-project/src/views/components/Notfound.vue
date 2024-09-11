<template>
  <div class="not-found-container">
    <h1 class="not-found-title">404 Not Found</h1>
    <p class="not-found-text">Oops! The page you're looking for does not exist.</p>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped>
.not-found-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  text-align: center;
}

.not-found-title {
  color: #e91e63; /* Pink color */
  font-size: 24px;
  margin-bottom: 20px;
}

.not-found-text {
  color: #333;
  font-size: 16px;
}
</style>
