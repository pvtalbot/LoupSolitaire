<script setup lang="ts">
</script>

<template>
  <main class="app-layout">
    <header>
      <h1>Loup Solitaire</h1>
    </header>

    <router-view/>

  </main>
</template>

<style scoped>
.app-layout {
  max-width: 800px;
  margin: 40px auto;
  font-family: system-ui, -apple-system, sans-serif;
  text-align: center;
  padding: 0 16px;
}

header h1 {
  font-size: 2rem;
  margin-bottom: 24px;
  color: #f59e0b;
  margin: 0 24px;
}
</style>
