<template>
  <q-page class="q-pa-lg">
    <q-form @submit="cadastrar">
      <div class="row">
        <!-- <div class="col-xs-12 col-sm-10 col-md-8 col-lg-6 col-xl-4"> -->

        <!-- ############### -->
        <!-- Campo Descrição -->
        <!-- ############### -->
        <div
          class="col-xs-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4"
        >
          <q-input
            filled
            clearable
            label="Descrição"
            v-model="despesasStore.descricao"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Obrigatório']"
          />
        </div>
        <!-- ########### -->
        <!-- Campo Valor -->
        <!-- ########### -->
        <div
          class="col-xs-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4 q-pt-sm"
        >
          <QCurrencyInput
            filled
            clearable
            label="Valor"
            v-model="despesasStore.valor"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Obrigatório']"
            :options="{
              locale: 'pt-BR',
              currency: 'BRL',
              currencyDisplay: 'symbol',
              precision: 2,
              hideCurrencySymbolOnFocus: false,
              hideGroupingSeparatorOnFocus: false,
              hideNegligibleDecimalDigitsOnFocus: false,
              autoDecimalDigits: true,
              useGrouping: true,
              accountingSign: false,
            }"
          />
        </div>
        <!-- ########## -->
        <!-- Campo Tipo -->
        <!-- ########## -->
        <div class="col-7 q-pr-md q-pt-sm">
          <q-select
            filled
            clearable
            label="Tipo"
            v-model="despesasStore.tipo"
            :options="tipoOptions"
            lazy-rules
            :rules="[(val) => (val && val !== null) || 'Obrigatório']"
          />
        </div>
        <!-- ############## -->
        <!-- Campo Despesa Fixa -->
        <!-- ############## -->
        <div class="col-5 q-pt-sm">
          <q-field filled v-model="despesasStore.despesaFixa">
            <template v-slot:control>
              <q-checkbox
                label="Despesa Fixa"
                v-model="despesasStore.despesaFixa"
              />
            </template>
          </q-field>
        </div>

        <!-- ########## -->
        <!-- Campo Data -->
        <!-- ########## -->
        <div
          class="col-7 q-pr-md q-pt-sm"
          v-if="despesasStore.tipo && !despesasStore.despesaFixa"
        >
          <q-input
            filled
            clearable
            label="Data (Mes/Ano)"
            v-model="despesasStore.dataInicio"
            lazy-rules
            mask="##/####"
            :rules="[
              (val) => (val && val.length > 0) || 'Obrigatório',
              (val) =>
                (Number(val.split('/')[0]) > 0 &&
                  Number(val.split('/')[0]) <= 12) ||
                'Mês inválido',
            ]"
          />
        </div>
        <!-- ############## -->
        <!-- Campo Parcelas -->
        <!-- ############## -->
        <div
          class="col-5 q-pt-sm"
          v-if="
            despesasStore.tipo &&
            despesasStore.tipo.value === 0 &&
            !despesasStore.despesaFixa
          "
        >
          <q-input
            filled
            clearable
            label="Parcelas"
            v-model="despesasStore.parcelas"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Obrigatório']"
            type="number"
          />
        </div>
        <!-- ############ -->
        <!-- Campo Cartão -->
        <!-- ############ -->
        <div
          class="col-xs-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4 q-pt-sm"
          v-if="despesasStore.tipo && despesasStore.tipo.value === 0"
        >
          <q-select
            filled
            clearable
            label="Cartão"
            v-model="despesasStore.refCartao"
            :options="despesasStore.listaCartoes"
            :rules="[(val) => (val && val !== null) || 'Obrigatório']"
          >
            <template v-slot:selected>
              <div v-if="despesasStore.refCartao">
                {{ despesasStore.refCartao.label }}
              </div>
            </template>
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section avatar>
                  <q-icon
                    name="credit_card"
                    :style="{ color: scope.opt.cor }"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ scope.opt.label }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>

        <!-- ############ -->
        <!-- Botão Submit -->
        <!-- ############ -->

        <div
          class="col-xs-8 offset-xs-4 col-sm-5 offset-sm-6 col-md-4 offset-md-6 col-lg-3 offset-lg-6 col-xl-2 offset-xl-6"
        >
          <q-btn
            class="q-mt-lg full-width q-pa-sm"
            label="Nova Despesa"
            type="submit"
            color="primary"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<style lang="scss" scoped></style>

