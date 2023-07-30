import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";

import { useHeaderStore } from "stores/header-store";
import { useUserStore } from "stores/user-store";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach(async (to, from) => {
    console.log("oi");
    const userStore = useUserStore();
    if (!userStore.isUserLoggedIn && to.name !== "Login") {
      return { name: "Login" };
    }
  });

  Router.afterEach((to, from) => {
    const headerStore = useHeaderStore();
    console.log("to: ", to);
    console.log("from: ", from);
    console.log("-----------------");
    headerStore.pageTitle = to.meta.pageTitle;
    if (to.meta.showBackButton) {
      headerStore.showBackButton = true;
    } else {
      headerStore.showBackButton = false;
    }
  });

  return Router;
});
