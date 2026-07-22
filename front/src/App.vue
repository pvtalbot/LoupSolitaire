<script setup lang="ts">
import { onMounted, ref } from "vue";
import UserProfile from "./components/UserProfile.vue";
import AuthForm from "./components/AuthForm.vue";

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
  <main class="container">
    <h1>Loup Solitaire</h1>

    <UserProfile
      v-if="currentUser"
      :user="currentUser"
      @logout="handleLogout"/>

    <AuthForm
      v-else
      @success="handleAuthSuccess"
    />
  </main>
</template>

<style scoped>
.container {
  max-width: 400px;
  margin: 60px auto;
  font-family: system-ui, -apple-system, sans-serif;
  text-align: center;
}
</style>
