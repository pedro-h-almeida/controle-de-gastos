import { ref } from "vue";
import { defineStore } from "pinia";

export const useCartaoStore = defineStore("cartao", () => {
  const id = ref("");
  const descricao = ref("");
  const cor = ref("");

  const listaCartoes = ref([]);

  function $reset() {
    id.value = "";
    descricao.value = "";
    cor.value = "";

    listaCartoes.value = [];
  }

  return { $reset, id, descricao, cor, listaCartoes };
});
