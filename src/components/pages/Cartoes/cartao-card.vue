<template>
  <q-card bordered>
    <!-- NOME CARTÃO -->
    <q-card-section class="q-pa-sm" :style="bColor">
      <div class="text-h6 text-center">{{ props.nome }}</div>
    </q-card-section>
    <q-separator />
    <!-- PRINCIPAIS INFORMAÇÕES DO CARTÃO -->
    <q-card-section>
      <div class="row">
        <div class="col-12">
          <div class="row">
            <div class="text-weight-bolder">Atual:</div>
            &nbsp;
            <div class="">
              {{ formatarDinheiro(props.gastoAtual) }}
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="row">
            <div class="text-weight-bolder">Limite:</div>
            &nbsp;
            <div class="">
              {{ formatarDinheiro(props.limiteCartao) }}
            </div>
          </div>
        </div>
      </div>
    </q-card-section>
    <q-separator />
    <!-- BOTÃO DETALHES -->
    <q-card-actions align="right">
      <q-btn
        flat
        color="info"
        label="Detalhes"
        icon-right="fas fa-circle-info"
        style="font-size: 12px"
        @click="btnClick_Detalhes"
      />
    </q-card-actions>
  </q-card>
</template>

<style lang="scss" scoped></style>

<script setup>
const props = defineProps({
  nome: String,
  cor: String,
  gastoAtual: Number,
  limiteCartao: Number,
});
const emit = defineEmits(["detalhesClick"]);

const bColor = `background-color: ${props.cor};`;

function formatarDinheiro(value) {
  return value.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
}

function btnClick_Detalhes() {
  emit("detalhesClick");
}
</script>
