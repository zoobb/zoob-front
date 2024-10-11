<script setup lang="ts">
import DeleteListItemButton from './DeleteListItemButton.vue';

interface Props {
  item_id: number,
}

const props = defineProps<Props>();
</script>

<template>
  <div class="todo-list-item-buttons">
    <delete-list-item-button
        :item_id="props.item_id"
    />
  </div>
</template>

<style scoped lang="scss">

</style>
