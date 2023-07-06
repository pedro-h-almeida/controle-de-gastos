import { ref } from "vue";
import { defineStore } from "pinia";

export const useHeaderStore = defineStore("header", () => {
  const pageTitle = ref("");
  const showBackButton = ref(false);

  return { pageTitle, showBackButton };
});
