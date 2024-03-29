import { h } from "vue";
import { RouterView } from "vue-router";

import { useUserStore } from "stores/user-store";

const requireUserLogin = (to, from, next) => {
  const userStore = useUserStore();
  if (userStore.email === "") {
    next({ path: "/login", query: { type: "errorLogin" } });
    return;
  }
  next();
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
        ],
      },
      {
        path: "/despesas",
        name: "Despesas",
        component: () => import("src/pages/ListaDespesas.vue"),
        meta: { pageTitle: "Despesas" },
      },
    ],
    beforeEnter: requireUserLogin,
  },
  {
    path: "/login",
    component: () => import("layouts/CleanLayout.vue"),
    children: [
      { path: "", component: () => import("src/pages/LoginPage.vue") },
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
