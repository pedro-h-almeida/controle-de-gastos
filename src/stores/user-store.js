import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const email = ref("");
  const isUserLoggedIn = ref(false);

  function $reset() {
    email.value = "";
  }

  return { $reset, email, isUserLoggedIn };
});
