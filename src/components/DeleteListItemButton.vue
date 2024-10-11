<script setup lang="ts">
import {useListStore} from '../store/list.ts';

interface Props {
  item_id: number
}

const props = defineProps<Props>();
const listStore = useListStore();
</script>

<template>
  <button
      class="todo-list-remove"
      :id="`list-remove-button-${props.item_id}`"
      @click="listStore.deleteListItem(props.item_id)"
  >
    Remove
  </button>
</template>

<style scoped lang="scss">

</style>
