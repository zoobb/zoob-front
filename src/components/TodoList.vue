<script setup lang="ts">

import ListItems from './ListItems.vue';
</script>

<template>
  <div class="todo-list">
    <list-items/>
  </div>
</template>

<style scoped lang="scss">
.todo-list {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  gap: 0.5rem;
}
</style>
