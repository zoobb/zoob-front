<script setup lang="ts">
import { ref } from 'vue'

const todoList = ref([]);
const newListItem = ref("");

const addToList = (listItem) => {
  todoList.value.push(listItem);
};
const removeFromList = () => {
  todoList.value.pop()
}
</script>

<template>
  <button>
    <router-link to="/">
      Home
    </router-link>
  </button>
  <div class="todo">
    <div class="todo-input">
      <input type="text" v-model="newListItem">
      <button type="submit" @click="addToList(newListItem)">Add to list</button>
    </div>
    <div class="todo-list">
      <div v-for="(item, index) in todoList" key="index">
        <span class="todo-list-item">{{ index + 1 }}: {{ item }}</span>
        <button class="todo-list-remove" @click="removeFromList">Remove</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.todo {
  display: flex;
  flex-direction: column;
  margin: 1rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
}
.todo-input {
  display: flex;
  gap: 0.5rem;
  margin: 0.2rem;
  padding: 0.2rem;
}
.todo-list {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  gap: 0.5rem;
}
.todo-list-item {
}
</style>
