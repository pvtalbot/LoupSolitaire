<script setup lang="ts">
import UserProfile from '../components/UserProfile.vue';

defineProps<{
    user: {id: number; username: string };
}>();

const emit = defineEmits<{
    (e: 'logout'): VideoDecoder;
}>();
</script>

<template>
    <div class="dashboard-view">
        <UserProfile :user="user" @logout="emit('logout')"/>

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
