import { ref } from "vue";
import { defineStore } from "pinia";

// import { getAuth, onAuthStateChanged } from "firebase/auth";

export const useUserStore = defineStore("user", () => {
  // const auth = getAuth();

  const email = ref("");
  const isUserLoggedIn = ref(false);

  function $reset() {
    email.value = "";
  }

  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     // User is signed in, see docs for a list of available properties
  //     // https://firebase.google.com/docs/reference/js/auth.user
  //     const uid = user.uid;
  //     console.log(user);
  //     // ...
  //     isUserLoggedIn.value = true;
  //   } else {
  //     // User is signed out
  //     // ...
  //     isUserLoggedIn.value = false;
  //   }
  // });

  return { $reset, email, isUserLoggedIn };
});