<script setup>
import { useQuasar, date } from "quasar";
import { useDespesasStore } from "../../stores/despesas-store.js";
import { onBeforeUnmount, ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import QCurrencyInput from "components/QCurrencyInput.vue";

import { useFirestore, useCurrentUser } from "vuefire";
import {
  collection,
  where,
  and,
  query,
  getDocs,
  orderBy,
  addDoc,
  Timestamp,
} from "firebase/firestore";

const despesasStore = useDespesasStore();
const db = useFirestore();
const user = useCurrentUser();
const router = useRouter();
const $q = useQuasar();

const monthYearSelector_value = {
  day: "01",
  mes: "07",
  ano: "1998",
};

const tipoOptions = [
  { label: "Cartão", value: 0 },
  { label: "Outros", value: 1 },
];

async function cadastrar() {
  const newDoc = {
    tipo: despesasStore.tipo.value,
    descricao: despesasStore.descricao,
    valorTotal: despesasStore.valor,
    refUsuario: user.value.uid,
    despesaFixa: despesasStore.despesaFixa,
  };

  if (despesasStore.tipo.value === 0) {
    newDoc.refCartao = despesasStore.refCartao.value;
    if (despesasStore.despesaFixa) {
      newDoc.parcelas = 1;
      newDoc.dataInicio = Timestamp.fromDate(
        new Date(monthYearSelector_value.ano, monthYearSelector_value.mes, 1),
      );
      newDoc.dataFim = Timestamp.fromDate(new Date(2077, 0, 25));
    } else {
      const dataSplit = despesasStore.dataInicio.split("/");

      newDoc.parcelas = despesasStore.parcelas;
      newDoc.dataInicio = Timestamp.fromDate(
        new Date(dataSplit[1], Number(dataSplit[0]) - 1, 1),
      );
      newDoc.dataFim = Timestamp.fromDate(
        date.addToDate(new Date(dataSplit[1], Number(dataSplit[0]) - 1, 25), {
          months: despesasStore.parcelas - 1,
        }),
      );
    }
  } else {
    newDoc.parcelas = 1;
    if (despesasStore.despesaFixa) {
      newDoc.dataInicio = Timestamp.fromDate(
        new Date(monthYearSelector_value.ano, monthYearSelector_value.mes, 1),
      );
      newDoc.dataFim = Timestamp.fromDate(new Date(2077, 0, 25));
    } else {
      const dataSplit = despesasStore.dataInicio.split("/");

      newDoc.dataInicio = Timestamp.fromDate(
        new Date(dataSplit[1], Number(dataSplit[0]) - 1, 1),
      );
      newDoc.dataFim = Timestamp.fromDate(
        new Date(dataSplit[1], Number(dataSplit[0]) - 1, 25),
      );
    }
  }

  const docRef = await addDoc(collection(db, "despesas"), newDoc);
  console.log("Document written with ID: ", docRef.id);
  // router.back();
}

async function getCartoesDB() {
  despesasStore.listaCartoes = [];
  $q.loading.show();
  const cartoesDb = query(
    collection(db, "usuarios", user.value.uid, "cartoes"),
    orderBy("createdAt", "asc"),
  );
  const cartoesDbQuerySnapshot = await getDocs(cartoesDb);

  for (const doc of cartoesDbQuerySnapshot.docs) {
    const gastos = await getGastosCartaoDB(doc.id);
    despesasStore.listaCartoes.push({
      value: doc.id,
      label: doc.data().descricao,
      cor: doc.data().cor,
      gastoTotal: gastos.total,
    });
  }
  $q.loading.hide();
}

async function getGastosCartaoDB(id) {
  const gastos = { total: 0 };

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
  }

  return gastos;
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

onBeforeUnmount(() => {
  despesasStore.$reset();
});
</script>
