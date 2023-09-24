<template>
  <q-page class="q-pa-lg">
    <q-form @submit="cadastrar">
      <div class="row">
        <!-- <div class="col-xs-12 col-sm-10 col-md-8 col-lg-6 col-xl-4"> -->
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
        <div class="col-6">
          <q-input
            filled
            clearable
            label="Data Inicio"
            v-model="despesasStore.dataInicio"
            mask="date"
            :rules="['date']"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="despesasStore.dataInicio">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div
          class="col-xs-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4 q-pt-sm"
        >
          <q-option-group
            inline
            type="radio"
            v-model="despesasStore.tipo"
            :options="radioOptions"
          />
        </div>
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
import { useDespesasStore } from "../../stores/despesas-store.js";
import { onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";

import QCurrencyInput from "components/QCurrencyInput.vue";

import { useFirestore, useCurrentUser } from "vuefire";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const despesasStore = useDespesasStore();
const db = useFirestore();
const user = useCurrentUser();
const router = useRouter();

const radioOptions = [
  { label: "Cartão", value: 0, color: "orange" },
  { label: "Dinheiro", value: 1, color: "green" },
  { label: "Despesa Fixa", value: 99, color: "blue" },
];

async function cadastrar() {}

onBeforeUnmount(() => {
  despesasStore.$reset();
});
</script>
