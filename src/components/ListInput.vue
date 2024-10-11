<script setup lang="ts">
import {useListStore} from '../store/list.ts';

const listStore = useListStore();
</script>

<template>
  <input
      type="text"
      v-model="listStore.newListItem"
      @keyup.enter="listStore.addListItem(listStore.newListItem)"
  >
</template>

<style scoped lang="scss">

</style>
