<script setup lang="ts">
import AuthForm from '../components/AuthForm.vue';
</script>

<template>
    <div class="logged-out-view">
        <p class="welcome-text">Inscrivez votre nom dans le grand livre des héros Kaï !</p>
        <AuthForm/>
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
