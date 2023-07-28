<template>
  <div class="row">
    <div class="col-xs-2 col-sm-1">
      <q-btn
        flat
        round
        class="font_15"
        color="primary"
        icon="fas fa-arrow-left"
        @click="btnClick_Decrease"
      />
    </div>
    <div class="col-xs-8 col-sm-10 font_15 flex flex-center">
      {{ mesAtual.label }} / {{ anoAtual }}
    </div>
    <div class="col-xs-2 col-sm-1 flex justify-end">
      <q-btn
        flat
        round
        class="font_15"
        color="primary"
        icon="fas fa-arrow-right"
        @click="btnClick_Increase"
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

const emit = defineEmits(["mudarData"]);

let mesAtual = ref({ id: 6, label: "JUL" });
let anoAtual = ref(1998);
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
// const yearList = [
//   1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010,
//   2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023,
//   2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036,
//   2037, 2038, 2039, 2040, 2041, 2042, 2043, 2044, 2045, 2046, 2047, 2048, 2049,
//   2050,
// ];

onMounted(() => {
  const dataAtual = new Date();
  mesAtual.value = listaMeses[dataAtual.getMonth()];
  anoAtual.value = dataAtual.getUTCFullYear();
});

function btnClick_Decrease() {
  if (mesAtual.value.id - 1 === -1) {
    mesAtual.value = listaMeses[11];
    anoAtual.value = anoAtual.value - 1;
  } else {
    mesAtual.value = listaMeses[mesAtual.value.id - 1];
  }
  emit("mudarData", {
    mes: mesAtual.value,
    ano: anoAtual.value,
  });
}

function btnClick_Increase() {
  if (mesAtual.value.id + 1 === 12) {
    mesAtual.value = listaMeses[0];
    anoAtual.value = anoAtual.value + 1;
  } else {
    mesAtual.value = listaMeses[mesAtual.value.id + 1];
  }
  emit("mudarData", {
    mes: mesAtual.value,
    ano: anoAtual.value,
  });
}
</script>
