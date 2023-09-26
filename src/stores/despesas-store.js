import { ref } from "vue";
import { defineStore } from "pinia";

export const useDespesasStore = defineStore("despesas", () => {
  const id = ref("");
  const descricao = ref("");
  const valor = ref(null);
  const tipo = ref(null);
  const despesaFixa = ref(false);
  const dataInicio = ref(null);
  const dataFim = ref(null);
  const parcelas = ref(null);
  const refCartao = ref(null);

  const listaCartoes = ref([]);

  function $reset() {
    id.value = "";
    descricao.value = "";
    valor.value = null;
    tipo.value = null;
    despesaFixa.value = false;
    dataInicio.value = null;
    dataFim.value = null;
    parcelas.value = null;
    refCartao.value = null;

    listaCartoes.value = [];
  }

  return {
    $reset,
    id,
    descricao,
    valor,
    tipo,
    despesaFixa,
    dataInicio,
    dataFim,
    parcelas,
    refCartao,
    listaCartoes,
  };
});
