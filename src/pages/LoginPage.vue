<template>
  <q-page padding class="flex flex-center">
    <div class="full-width q-pa-sm">
      <!-- <div class="text-h3 text-center">Login</div> -->
      <q-form @submit="login">
        <!-- <div class="row flex-center"> -->
        <!-- <div class="col-12 q-pa-sm"> -->
        <div class="q-pl-xs text-body1">Email:</div>
        <q-input
          filled
          clearable
          v-model="input_email"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Obrigatório']"
        />
        <div class="q-pl-xs q-pt-sm text-body1">Senha:</div>
        <q-input
          filled
          v-model="input_password"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Obrigatório']"
          :type="isPwd ? 'password' : 'text'"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <!-- </div> -->
        <q-btn
          class="q-mt-lg full-width q-pa-sm"
          label="Entrar"
          type="submit"
          color="primary"
        />
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import SimpleInfoDialog from "../components/SimpleInfoDialog.vue";
import { useUserStore } from "../stores/user-store.js";

import { FirebaseAuthentication } from "@capacitor-firebase/authentication";

const $q = useQuasar();
const router = useRouter();
const userStore = useUserStore();

const isPwd = ref(true);
const input_email = ref("pedro.henrique.almeida.tey@gmail.com");
const input_password = ref("6s&P5JeWL!6jTcJCsdK#");

function login() {
  FirebaseAuthentication.signInWithEmailAndPassword({
    email: input_email.value,
    password: input_password.value,
  })
    .then((res) => {
      success(res.user);
    })
    .catch(() => {
      displayError("Usuário não encontrado");
    });
}

function success(params) {
  userStore.email = params.email;
  // userStore.$reset();
  router.push("/");
}

function displayError(error) {
  $q.dialog({
    component: SimpleInfoDialog,
    componentProps: {
      text: error,
      type: "negative",
    },
  }).onOk(() => {
    console.log("ERROR DIALOG CLOSED");
  });
}

onMounted(() => {
  userStore.$reset();
});
</script>
