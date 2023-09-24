<template>
  <q-input ref="inputRef" v-model="formattedValue" />
</template>

<script setup>
import { useCurrencyInput } from "vue-currency-input";
import { watch } from "vue";

const props = defineProps({
  modelValue: Number,
  options: Object,
});

const { inputRef, formattedValue, numberValue, setValue, setOptions } =
  useCurrencyInput(props.options);

watch(
  () => props.modelValue,
  (value) => {
    setValue(value);
  },
);
</script>
