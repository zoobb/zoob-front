<script setup lang="ts">

import {useListStore} from '../store/list.ts';

interface Props {
  item_id: number,
  content: string
}

const props = defineProps<Props>();
const listStore = useListStore();
</script>

<template>
  <div :id="`todo-list-item-content-${props.item_id}`">
            <span
                v-if="listStore.bufferID !== props.item_id"
                class="todo-list-item-content"
                @click="listStore.editBuffer(props.item_id, props.content)"
            >
              {{ props.content }}
            </span>
    <input
        v-else
        v-model="listStore.bufferContent"
        @blur="listStore.updateListItem(props.item_id, listStore.bufferContent)"
        @keyup.enter="listStore.updateListItem(props.item_id, listStore.bufferContent)"
        type="text"
    />
  </div>
</template>

<style scoped lang="scss">

</style>
