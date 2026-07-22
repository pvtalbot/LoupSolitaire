<script setup lang="ts">
import { computed, ref } from 'vue';
import type { User } from '../types/user';
import { apiFetch } from '../services/api';


const emit = defineEmits<{
    'login-success': [user: User, token: string];
}>();
const username = ref("");
const isRegisterMode = ref(false);
const errorMessage = ref("");

const title = computed(() => isRegisterMode.value ? 'Inscription' : 'Connexion');
const switchMessage = computed(() => isRegisterMode.value ? 'Déjà un compte ?' : 'Pas encore de héros ?');
const ctaMessage = computed(() => isRegisterMode.value ? "S'inscrire" : "Se connecter");
const reverseCTAMessage = computed(() => isRegisterMode.value ? "Se connecter" : "S'inscrire");

const onSubmit = async () => {
    errorMessage.value = "";

    if (!username.value.trim()) {
        errorMessage.value = "Le nom d'utilisateur ne peut pas être vide."
        return
    }

    const route = isRegisterMode.value ? '/users' : '/login';

    try {
        const data = await apiFetch<{user: User; token: string}>(route, {
            method: 'POST',
            body: JSON.stringify({ username: username.value }),
        });

        emit('login-success', data.user, data.token);
    } catch (err) {
        errorMessage.value = "Impossible de contacter le serveur.";
    };
}
</script>

<template>
    <div class="card">
        <h2>{{ title }}</h2>

        <form @submit.prevent="onSubmit">
            <div class="form-group">
                <label for="username">Nom d'utilisateur</label>
                <input
                    id="username"
                    v-model="username"
                    type="text"
                    placeholder="MaîtreKai"
                    autocomplete="off"
                />
            </div>

            <p v-if="errorMessage" class="error-msg">{{ errorMessage }}</p>

            <button type="submit" class="btn-primary">
                {{ ctaMessage }}
            </button>
        </form>

        <p class="switch-mode">
            {{ switchMessage }}
            <button class="btn-link" @click="isRegisterMode = !isRegisterMode; errorMessage = ''">
             {{ reverseCTAMessage }}
            </button>
        </p>
    </div>
</template>

<style scoped>
.card {
    background: #242424;
    padding: 24px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    color: #fff;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
    text-align: left;
    margin-bottom: 16px;
}

input {
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #444;
    background: #1A1A1A;
    color: #fff;
}

button {
    cursor: pointer;
    border: none;
    border-radius: 4px;
    padding: 10px 16px;
    font-weight: bold;
}

.btn-primary {
    width: 100%;
    background: #4f46e5;
    color: white;
}

.btn-primary:hover {
    background: #4338ca;
}

.btn-link {
    background: none;
    color: #f87171;
    padding: 0;
    text-decoration: underline;
}

.error-msg {
    color: #f87171;
    font-size: 0.9em;
    margin-bottom: 12px;
}

.switch-mode {
    font-size: 0.9em;
    color: #aaa;
}
</style>
