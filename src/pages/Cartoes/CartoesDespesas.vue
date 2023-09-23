<template>
  <q-page>
    <div class="row justify-center">
      <div class="col-xs-12 col-md-6 col-lg-4 col-xl-2">
        <q-card bordered>
          <q-card-section
            class="q-pa-sm"
            :style="`background-color: ${cartaoStore.cor};`"
          >
            <div class="text-h4 text-center">{{ cartaoStore.descricao }}</div>
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
                          element.valorTotal / element.parcelaTotal,
                        )
                      }}</q-item-label>
                    </q-item-section>

                    <q-item-section side top>
                      <q-item-label caption
                        >{{ element.parcelaAtual }}/{{
                          element.parcelaTotal
                        }}</q-item-label
                      >
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
            :style="`background-color: ${cartaoStore.cor};`"
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
                  <div class="">{{ formatarDinheiro(cartaoStore.limite) }}</div>
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
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useQuasar, date } from "quasar";
import MonthYearSelector from "src/components/pages/Cartoes/month-year-selector.vue";

import { useCartaoStore } from "../../stores/cartao-store.js";
import { useFirestore, useCurrentUser } from "vuefire";
import {
  collection,
  where,
  and,
  query,
  getDocs,
  orderBy,
} from "firebase/firestore";

const $q = useQuasar();
const cartaoStore = useCartaoStore();
const user = useCurrentUser();
const db = useFirestore();

const monthYearSelector_value = {
  day: "01",
  mes: "07",
  ano: "1998",
};

const despesasDoMes = ref(0);
const listaGastoCartao = ref([]);

async function getGastosCartaoDB() {
  $q.loading.show();

  despesasDoMes.value = 0;
  listaGastoCartao.value = [];

  const despesasQuery = query(
    collection(db, "despesas"),
    and(
      where("tipo", "==", 0),
      where("refUsuario", "==", String(user.value.uid)),
      where("refCartao", "==", String(cartaoStore.id)),
      where(
        "dataFim",
        ">=",
        new Date(monthYearSelector_value.ano, monthYearSelector_value.mes, 1),
      ),
    ),
  );

  const despesasQuerySnapshot = await getDocs(despesasQuery);

  for (const doc of despesasQuerySnapshot.docs) {
    const dateDiff = date.getDateDiff(
      new Date(monthYearSelector_value.ano, monthYearSelector_value.mes, 1),
      doc.data().dataInicio.toDate().toDateString(),
      "months",
    );

    if (dateDiff >= 0) {
      listaGastoCartao.value.push({
        id: doc.id,
        descricao: doc.data().descricao,
        valorTotal: doc.data().valorTotal,
        parcelaAtual: dateDiff + 1,
        parcelaTotal: doc.data().parcelas,
      });
      despesasDoMes.value += doc.data().valorTotal / doc.data().parcelas;
    }
  }

  $q.loading.hide();
}

function monthYearSelector_valueChange({ mes, ano }) {
  monthYearSelector_value.mes = `${mes.id}`;
  monthYearSelector_value.ano = ano;

  getGastosCartaoDB();
}

function formatarDinheiro(value) {
  return value.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
}

onMounted(() => {
  const currentDate = new Date();

  monthYearSelector_value.mes = currentDate.getMonth();
  monthYearSelector_value.ano = currentDate.getUTCFullYear();

  getGastosCartaoDB();
});

onBeforeUnmount(() => {
  cartaoStore.$reset();
});
</script>
