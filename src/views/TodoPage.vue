<script setup lang="ts">
import {onMounted} from 'vue';
import {useListStore} from '../store/list.ts';
import {animateListEnter, animateListLeave} from '../components/animations.ts';
import ListHeader from '../components/ListHeader.vue';
import HomeButton from '../components/HomeButton.vue';
import DeleteListItemButton from '../components/DeleteListItemButton.vue';

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
      <input
          type="text"
          v-model="listStore.newListItem"
          @keyup.enter="listStore.addListItem(listStore.newListItem)"
      >
      <button
          type="submit"
          @click="listStore.addListItem(listStore.newListItem)"
      >
        Add to list
      </button>
      <button @click="listStore.deleteList">Delete</button>
    </div>
      <div class="todo-list">
        <transition-group
            tag="div"
            :css="false"
            @enter="animateListEnter"
            @leave="animateListLeave"
        >
        <div
            class="todo-list-item"
            v-for="(item, index) in listStore.list.Items"
            :key="item.item_id"
            ref="todoItems"
        >
          <div :id="`todo-list-item-content-${item.item_id}`">
            <span
                v-if="listStore.bufferID !== item.item_id"
                class="todo-list-item-content"
                @click="listStore.editBuffer(item.item_id, item.content)"
            >
              {{ index + 1 }}: {{ item.content }}
            </span>
            <input
                v-else
                v-model="listStore.bufferContent"
                @blur="listStore.updateListItem(item.item_id, listStore.bufferContent)"
                @keyup.enter="listStore.updateListItem(item.item_id, listStore.bufferContent)"
                type="text"
            />
          </div>
          <div class="todo-list-item-buttons">
            <delete-list-item-button
                :item_id="item.item_id"
            />
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
