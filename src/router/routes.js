import { h } from "vue";
import { RouterView } from "vue-router";

import { useUserStore } from "stores/user-store";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const requireUserLogin = (to, from, next) => {
  // const auth = getAuth();
  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     console.log(user);
  //     next();
  //   } else {
  //     next({ path: "/login", query: { type: "errorLogin" } });
  //     return;
  //   }
  // });
  // console.log("oi");
  // const userStore = useUserStore();
  // if (!userStore.isUserLoggedIn) {
  //   next({ path: "/login", query: { type: "errorLogin" } });
  //   return;
  // }
  // next();
};

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "Main Page",
        component: () => import("src/pages/MainPage.vue"),
        meta: { pageTitle: "Página Inicial" },
      },
      {
        path: "/cartoes",
        name: "CartoesRender",
        component: { render: () => h(RouterView) },
        children: [
          {
            path: "",
            name: "Cartoes",
            component: () => import("src/pages/Cartoes/CartoesLista.vue"),
            meta: { pageTitle: "Cartões" },
          },
          {
            path: "detalhes",
            name: "Detalhes do Cartao",
            component: () => import("src/pages/Cartoes/CartoesDespesas.vue"),
            meta: { pageTitle: "Detalhes do Cartão", showBackButton: true },
          },
          {
            path: "cadastro",
            name: "Cadastrar Cartao",
            component: () => import("src/pages/Cartoes/CartoesCadastro.vue"),
            meta: { pageTitle: "Cadastrar Cartão", showBackButton: true },
          },
        ],
      },
      {
        path: "/despesas",
        name: "Despesas",
        component: () => import("src/pages/ListaDespesas.vue"),
        meta: { pageTitle: "Despesas" },
      },
    ],
    // beforeEach: requireUserLogin,
  },
  {
    path: "/login",
    component: () => import("layouts/CleanLayout.vue"),
    children: [
      {
        path: "",
        name: "Login",
        component: () => import("src/pages/LoginPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
