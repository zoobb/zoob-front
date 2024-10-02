<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from "axios";
import { gsap } from "gsap";

type ListItem = {
  item_id: number;
  content: string;
};

type TodoList = {
  Items: ListItem[]
};

const todoList = ref<TodoList>({
  Items: [],
});
const todoItems = ref([]);
const newListItem = ref<string>("");

const bufferID = ref<number | null>(null);
const bufferContent = ref<string>();

const editItem = (id: number, content: string) => {
  bufferID.value = id;
  bufferContent.value = content;
};

const addListItem = async () => {
  try {
    await axios.post(`http://${document.location.hostname}:8247/list`, {
      user_data: newListItem.value,
    });
    await updateList();
    console.log(todoList.value);
  } catch (err) {
    console.log(`There was a problem fetching data: ${err}`);
  }
};
const updateListItem = async (id: number, content: string | undefined) => {
  try {
    if (content) {
      await axios.put(`http://${document.location.hostname}:8247/list/${id}`, {
        user_data: content,
      });
    }
    await updateList();
  } catch (err) {
    console.log(`There was a problem fetching data: ${err}`);
  } finally {
    bufferID.value = null;
    bufferContent.value = "";
  }
};
const getList = async () => {
  try {
    const res = await axios.get(`http://${document.location.hostname}:8247/list`);
    return res.data;
  } catch (err) {
    console.log(`There was a problem fetching data: ${err}`);
  }
};
const deleteList = async () => {
  try {
    await axios.delete(`http://${document.location.hostname}:8247/list`);
    await updateList();
  } catch (err) {
    console.log(`There was a problem fetching data: ${err}`);
  }
};
const deleteListItem = async (id: number) => {
  try {
    await axios.delete(`http://${document.location.hostname}:8247/list/${id}`);
    await updateList();
  } catch (err) {
    console.log(`There was a problem fetching data: ${err}`);
  }
};
const updateList = async () => {
  todoList.value.Items = await getList();
};

/*const animateListBeforeEnter = (el) => {
  gsap.set(el, {
    opacity: 0,
  })
};*/
const animateListEnter = (el, done) => {
  gsap.from(el, {
    height: 0,
    opacity: 0,
    duration: 0.5,
    ease: 'power3.inOut',
    onComplete: done,
  });
};
const animateListLeave = (el, done) => {
  gsap.to(el, {
    height: 0,
    opacity: 0,
    duration: 0.5,
    ease: 'power3.inOut',
    onComplete: done,
  });
};

onMounted(() => {
  updateList();
});
</script>

<template>
  <button>
    <router-link to="/">
      Home
    </router-link>
  </button>
  <div class="todo">
    <h1 class="todo-header">
      Zoob List
    </h1>
    <div class="todo-input">
      <input type="text" v-model="newListItem" @keyup.enter="addListItem">
      <button type="submit" @click="addListItem">Add to list</button>
      <button @click="deleteList">Delete</button>
    </div>
      <div class="todo-list">
        <transition-group tag="div" :css="false" @enter="animateListEnter" @leave="animateListLeave">
        <div class="todo-list-item" v-for="(item, index) in todoList.Items" :key="item.item_id" ref="todoItems">
          <div :id="`todo-list-item-content-${item.item_id}`">
            <span v-if="bufferID !== item.item_id" class="todo-list-item-content"
                  @click="editItem(item.item_id, item.content)">{{ index + 1 }}: {{ item.content }}</span>
            <input v-else v-model="bufferContent" @blur="updateListItem(item.item_id, bufferContent)" @keyup.enter="updateListItem(item.item_id, bufferContent)" type="text"/>
          </div>
          <div class="todo-list-item-buttons">
            <button class="todo-list-remove" :id="`list-remove-button-${item.item_id}`"
                    @click="deleteListItem(item.item_id)">Remove
            </button>
          </div>
        </div>
        </transition-group>
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
