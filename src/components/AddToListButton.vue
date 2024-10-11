<script setup lang="ts">
import {useListStore} from '../store/list.ts';

const listStore = useListStore();
</script>

<template>
  <button
      type="submit"
      @click="listStore.addListItem(listStore.newListItem)"
  >
    Add to list
  </button>
</template>

<style scoped lang="scss">

</style>
