<template>
  <q-page>
    <div class="row q-pt-md q-pb-sm q-px-lg">
      <div class="col">
        <q-card bordered>
          <!-- DESCRICAO CARTÃO -->
          <q-card-section class="q-pa-sm">
            <MonthYearSelector @mudarData="monthYearSelector_valueChange" />
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="row q-pt-md q-pb-sm q-px-lg">
      <q-list bordered padding class="rounded-borders full-width">
        <q-item-label header>Despesas Fixas</q-item-label>

        <div v-for="element in despesasList" v-bind:key="element.id">
          <div v-if="element.despesaFixa">
            <q-item>
              <q-item-section>
                <q-item-label lines="1">{{ element.descricao }}</q-item-label>
                <q-item-label caption v-if="element.tipo === 0">
                  Cartão({{ element.cartaoDesc }})
                </q-item-label>
                <q-item-label caption v-else>Outros</q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-item-label caption>{{
                  formatarDinheiro(element.valorTotal)
                }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-separator inset />
          </div>
        </div>
      </q-list>
    </div>
    <div class="row q-pt-md q-pb-sm q-px-lg">
      <q-list bordered padding class="rounded-borders full-width">
        <q-item-label header>Cartões</q-item-label>

        <div v-for="element in despesasList" v-bind:key="element.id">
          <div v-if="element.tipo === 0 && !element.despesaFixa">
            <q-item>
              <q-item-section>
                <q-item-label lines="1">{{ element.descricao }}</q-item-label>
                <q-item-label caption>
                  {{ element.cartaoDesc }}
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-item-label caption>{{
                  formatarDinheiro(element.valorTotal)
                }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-separator inset />
          </div>
        </div>
      </q-list>
    </div>
    <div class="row q-pt-md q-pb-sm q-px-lg">
      <q-list bordered padding class="rounded-borders full-width">
        <q-item-label header>Outros</q-item-label>

        <div v-for="element in despesasList" v-bind:key="element.id">
          <div v-if="element.tipo === 1 && !element.despesaFixa">
            <q-item>
              <q-item-section>
                <q-item-label lines="1">{{ element.descricao }}</q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-item-label caption>{{
                  formatarDinheiro(element.valorTotal)
                }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-separator inset />
          </div>
        </div>
      </q-list>
    </div>
  </q-page>
</template>

<style lang="scss" scoped></style>

<script setup>
import MonthYearSelector from "src/components/month-year-selector.vue";
import { useRouter } from "vue-router";
import { useQuasar, date } from "quasar";

import { onMounted, ref } from "vue";

import { useFirestore, useCurrentUser } from "vuefire";
import {
  collection,
  where,
  and,
  query,
  getDocs,
  orderBy,
  doc,
  getDoc,
} from "firebase/firestore";

const $q = useQuasar();
const user = useCurrentUser();
const db = useFirestore();
const router = useRouter();

let cartoesList = [];
const despesasList = ref([]);

const monthYearSelector_value = {
  day: "01",
  mes: "07",
  ano: "1998",
};

async function getCartoesDB() {
  cartoesList = [];
  $q.loading.show();
  const cartoesDb = query(
    collection(db, "usuarios", user.value.uid, "cartoes"),
    orderBy("createdAt", "asc"),
  );
  const cartoesDbQuerySnapshot = await getDocs(cartoesDb);

  for (const doc of cartoesDbQuerySnapshot.docs) {
    cartoesList.push({
      id: doc.id,
      descricao: doc.data().descricao,
      cor: doc.data().cor,
    });
  }
  console.log(cartoesList);
  getUserDespesasMes();
}

async function getUserDespesasMes(id) {
  despesasList.value = [];
  const despesasQuery = query(
    collection(db, "despesas"),
    and(
      where("refUsuario", "==", String(user.value.uid)),
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

    if (dateDiff >= 0 || doc.data().despesaFixa) {
      if (doc.data().tipo === 0) {
        let cartaoObj = cartoesList.find((o) => o.id === doc.data().refCartao);
        despesasList.value.push({
          id: doc.id,
          descricao: doc.data().descricao,
          valorTotal: doc.data().valorTotal,
          parcelas: doc.data().parcelas,
          despesaFixa: doc.data().despesaFixa,
          tipo: doc.data().tipo,
          cartaoDesc: cartaoObj.descricao,
          cartaoCor: cartaoObj.cor,
        });
      } else {
        despesasList.value.push({
          id: doc.id,
          descricao: doc.data().descricao,
          valorTotal: doc.data().valorTotal,
          parcelas: doc.data().parcelas,
          despesaFixa: doc.data().despesaFixa,
          tipo: doc.data().tipo,
        });
      }
    }
  }
  console.log("Despesas List: ", despesasList);
  $q.loading.hide();
}

function monthYearSelector_valueChange({ mes, ano }) {
  monthYearSelector_value.mes = `${mes.id}`;
  monthYearSelector_value.ano = ano;
  getCartoesDB();
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
  getCartoesDB();
});
</script>
