<script setup lang="ts">
import { ref } from "vue";

const message = ref("Le monastère Kai est calme.");
</script>

<template>
  <div class="test-zone">
    <h1>Loup Solitaire</h1>
    <p>{{ message }}</p>

    <button @click="message = 'L\'aventure commence enfin !'">
      Commencer
    </button>
  </div>
</template>

<style scoped>
.test_zone {
  font-family: sans-serif;
  padding: 40px;
  text-align: center;
  background: #111;
  color: #fff;
  min-height: 100vh;
}
button {
  padding: 10px 20px;
  background: #ff4500;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}
</style>
