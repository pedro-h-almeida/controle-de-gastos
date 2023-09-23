import { ref } from "vue";
import { defineStore } from "pinia";

export const useCartaoStore = defineStore("cartao", () => {
  const id = ref("");
  const descricao = ref("");
  const cor = ref("");
  const limite = ref(0);

  const listaCartoes = ref([]);

  function $reset() {
    id.value = "";
    descricao.value = "";
    cor.value = "";
    limite.value = null;

    listaCartoes.value = [];
  }

  return { $reset, id, descricao, cor, limite, listaCartoes };
});
