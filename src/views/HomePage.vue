<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const fetchedData = ref();
const fetchedError = ref();
const dataToSend = ref();

const fetchData = async () => {
  try {
    const res = await axios.post(`http://${document.location.hostname}:8247/ping`, {
        user_data: dataToSend.value
    });
    fetchedData.value = res.data;
  } catch (err) {
    fetchedError.value = `There was a problem fetching data: ${err}`;
  }
};
</script>

<template>
  <div class="main">
    <h1>Input your text</h1>
    <input class="your-text" type="text" v-model="dataToSend">
    <button class="random-number" type="button" @click="fetchData">
      Get random number
    </button>
    <span v-if="fetchedData">Fetched data: {{ fetchedData }}</span>
    <span>Data to send: {{ dataToSend }}</span>
    <button>
      <router-link to="/todo">Todo List</router-link>
    </button>
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
