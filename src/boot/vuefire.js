import { boot } from "quasar/wrappers";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { VueFire, VueFireAuth, getCurrentUser } from "vuefire";

export default boot(async ({ app, router }) => {
  const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const db = getFirestore(firebaseApp);

  app.use(VueFire, {
    firebaseApp,
    modules: [VueFireAuth()],
  });

  router.beforeEach(async (to) => {
    if (to.meta.requiresAuth) {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        return {
          path: "/login",
          query: {
            redirect: to.fullPath,
          },
        };
      }
    }
  });
});
