import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("header", () => {
  const email = ref("");

  function $reset() {
    email.value = "";
  }

  return { $reset, email };
});
