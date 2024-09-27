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

const addListItem = async () => {
  try {
    const res = await axios.post(`http://${document.location.hostname}:8247/list`, {
      user_data: newListItem.value,
    });
    // console.log(newListItem.value);
    await updateList();
    console.log(todoList.value);
  } catch (err) {
    console.log(`There was a problem fetching data: ${err}`);
  }
};
const getList = async () => {
  try {
    const res = await axios.get(`http://${document.location.hostname}:8247/list`);
    return res.data;
  } catch (err) {
    console.log(`There was a problem fetching data: ${err}`);
  }
}
const deleteList = async () => {
  try {
    const res = await axios.delete(`http://${document.location.hostname}:8247/list`);
    await updateList();
  } catch (err) {
    console.log(`There was a problem fetching data: ${err}`);
  }
}
const deleteListItem = async (id: number) => {
  try {
    const res = await axios.delete(`http://${document.location.hostname}:8247/list/${id}`);
    await updateList();
  } catch (err) {
    console.log(`There was a problem fetching data: ${err}`);
  }
}
const updateList = async () => {
  todoList.value.Items = await getList()
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
      <button type="submit" @click="addListItem">Add to list</button>
      <button @click="deleteList">Delete</button>
    </div>
    <div class="todo-list">
      <div class="todo-list-item" v-for="(item, index) in todoList.Items" :key="index">
        <span class="todo-list-item-content">{{ index + 1 }}: {{ item.content }}</span>
        <div class="todo-list-item-buttons">
          <button class="todo-list-remove" :id="`list-remove-button-${item.item_id}`"
                  @click="deleteListItem(item.item_id)">Remove
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
/** {
  border: 1px solid #ccc;
}*/

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
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}
.todo-list-item-content {
}
.todo-list-item-buttons {

}
</style>
