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
    <div class="row">
      <div
        v-for="(element, index) in cartaoStore.listaCartoes"
        v-bind:key="index"
        class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 q-pa-lg"
      >
        <CartaoCardComponent
          :descricao="element.descricao"
          :cor="element.cor"
          :gastoTotal="element.gastoTotal"
          :gastoMes="element.gastoMes"
          :limiteCartao="element.limiteCartao"
          @detalhesClick="btnClick_DetalhesCartao(element)"
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
import { useQuasar } from "quasar";
import { onMounted, onBeforeUnmount, ref } from "vue";
import { useRouter } from "vue-router";
import CartaoCardComponent from "src/components/pages/Cartoes/cartao-card.vue";
import MonthYearSelector from "src/components/month-year-selector.vue";

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
const user = useCurrentUser();
const db = useFirestore();
const cartaoStore = useCartaoStore();
const router = useRouter();

const monthYearSelector_value = {
  day: "01",
  mes: "07",
  ano: "1998",
};

async function getCartoesDB() {
  cartaoStore.listaCartoes = [];
  $q.loading.show();
  const cartoesDb = query(
    collection(db, "usuarios", user.value.uid, "cartoes"),
    orderBy("createdAt", "asc"),
  );
  const cartoesDbQuerySnapshot = await getDocs(cartoesDb);

  for (const doc of cartoesDbQuerySnapshot.docs) {
    const gastos = await getGastosCartaoDB(doc.id);
    cartaoStore.listaCartoes.push({
      id: doc.id,
      descricao: doc.data().descricao,
      cor: doc.data().cor,
      gastoTotal: gastos.total,
      gastoMes: gastos.mes,
      limiteCartao: doc.data().limite,
    });
  }
  $q.loading.hide();
}

async function getGastosCartaoDB(id) {
  const gastos = { total: 0, mes: 0 };

  const despesasQuery = query(
    collection(db, "despesas"),
    and(
      where("tipo", "==", 0),
      where("refUsuario", "==", String(user.value.uid)),
      where("refCartao", "==", String(id)),
      where(
        "dataFim",
        ">=",
        new Date(monthYearSelector_value.ano, monthYearSelector_value.mes, 1),
      ),
    ),
  );

  const despesasQuerySnapshot = await getDocs(despesasQuery);

  for (const doc of despesasQuerySnapshot.docs) {
    gastos.total += doc.data().valorTotal;
    gastos.mes += doc.data().valorTotal / doc.data().parcelas;
  }

  return gastos;
}

function monthYearSelector_valueChange({ mes, ano }) {
  monthYearSelector_value.mes = `${mes.id}`;
  monthYearSelector_value.ano = ano;

  getCartoesDB();
}

function btnClick_DetalhesCartao(cartao) {
  cartaoStore.id = cartao.id;
  cartaoStore.descricao = cartao.descricao;
  cartaoStore.cor = cartao.cor;
  cartaoStore.limite = cartao.limiteCartao;
  router.push("cartoes/detalhes");
}

function btnClick_AdicionarCartao() {
  router.push("cartoes/cadastro");
}

onMounted(() => {
  const currentDate = new Date();

  monthYearSelector_value.mes = currentDate.getMonth();
  monthYearSelector_value.ano = currentDate.getUTCFullYear();
  getCartoesDB();
});

onBeforeUnmount(() => {
  cartaoStore.listaCartoes = [];
});
</script>
