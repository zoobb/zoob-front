<script setup lang="ts">
import ListItemContent from './ListItemContent.vue';
import ListItemButtons from './ListItemButtons.vue';
import {useListStore} from '../store/list.ts';
import {animateListEnter, animateListLeave} from './animations.ts';

const listStore = useListStore();
</script>

<template>
  <transition-group
      tag="div"
      :css="false"
      @enter="animateListEnter"
      @leave="animateListLeave"
  >
    <div
        class="todo-list-item"
        v-for="item in listStore.list.Items"
        :key="item.item_id"
        ref="todoItems"
    >
      <list-item-content
          :content="item.content"
          :item_id="item.item_id"
      />
      <list-item-buttons
          :item_id="item.item_id"
      />
    </div>
  </transition-group>
</template>

<style scoped lang="scss">
.todo-list-item {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}
</style>
