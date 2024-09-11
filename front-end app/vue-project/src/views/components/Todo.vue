<template>
  <div>
    <h1>Todo List</h1>
    <form @submit.prevent="handleSubmit">
      <label for="todoItem">Todo Item: </label>
      <input type="text" name="todoItem" v-model="newItem" />
      <div v-show="submitted && !newItem">Todo item is required</div>
      <br /><br />

      <button>Add Todo</button>
    </form>

    <ul>
      <li v-for="(item, index) in todoList" :key="index">
        {{ item }}
        <button @click="deleteItem(index)">Delete</button>
        <button @click="editItem(index)">Edit</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newItem: "",
      todoList: [],
      submitted: false,
    };
  },
  methods: {
    handleSubmit() {
      this.submitted = true;
      if (!this.newItem.trim()) {
        return;
      }

      this.todoList.push(this.newItem);
      this.newItem = ""; // Clear the input field
    },
    deleteItem(index) {
      this.todoList.splice(index, 1);
    },
    editItem(index) {
      // Implement edit functionality if needed
    },
  },
};
</script>

<style scoped>
/* Your component styles go here */
</style>
