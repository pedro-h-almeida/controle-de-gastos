<template>
  <q-page>
    <div class="row">
      <div
        v-for="(element, index) in listaCartoes"
        v-bind:key="index"
        class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 q-pa-lg"
      >
        <CartaoCardComponent
          :nome="element.nome"
          :cor="element.cor"
          :gastoAtual="element.gastoAtual"
          :limiteCartao="element.limiteCartao"
          @detalhesClick="btnClick_DetalhesCartao(index)"
        />
      </div>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        icon="add"
        color="positive"
        label="Adicionar Cartão"
        class="q-pa-md"
        style="border-radius: 20px"
        @click="btnClick_AdicionarCartao()"
      />
    </q-page-sticky>
  </q-page>
</template>

<style lang="scss" scoped></style>

<script setup>
import { useRouter } from "vue-router";
import CartaoCardComponent from "src/components/pages/Cartoes/cartao-card.vue";

import { getCartoes } from "../../services/firestore/getCartoes.js";

getCartoes();

const router = useRouter();
const listaCartoes = [
  {
    nome: "Hipercard",
    cor: "red",
    gastoAtual: 150.0,
    limiteCartao: 350.0,
  },
  {
    nome: "Caixa",
    cor: "#730659",
    gastoAtual: 50.0,
    limiteCartao: 50.0,
  },
];

function btnClick_DetalhesCartao(idCartao) {
  console.log("DETALHES CARTÃO: ", idCartao);
  router.push("cartoes/detalhes");
}

function btnClick_AdicionarCartao() {
  console.log("btnClick_AdicionarCartao");
  router.push("cartoes/cadastro");
}
</script>
