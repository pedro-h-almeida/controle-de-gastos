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
            v-model="cartaoStore.descricao"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Obrigatório']"
          />
        </div>
        <div
          class="col-xs-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4 q-pt-sm"
        >
          <q-input
            filled
            clearable
            label="Limite"
            v-model="cartaoStore.limite"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Obrigatório']"
            prefix="R$"
            mask="###.###.###.###.###"
            unmasked-value
            reverse-fill-mask
          />
        </div>
        <div
          class="col-xs-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4 q-pt-sm"
        >
          <q-input
            filled
            label="Cor"
            v-model="cartaoStore.cor"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Obrigatório']"
          >
            <template v-slot:prepend>
              <q-icon
                name="fa-solid fa-droplet"
                :style="`color: ${cartaoStore.cor}`"
              />
            </template>
            <template v-slot:append>
              <q-icon name="colorize" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-color v-model="cartaoStore.cor" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div
          class="col-xs-8 offset-xs-4 col-sm-5 offset-sm-6 col-md-4 offset-md-6 col-lg-3 offset-lg-6 col-xl-2 offset-xl-6"
        >
          <q-btn
            class="q-mt-lg full-width q-pa-sm"
            label="Cadastrar"
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
import { useCartaoStore } from "../../stores/cartao-store.js";
import { onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";

import { useFirestore, useCurrentUser } from "vuefire";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const cartaoStore = useCartaoStore();
const db = useFirestore();
const user = useCurrentUser();
const router = useRouter();

async function cadastrar() {
  const docRef = await addDoc(
    collection(db, "usuarios", user.value.uid, "cartoes"),
    {
      descricao: cartaoStore.descricao,
      cor: cartaoStore.cor,
      limite: Number(cartaoStore.limite),
      createdAt: Timestamp.fromDate(new Date()),
    },
  );
  console.log("Document written with ID: ", docRef.id);
  router.push("/cartoes");
}

onBeforeUnmount(() => {
  cartaoStore.$reset();
});
</script>
