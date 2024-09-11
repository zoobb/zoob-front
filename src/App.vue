<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const data = ref();
const error = ref();

const fetchData = async () => {
  try {
    const res = await axios.get(`https://${document.location.hostname}:8247`);
    data.value = res.data;
  } catch (err) {
    error.value = `There was a problem fetching data: ${err}`;
  }
};
</script>

<template>
  <div class="main">
    <h1>Input your text</h1>
    <input class="your-text" type="text">
    <button class="random-number" type="button" @click="fetchData">
      Get random number
    </button>
    <span v-if="data"></span>
  </div>
</template>

<style scoped lang="scss">
.main {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}
.your-text {
  height: 2rem;
  font-size: 1.2rem;
}
</style>
