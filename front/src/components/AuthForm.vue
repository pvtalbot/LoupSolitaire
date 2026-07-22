<script setup lang="ts">
import { ref } from 'vue';


const emit = defineEmits<{
    (e: "success", user: { id: number, username: string }, token: string): void;
}>();
const username = ref("");
const isRegisterMode = ref(false);
const errorMessage = ref("");

const onSubmit = async () => {
    errorMessage.value = "";

    if (!username.value.trim()) {
        errorMessage.value = "Le nom d'utilisateur ne peut pas être vide."
        return
    }

    const route = isRegisterMode.value ? '/users' : '/login';

    try {
        const response = await fetch(`http://localhost:3000${route}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: username.value })
        })

        const data = await response.json();

        if (!response.ok) {
            errorMessage.value = data.error || "Une erreur est servenue.";
            return
        }

        emit("success", data.user, data.token);
        username.value = ""
    } catch (err) {
        errorMessage.value = "Impossible de contacter le serveur."
    }
}
</script>

<template>
    <div class="card">
        <h2>{{  isRegisterMode ? 'Inscription' : 'Connexion' }}</h2>

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
                {{ isRegisterMode ? "S'inscrire" : "Se connecter" }}
            </button>
        </form>

        <p class="switch-mode">
            {{ isRegisterMode ? 'Déjà un compte ?' : 'Pas encore de héros ?' }}
            <button class="btn-link" @click="isRegisterMode = !isRegisterMode; errorMessage = ''">
             {{ isRegisterMode ? 'Se connecter' : "S'inscrire" }}
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
