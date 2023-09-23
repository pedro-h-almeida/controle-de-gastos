<template>
  <q-page>
    <!-- <q-page padding :style-fn="myTweak"> -->
    <q-form @submit="login">
      <!-- <q-form @submit="login" class="full-height"> -->
      <div class="row flex-center content-center" style="height: 100vh">
        <!--  -->
        <div class="col-xs-1 col-md-3 col-lg-4 col-xl-5" />
        <!--  -->
        <div class="col-xs-10 col-md-6 col-lg-4 col-xl-2">
          <div class="q-pl-xs text-body1">Email:</div>
          <q-input
            filled
            clearable
            v-model="input_email"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Obrigatório']"
          />
        </div>
        <!--  -->
        <div class="col-xs-1 col-md-3 col-lg-4 col-xl-5" />
        <div class="col-xs-1 col-md-3 col-lg-4 col-xl-5" />
        <!--  -->
        <div class="col-xs-10 col-md-6 col-lg-4 col-xl-2">
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
        </div>
        <!--  -->
        <div class="col-xs-1 col-md-3 col-lg-4 col-xl-5" />
        <div class="col-xs-1 col-md-3 col-lg-4 col-xl-5" />
        <!--  -->
        <div class="col-xs-10 col-md-6 col-lg-4 col-xl-2">
          <q-btn
            class="q-mt-lg full-width q-pa-sm"
            label="Entrar"
            type="submit"
            color="primary"
          />
        </div>
        <!--  -->
        <div class="col-xs-1 col-md-3 col-lg-4 col-xl-5" />
        <!--  -->
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import SimpleInfoDialog from "../components/SimpleInfoDialog.vue";
// import { useUserStore } from "../stores/user-store.js";

import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { useFirebaseAuth } from "vuefire";

const $q = useQuasar();
const router = useRouter();
// const userStore = useUserStore();
const auth = useFirebaseAuth();

const isPwd = ref(true);
const input_email = ref("pedro.henrique.almeida.tey@gmail.com");
const input_password = ref("6s&P5JeWL!6jTcJCsdK#");

function login() {
  $q.loading.show();
  signInWithEmailAndPassword(auth, input_email.value, input_password.value)
    .then((res) => {
      $q.loading.hide();
      console.log(res);
      success();
    })
    .catch((error) => {
      $q.loading.hide();
      displayError(error.message);
    });
}

function success(params) {
  // userStore.email = params.email;
  // userStore.userUID = params.uid;
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
  auth.signOut();
  // userStore.$reset();
});

// function myTweak(offset) {
//   // "offset" is a Number (pixels) that refers to the total
//   // height of header + footer that occupies on screen,
//   // based on the QLayout "view" prop configuration

//   // this is actually what the default style-fn does in Quasar
//   return {
//     minHeight: offset ? `calc(100vh - ${offset}px)` : "100vh",
//     height: offset ? `calc(100vh - ${offset}px)` : "100vh",
//   };
// }
</script>
