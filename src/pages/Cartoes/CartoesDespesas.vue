<template>
  <q-page>
    <div class="row justify-center">
      <div class="col-xs-12 col-md-6 col-lg-4 col-xl-2">
        <q-card bordered>
          <q-card-section
            class="q-pa-sm"
            :style="`background-color: ${infoCartao.bColor};`"
          >
            <div class="text-h4 text-center">{{ infoCartao.nome }}</div>
          </q-card-section>
          <q-separator />
          <q-card-section class="q-pa-sm">
            <MonthYearSelector @mudarData="monthYearSelector_valueChange" />
          </q-card-section>
          <q-separator />
          <q-card-section class="q-pa-sm">
            <q-list>
              <template v-if="listaGastoCartao.length > 0">
                <template
                  v-for="(element, index) in listaGastoCartao"
                  v-bind:key="index"
                >
                  <q-separator v-if="index !== 0" />
                  <q-item>
                    <q-item-section>
                      <q-item-label>{{ element.descricao }}</q-item-label>
                      <q-item-label caption>{{
                        formatarDinheiro(
                          element.valorTotal / element.parcelaTotal
                        )
                      }}</q-item-label>
                    </q-item-section>

                    <q-item-section side top>
                      <q-item-label caption>{{
                        element.parcelaAtual
                      }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
              </template>
              <template v-else>
                <q-item-section class="q-pa-md">
                  <q-item-label class="text-h6 text-center"
                    >Não a nenhum gasto neste mês, parabéns!</q-item-label
                  >
                </q-item-section>
              </template>
            </q-list>
          </q-card-section>
          <q-separator />
          <q-card-section
            class="q-pa-md"
            :style="`background-color: ${infoCartao.bColor};`"
          >
            <div class="row justify-between">
              <div class="col">
                <div class="row justify-start">
                  <div class="text-weight-bolder">Total:</div>
                  &nbsp;
                  <div class="">{{ formatarDinheiro(despesasDoMes) }}</div>
                </div>
              </div>
              <div class="col">
                <div class="row justify-end">
                  <div class="text-weight-bolder">Limite:</div>
                  &nbsp;
                  <div class="">{{ formatarDinheiro(infoCartao.limite) }}</div>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<style lang="scss" scoped></style>

<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import MonthYearSelector from "src/components/pages/Cartoes/month-year-selector.vue";

const $q = useQuasar();

const monthYearSelector_value = {
  day: "01",
  mes: "07",
  ano: "1998",
};

const infoCartao = {
  nome: "Caixa",
  bColor: "#033f99",
  limite: 2000,
};

const despesasDoMes = ref(0);
const listaGastoCartao = ref([
  {
    id: 0,
    descricao: "Kabum",
    valorTotal: 2400.0,
    parcelaAtual: 5,
    parcelaTotal: 12,
  },
  {
    id: 1,
    descricao: "Mercado Livre",
    valorTotal: 349.9,
    parcelaAtual: 2,
    parcelaTotal: 3,
  },
  {
    id: 2,
    descricao: "Shein",
    valorTotal: 79.8,
    parcelaAtual: 1,
    parcelaTotal: 1,
  },
  {
    id: 3,
    descricao: "Riot Games",
    valorTotal: 169.76,
    parcelaAtual: 11,
    parcelaTotal: 12,
  },
]);

onMounted(() => {
  const currentDate = new Date();

  monthYearSelector_value.mes = currentDate.getMonth();
  monthYearSelector_value.ano = currentDate.getUTCFullYear();
});

function monthYearSelector_valueChange({ mes, ano }) {
  monthYearSelector_value.mes = `${mes.id}`;
  monthYearSelector_value.ano = ano;
}

function formatarDinheiro(value) {
  return value.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
}
</script>
