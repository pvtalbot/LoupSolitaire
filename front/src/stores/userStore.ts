import { defineStore } from 'pinia';
import type { User } from '../types/user';
import { computed, ref } from 'vue';

export const useUserStore = defineStore('user', () => {
    // --- STATE ---
    const user = ref<User | null>(null);
    const token = ref<string | null>(localStorage.getItem('token'));

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

    return {
        user,
        token,
        isAuthenticated,
        setAuth,
        logout,
    }
})
