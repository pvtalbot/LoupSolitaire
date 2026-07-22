<script setup lang="ts">
import UserProfile from '../components/UserProfile.vue';
import { useUserStore } from '../stores/userStore.ts';

const userStore = useUserStore()

const emit = defineEmits<{
    'logout': [];
}>();
</script>

<template>
    <div class="dashboard-view">
        <UserProfile v-if="userStore.user" :user="userStore.user" @logout="emit('logout')"/>

        <div class="adventure-placeholder">
            <p>Livre 1</p>
        </div>
    </div>
</template>

<style scoped>
.dashboard-view {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.adventure-placeholder {
    background: #1e1e1e;
    border: 1px dashed #444;
    padding: 20px;
    border-radius: 8px;
    color: #888;
}
</style>
