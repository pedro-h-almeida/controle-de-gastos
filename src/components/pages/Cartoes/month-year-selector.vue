<template>
  <div class="row">
    <div class="col-2">
      <q-btn
        flat
        round
        class="font_15"
        color="primary"
        icon="fas fa-arrow-left"
        @click="decrease"
      />
    </div>
    <div class="col font_15 flex flex-center">
      {{ currentMonth.label }} / {{ currentYear }}
    </div>
    <div class="col-2">
      <q-btn
        flat
        round
        class="font_15"
        color="primary"
        icon="fas fa-arrow-right"
        @click="increase"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.font_15 {
  font-size: 15px;
}
</style>

<script setup>
import { ref, onMounted } from "vue";

const emit = defineEmits(["changeDate"]);

let currentMonth = ref({ id: 6, label: "JUL" });
let currentYear = ref(1998);
const monthList = [
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
// const yearList = [
//   1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010,
//   2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023,
//   2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036,
//   2037, 2038, 2039, 2040, 2041, 2042, 2043, 2044, 2045, 2046, 2047, 2048, 2049,
//   2050,
// ];

onMounted(() => {
  const dataAtual = new Date();
  currentMonth.value = monthList[dataAtual.getMonth()];
  currentYear.value = dataAtual.getUTCFullYear();
});

function decrease() {
  if (currentMonth.value.id - 1 === -1) {
    currentMonth.value = monthList[11];
    currentYear.value = currentYear.value - 1;
  } else {
    currentMonth.value = monthList[currentMonth.value.id - 1];
  }
  emit("changeDate", {
    month: currentMonth.value,
    year: currentYear.value,
  });
}

function increase() {
  if (currentMonth.value.id + 1 === 12) {
    currentMonth.value = monthList[0];
    currentYear.value = currentYear.value + 1;
  } else {
    currentMonth.value = monthList[currentMonth.value.id + 1];
  }
  emit("changeDate", {
    month: currentMonth.value,
    year: currentYear.value,
  });
}
</script>
