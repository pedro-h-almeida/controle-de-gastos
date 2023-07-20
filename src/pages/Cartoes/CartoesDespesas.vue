<template>
  <q-page>
    <q-card bordered>
      <q-card-section class="q-pa-sm" :style="bColor">
        <div class="text-h4 text-center">{{ creditCardName }}</div>
      </q-card-section>
      <q-separator />
      <q-card-section class="q-pa-sm">
        <MonthYearSelector @mudarData="monthYearSelector_valueChange" />
      </q-card-section>
      <q-separator />
      <q-card-section class="q-pa-sm">
        <q-list>
          <template v-if="filteredExpensesList.length > 0">
            <template
              v-for="(element, index) in filteredExpensesList"
              v-bind:key="index"
            >
              <q-separator v-if="index !== 0" />
              <q-item>
                <q-item-section>
                  <q-item-label>{{ element.descricao }}</q-item-label>
                  <q-item-label caption>{{
                    formatMoneyValue(element.valorTotal / element.prestacoes)
                  }}</q-item-label>
                </q-item-section>

                <q-item-section side top>
                  <q-item-label caption>{{
                    formatInstallments(
                      element.dates.inicioDespesa,
                      element.prestacoes
                    )
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
      <q-card-section class="q-pa-md" :style="bColor">
        <div class="row justify-between">
          <div class="col">
            <div class="row justify-start">
              <div class="text-weight-bolder">Total:</div>
              &nbsp;
              <div class="">{{ formatMoneyValue(monthlyExpenses) }}</div>
            </div>
          </div>
          <div class="col">
            <div class="row justify-end">
              <div class="text-weight-bolder">Limite:</div>
              &nbsp;
              <div class="">{{ formatMoneyValue(creditCardLimit) }}</div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style lang="scss" scoped></style>

<script setup>
import { ref, onMounted } from "vue";
import { date } from "quasar";
import MonthYearSelector from "src/components/pages/Cartoes/mes-ano-selector.vue";

const creditCardName = "Caixa";
const bColor = `background-color: #033f99;`;
const creditCardLimit = 2000;
const monthlyExpenses = ref(0);
const monthYearSelector_value = {
  day: "01",
  mes: "07",
  ano: "1998",
};
const filteredExpensesList = ref([]);
const creditCardExpensesFullList = [
  {
    id: 0,
    descricao: "Kabum",
    valorTotal: 2400.0,
    prestacoes: 12,
    dates: {
      inicioDespesa: "01/02/2023",
      fimDespesa: "01/01/2024",
    },
  },
  {
    id: 1,
    descricao: "Mercado Livre",
    valorTotal: 349.9,
    prestacoes: 3,
    dates: {
      inicioDespesa: "01/10/2022",
      fimDespesa: "01/12/2022",
    },
  },
  {
    id: 2,
    descricao: "Shein",
    valorTotal: 79.8,
    prestacoes: 1,
    dates: {
      inicioDespesa: "01/01/2023",
      fimDespesa: "01/01/2023",
    },
  },
  {
    id: 3,
    descricao: "Riot Games",
    valorTotal: 169.76,
    prestacoes: 12,
    dates: {
      inicioDespesa: "01/04/2022",
      fimDespesa: "01/03/2023",
    },
  },
];

onMounted(() => {
  const currentDate = new Date();

  monthYearSelector_value.mes = currentDate.getMonth();
  monthYearSelector_value.ano = currentDate.getUTCFullYear();

  filterExpensesList();
});

function monthYearSelector_valueChange({ mes, ano }) {
  monthYearSelector_value.mes = `${mes.id}`;
  monthYearSelector_value.ano = ano;

  filterExpensesList();
}

function filterExpensesList() {
  filteredExpensesList.value = [];
  monthlyExpenses.value = 0;

  creditCardExpensesFullList.forEach((element) => {
    if (monthCheck(element.dates)) {
      filteredExpensesList.value.push(element);
      monthlyExpenses.value += element.valorTotal / element.prestacoes;
    }
  });
}

function monthCheck(dates) {
  const filterDate = new Date(
    monthYearSelector_value.ano,
    monthYearSelector_value.mes,
    monthYearSelector_value.day
  );
  const expenseStartDateFormatted = date.extractDate(
    dates.inicioDespesa,
    "DD/MM/YYYY"
  );
  const expenseEndDateFormatted = date.extractDate(
    dates.fimDespesa,
    "DD/MM/YYYY"
  );

  const isBetweenDates = date.isBetweenDates(
    filterDate,

    expenseStartDateFormatted,

    expenseEndDateFormatted,
    {
      inclusiveFrom: true,
      inclusiveTo: true,
      onlyDate: true,
    }
  );

  return isBetweenDates;
}

function formatMoneyValue(moneyValue) {
  return moneyValue.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
}

function formatInstallments(startDate, installments) {
  const expenseStartDateFormatted = date.extractDate(startDate, "DD/MM/YYYY");
  const filterDate = new Date(
    monthYearSelector_value.ano,
    monthYearSelector_value.mes,
    monthYearSelector_value.day
  );

  const diff = date.getDateDiff(
    filterDate,

    expenseStartDateFormatted,
    "months"
  );

  const installmentsText = `${diff + 1}/${installments}`;

  return installmentsText;
}
</script>
