import { h } from "vue";
import { RouterView } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "MainPage",
        component: () => import("src/pages/MainPage.vue"),
        meta: { pageTitle: "Página Inicial", requiresAuth: true },
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
            meta: { pageTitle: "Cartões", requiresAuth: true },
          },
          {
            path: "detalhes",
            name: "DetalhesDoCartao",
            component: () => import("src/pages/Cartoes/CartoesDespesas.vue"),
            meta: {
              pageTitle: "Detalhes do Cartão",
              requiresAuth: true,
              showBackButton: true,
            },
          },
          {
            path: "cadastro",
            name: "CadastrarCartao",
            component: () => import("src/pages/Cartoes/CartoesCadastro.vue"),
            meta: {
              pageTitle: "Cadastrar Cartão",
              requiresAuth: true,
              showBackButton: true,
            },
          },
        ],
      },
      {
        path: "/despesas",
        name: "Despesas",
        component: () => import("src/pages/ListaDespesas.vue"),
        meta: { pageTitle: "Despesas", requiresAuth: true },
      },
    ],
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
