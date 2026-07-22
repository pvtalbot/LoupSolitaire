<script setup lang="ts">
import { onMounted, ref } from "vue";
import DashboardView from "./views/DashboardView.vue";
import LoggedOutView from "./views/LoggedOutView.vue";

const currentUser = ref<{ id: number; username: string } | null>(null);

onMounted(() => {
  const savedToken = localStorage.getItem("token");
  const savedUsername = localStorage.getItem("username");

  if (savedToken && savedUsername) {
    currentUser.value = {id: 0, username: savedUsername}

  }
})

const handleAuthSuccess = (user: {id: number; username: string }, token: string) => {
  localStorage.setItem("token", token);
  localStorage.setItem("username", user.username);
  currentUser.value = user;
}

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  currentUser.value = null;
};
</script>

<template>
  <main class="app-layout">
    <header>
      <h1>Loup Solitaire</h1>
    </header>

    <DashboardView
      v-if="currentUser"
      :user="currentUser"
      @logout="handleLogout"/>

    <LoggedOutView
      v-else
      @login-success="handleAuthSuccess"
    />
  </main>
</template>

<style scoped>
.app-layout {
  max-width: 400px;
  margin: 40px auto;
  font-family: system-ui, -apple-system, sans-serif;
  text-align: center;
  padding: 0 16px;
}

header h1 {
  font-size: 2rem;
  margin-bottom: 24px;
  color: #f3f4f6;
}
</style>
