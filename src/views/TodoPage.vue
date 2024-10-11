<script setup lang="ts">
import {onMounted} from 'vue';
import {useListStore} from '../store/list.ts';
import ListHeader from '../components/ListHeader.vue';
import HomeButton from '../components/HomeButton.vue';
import DeleteListButton from '../components/DeleteListButton.vue';
import TodoList from '../components/TodoList.vue';
import AddToListButton from '../components/AddToListButton.vue';
import ListInput from '../components/ListInput.vue';

const listStore = useListStore();

onMounted(() => {
  listStore.updateList();
});
</script>

<template>
  <home-button/>
  <div class="todo">
    <list-header/>
    <div class="todo-input">
      <list-input/>
      <add-to-list-button/>
      <delete-list-button/>
    </div>
    <todo-list/>
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
