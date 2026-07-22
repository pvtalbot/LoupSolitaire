<script setup lang="ts">
defineProps<{
    user: {id: number; username: string};
}>();

const emit = defineEmits<{
    (e: "logout"): void;
}>();
</script>

<template>
    <div class="card">
        <h2>Bienvenue, {{ user.username }}</h2>
        <p>Prêt à commencer ton aventure dans le Sommerlund ?</p>
        <button class="btn-secondary" @click="emit('logout')">Déconnexion</button>
    </div>
</template>

<style scoped>
.card {
    background: #242424;
    padding: 24px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    color: #fff
}

button {
    cursor: pointer;
    border: none;
    border-radius: 4px;
    padding: 10px 16px;
    font-weight: bold;
}

.btn-secondary {
    background: #dc2626;
    color: white;
    margin-top: 12px;
}

.btn-secondary:hover {
    background: #b91c1c
}
</style>
