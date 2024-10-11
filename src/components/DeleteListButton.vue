<script setup lang="ts">
import {useListStore} from '../store/list.ts';

const listStore = useListStore();
</script>

<template>
  <button @click="listStore.deleteList">Delete</button>
</template>

<style scoped lang="scss">

</style>
