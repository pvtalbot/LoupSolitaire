<script setup lang="ts">
import AuthForm from '../components/AuthForm.vue';

const emit = defineEmits<{
    (e: 'login-success', user: {id: number, username: string}, token: string): void;
}>();

const onSuccess = (user: { id: number; username: string }, token: string) => {
    emit('login-success', user, token)
}

</script>

<template>
    <div class="logged-out-view">
        <p class="welcome-text">Inscrivez votre nom dans le grand livre des héros Kaï !</p>
        <AuthForm @login-success="onSuccess"/>
    </div>
</template>

<style scoped>
.logged-out-view {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.welcome-text {
    color: #aaa;
    font-style: italic;
    margin-bottom: 8px;
}
</style>
