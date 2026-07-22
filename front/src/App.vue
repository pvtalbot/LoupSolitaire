<script setup lang="ts">
import DashboardView from "./views/DashboardView.vue";
import LoggedOutView from "./views/LoggedOutView.vue";
import type { User } from "./types/user.ts";
import { useUserStore } from "./stores/userStore.ts";

const userStore = useUserStore();

const handleAuthSuccess = (user: User, token: string) => {
  userStore.setAuth(user, token)
}
</script>

<template>
  <main class="app-layout">
    <header>
      <h1>Loup Solitaire</h1>
    </header>

    <DashboardView
      v-if="userStore.isAuthenticated"
      @logout="userStore.logout"/>

    <LoggedOutView
      v-else
      @login-success="handleAuthSuccess"
    />
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
