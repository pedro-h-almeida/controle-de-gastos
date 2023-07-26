import { ref } from "vue";
import { defineStore } from "pinia";

export const useHeaderStore = defineStore("header", () => {
  const pageTitle = ref("");
  const showBackButton = ref(false);

  function $reset() {
    pageTitle.value = "";
    showBackButton.value = false;
  }

  return { $reset, pageTitle, showBackButton };
});
