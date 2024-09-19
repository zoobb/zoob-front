<script setup lang="ts">
import { ref } from 'vue'
import axios from "axios";

type ListItem = {
  item_id: number;
  content: string;
}

type TodoList = {
  Items: ListItem[]
}

const todoList = ref<TodoList>({
  Items: [],
});
const newListItem = ref<String>("");

const sendListItem = async () => {
  try {
    const res = await axios.post(`http://${document.location.hostname}:8247/list`, {
      user_data: newListItem.value
    });
    // console.log(newListItem.value);
    todoList.value = await getWholeList()
    console.log(todoList.value)
  } catch (err) {
    console.log(`There was a problem fetching data: ${err}`);
  }
};
const getWholeList = async () => {
  try {
    const res = await axios.get(`http://${document.location.hostname}:8247/list`)
    return res.data;
  } catch (err) {
    console.log(`There was a problem fetching data: ${err}`);
  }
}
</script>

<template>
  <button>
    <router-link to="/">
      Home
    </router-link>
  </button>
  <div class="todo">
    <h1 class="todo-header">
      Todo List
    </h1>
    <div class="todo-input">
      <input type="text" v-model="newListItem">
      <button type="submit" @click="sendListItem">Add to list</button>
    </div>
    <div class="todo-list">
      <div v-for="(item, index) in todoList.Items" :key="item.item_id">
        <span class="todo-list-item">{{ item.item_id }}: {{ item.content }}</span>
        <button class="todo-list-remove">Remove</button>
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
