import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const email = ref("");
  const userUID = ref(null);
  const isUserLoggedIn = ref(false);

  function $reset() {
    email.value = "";
    userUID.value = null;
  }

  return { $reset, email, userUID, isUserLoggedIn };
});
