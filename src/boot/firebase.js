import { boot } from "quasar/wrappers";
import { initializeApp } from "firebase/app";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import { useUserStore } from "stores/user-store";

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async (/* { app, router, ... } */) => {
  const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
  };

  const app = initializeApp(firebaseConfig);
  console.log("Firebase App ", app);
  console.log("---------------------------");
  // something to do

  const auth = getAuth();
  const userStore = useUserStore();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      userStore.isUserLoggedIn = true;
    } else {
      userStore.isUserLoggedIn = false;
    }
  });
});
