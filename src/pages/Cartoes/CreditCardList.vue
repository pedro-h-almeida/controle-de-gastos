<template>
  <q-page>
    <div class="row">
      <div
        v-for="(element, index) in cartoesList"
        v-bind:key="index"
        class="col-12 q-pb-lg"
      >
        <CartaoCardComponent
          :nome="element.nome"
          :cor="element.cor"
          :gastoAtual="element.gastoAtual"
          :limiteCartao="element.limiteCartao"
          @detalhesClick="irDetalhesCartao(index)"
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
      />
    </q-page-sticky>
  </q-page>
</template>

<style lang="scss" scoped></style>

<script setup>
import { useRouter } from "vue-router";
import CartaoCardComponent from "src/components/pages/Cartoes/cartao-card.vue";

const router = useRouter();
const cartoesList = [
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

function irDetalhesCartao(idCartao) {
  console.log("DETALHES CARTÃO: ", idCartao);
  router.push("cartoes/detalhes");
}
</script>
