import { defineStore } from 'pinia';
import type { User } from '../types/user';
import { computed, ref } from 'vue';
import { apiFetch } from '../services/api';

export const useUserStore = defineStore('user', () => {
    // --- STATE ---
    const user = ref<User | null>(null);
    const token = ref<string | null>(localStorage.getItem('token'));
    const isLoading = ref(false);

    // --- GETTERS ---
    const isAuthenticated = computed(() => !!token.value);

    // --- ACTIONS ---
    function setAuth(newUser: User, newToken: string) {
        user.value = newUser;
        token.value = newToken;

        localStorage.setItem('token', newToken);
    }

    function logout() {
        user.value = null;
        token.value = null;
        localStorage.removeItem('token');
    }

    async function fetchCurrentUser() {
        if (!token.value) return;

        isLoading.value = true;
        try {
            const userData = await apiFetch<User>('/users/me');
            user.value = userData;
        } catch (_) {
            logout();
        } finally {
            isLoading.value = false;
        }
    }

    return {
        user,
        token,
        isAuthenticated,
        setAuth,
        logout,
        fetchCurrentUser,
    }
})
