<template>
  <q-page class="q-pa-lg">
    <div class="row justify-center">
      <div class="col-xs-12 col-md-6 col-lg-4">
        <q-card bordered>
          <!-- DATA/MES ATUAL -->
          <q-card-section>
            <div class="text-h5 text-weight-bold">
              {{ mesAtual.label }} / {{ anoAtual }}
            </div>
          </q-card-section>
          <q-separator inset />
          <!-- GASTO ATUAL / VALOR DISPONIVEL -->
          <q-card-section>
            <div class="row">
              <div class="col-12">
                <div class="row">
                  <div class="text-weight-bolder">Mês:</div>
                  &nbsp;
                  <div class="">
                    {{ formatarDinheiro(valorMes) }}
                  </div>
                </div>
              </div>
              <div class="col-12 q-pt-sm">
                <div class="row">
                  <div class="col">
                    <div class="row">
                      <div class="text-weight-bolder">Disponível:</div>
                      &nbsp;
                      <div class="">
                        {{ formatarDinheiro(valorDisponivel - valorMes) }}
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="row justify-end">
                      <div class="text-weight-bolder">Total:</div>
                      &nbsp;
                      <div class="">
                        {{ formatarDinheiro(valorTotal) }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>
          <q-separator inset />
          <!-- IR PARA DETALHES DOS GASTOS -->
          <q-card-actions align="right">
            <q-btn
              flat
              color="info"
              size="12px"
              label="Ir para detalhes"
              icon-right="fas fa-arrow-right"
              @click="btnClick_IrDetalhes"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        icon="add"
        color="positive"
        label="Novo Gasto"
        class="q-pa-md"
        style="border-radius: 20px"
        @click="btnClick_NovoGasto"
      />
    </q-page-sticky>
  </q-page>
</template>

<style lang="scss" scoped></style>

<script setup>
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

let mesAtual = ref({ id: 6, label: "JUL" });
let anoAtual = ref(1998);
const valorMes = ref(0);
const valorTotal = ref(0);
const valorDisponivel = ref(0);

const listaMeses = [
  { id: 0, label: "JAN" },
  { id: 1, label: "FEV" },
  { id: 2, label: "MAR" },
  { id: 3, label: "ABR" },
  { id: 4, label: "MAI" },
  { id: 5, label: "JUN" },
  { id: 6, label: "JUL" },
  { id: 7, label: "AGO" },
  { id: 8, label: "SET" },
  { id: 9, label: "OUT" },
  { id: 10, label: "NOV" },
  { id: 11, label: "DEZ" },
];

async function getUserValorDisponivel() {
  $q.loading.show();
  const docRef = doc(db, "usuarios", user.value.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    valorDisponivel.value = docSnap.data().valorDisponivel;
    getUserDespesasMes();
  } else {
    console.log("No such document!");
    $q.loading.hide();
  }
}

async function getUserDespesasMes(id) {
  const despesasQuery = query(
    collection(db, "despesas"),
    and(
      where("refUsuario", "==", String(user.value.uid)),
      where("dataFim", ">=", new Date(anoAtual.value, mesAtual.value.id, 1)),
    ),
  );

  const despesasQuerySnapshot = await getDocs(despesasQuery);

  for (const doc of despesasQuerySnapshot.docs) {
    const dateDiff = date.getDateDiff(
      new Date(anoAtual.value, mesAtual.value.id, 1),
      doc.data().dataInicio.toDate().toDateString(),
      "months",
    );

    if (dateDiff >= 0 || doc.data().despesaFixa) {
      valorTotal.value += doc.data().valorTotal;
      valorMes.value += doc.data().valorTotal / doc.data().parcelas;
    }
  }
  $q.loading.hide();
}

function btnClick_IrDetalhes() {
  router.push("despesas");
}

function btnClick_NovoGasto() {
  router.push("despesas/cadastro");
}

function formatarDinheiro(value) {
  return value.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
}

onMounted(() => {
  const dataAtual = new Date();
  mesAtual.value = listaMeses[dataAtual.getMonth()];
  anoAtual.value = dataAtual.getUTCFullYear();

  getUserValorDisponivel();
});
</script>
