<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" persistent>
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <div class="row">
          <div class="col-12 q-pb-md text-center">
            <q-icon :name="icons[type]" :color="type" size="4.5rem" />
          </div>
          <div class="col-12 text-center">
            <div class="text-h5">{{ text }}</div>
          </div>
        </div>
      </q-card-section>
      <q-separator dark style="margin: 8px" />
      <q-card-actions align="right">
        <q-btn :color="type" label="OK" @click="onDialogOK" text-color="dark" />
        <!-- :text-color="type === 'negative' ? 'light' : 'dark'" -->
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent } from "quasar";

/**
 * Dialog simples, mostra um icone e um texto
 * @param text Texto a ser mostrado -- DEFAULT: "DISPLAY_TEXT"
 * @param type Tipo do dialog || 'positive', 'negative', 'warning', 'info' -- DEFAULT: "positive"
 */
const props = defineProps({
  text: {
    type: String,
    default: "DISPLAY_TEXT",
  },
  type: {
    type: String,
    default: "positive",
  },
});
defineEmits([
  // REQUIRED; need to specify some events that your
  // component will emit through useDialogPluginComponent()
  ...useDialogPluginComponent.emits,
]);
const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent();
// dialogRef      - Vue ref to be applied to QDialog
// onDialogHide   - Function to be used as handler for @hide on QDialog
// onDialogOK     - Function to call to settle dialog with "ok" outcome
//                    example: onDialogOK() - no payload
//                    example: onDialogOK({ /*...*/ }) - with payload
// onDialogCancel - Function to call to settle dialog with "cancel" outcome
const icons = {
  positive: "check_circle",
  negative: "error",
  warning: "warning",
  info: "info",
};
</script>
