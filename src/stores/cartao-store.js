import { ref } from "vue";
import { defineStore } from "pinia";

export const useCartaoStore = defineStore("cartao", () => {
  const nome = ref("");
  const cor = ref("");
  const limite = ref();

  const listaCartoes = ref([]);

  function $reset() {
    nome.value = "";
    cor.value = "";
    limite.value = null;

    listaCartoes.value = [];
  }

  return { $reset, nome, cor, limite, listaCartoes };
});
