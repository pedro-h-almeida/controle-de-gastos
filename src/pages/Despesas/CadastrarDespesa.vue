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
        <div
          class="col-xs-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4 q-pt-sm"
        >
          <q-field
            filled
            stack-label
            label="Tipo"
            v-model="despesasStore.tipo"
            lazy-rules
            :rules="[(val) => (val && val !== null) || 'Obrigatório']"
          >
            <template v-slot:control>
              <q-option-group
                class="q-pt-sm"
                inline
                type="radio"
                v-model="despesasStore.tipo"
                :options="radioOptions"
              />
            </template>
          </q-field>
        </div>
        <!-- ########## -->
        <!-- Campo Data -->
        <!-- ########## -->
        <div
          class="col-7 q-pr-md q-pt-sm"
          v-if="despesasStore.tipo !== 99 && despesasStore.tipo !== null"
        >
          <q-input
            filled
            clearable
            label="Data"
            v-model="despesasStore.dataInicio"
            lazy
            :rules="[(val) => (val && val.length > 0) || 'Obrigatório']"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    default-view="Years"
                    mask="DD/MM/YYYY"
                    v-model="despesasStore.dataInicio"
                    v-close-popup="dateClosePopup"
                    @navigation="dateClosePopup = false"
                    @update:model-value="dateClosePopup = true"
                  >
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <!-- ############## -->
        <!-- Campo Parcelas -->
        <!-- ############## -->
        <div class="col-5 q-pt-sm" v-if="despesasStore.tipo === 1">
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
          v-if="despesasStore.tipo === 1"
        >
          <q-select
            filled
            clearable
            label="Cartão"
            v-model="despesasStore.refCartao"
            :options="despesasStore.listaCartoes"
            :rules="[
              (val) => (val && val.length !== null) || 'Obrigatório',
              (val) =>
                (val &&
                  val.limiteCartao - val.gastoTotal >= despesasStore.valor) ||
                'Sem Limite Disponível',
            ]"
          >
            <template v-slot:selected>
              <div v-if="despesasStore.refCartao">
                {{ despesasStore.refCartao.label }} ({{
                  formatarDinheiro(
                    despesasStore.refCartao.limiteCartao -
                      despesasStore.refCartao.gastoTotal,
                  )
                }})
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
                  <q-item-label caption
                    >Disponível:
                    {{
                      formatarDinheiro(
                        scope.opt.limiteCartao - scope.opt.gastoTotal,
                      )
                    }}</q-item-label
                  >
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
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

const despesasStore = useDespesasStore();
const db = useFirestore();
const user = useCurrentUser();
const router = useRouter();
const $q = useQuasar();

const dateClosePopup = ref(true);
const monthYearSelector_value = {
  day: "01",
  mes: "07",
  ano: "1998",
};

const radioOptions = [
  { label: "Cartão", value: 1, color: "orange" },
  { label: "Dinheiro", value: 2, color: "green" },
  { label: "Despesa Fixa", value: 99, color: "blue" },
];

function cadastrar() {
  if (despesasStore.tipo === 1) {
    cadastrarDespesaCartao();
  }

  if (despesasStore.tipo === 2) {
    cadastrarDespesaDinheiro();
  }

  if (despesasStore.tipo === 99) {
    cadastrarDespesaFixa();
  }
}

async function cadastrarDespesaCartao() {
  const dataInicioSplit = despesasStore.dataInicio.split("/");
  const docRef = await addDoc(collection(db, "despesas"), {
    tipo: 0,
    descricao: despesasStore.descricao,
    valorTotal: despesasStore.valor,
    parcelas: despesasStore.parcelas,
    refUsuario: user.value.uid,
    refCartao: despesasStore.refCartao.value,
    dataInicio: Timestamp.fromDate(
      new Date(dataInicioSplit[2], Number(dataInicioSplit[1]) - 1, 1),
    ),
    dataFim: Timestamp.fromDate(
      date.addToDate(
        new Date(dataInicioSplit[2], Number(dataInicioSplit[1]) - 1, 25),
        { months: despesasStore.parcelas - 1 },
      ),
    ),
  });
  console.log("Document written with ID: ", docRef.id);
  // TODO definir para qual rota retornar
  // router.push("/cartoes");
  router.back();
}

async function cadastrarDespesaDinheiro() {
  const dataInicioSplit = despesasStore.dataInicio.split("/");
  const docRef = await addDoc(collection(db, "despesas"), {
    tipo: 1,
    descricao: despesasStore.descricao,
    valorTotal: despesasStore.valor,
    parcelas: 1,
    refUsuario: user.value.uid,
    dataInicio: Timestamp.fromDate(
      new Date(dataInicioSplit[2], Number(dataInicioSplit[1]) - 1, 1),
    ),
    dataFim: Timestamp.fromDate(
      new Date(dataInicioSplit[2], Number(dataInicioSplit[1]) - 1, 25),
    ),
  });
  console.log("Document written with ID: ", docRef.id);
  // TODO definir para qual rota retornar
  // router.push("/cartoes");
  router.back();
}

async function cadastrarDespesaFixa() {
  const docRef = doc(db, "usuarios", user.value.uid);

  await updateDoc(docRef, {
    despesaFixa: arrayUnion({
      descricao: despesasStore.descricao,
      valor: despesasStore.valor,
    }),
  });
  // TODO definir para qual rota retornar
  // router.push("/cartoes");
  router.back();
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
      limiteCartao: doc.data().limite,
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
