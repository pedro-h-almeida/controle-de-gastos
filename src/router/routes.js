import { h } from "vue";
import { RouterView } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "Main Page",
        component: () => import("src/pages/MainPage.vue"),
      },
      {
        path: "/cartoes",
        name: "CartoesRender",
        component: { render: () => h(RouterView) },
        children: [
          {
            path: "",
            name: "Cartoes",
            component: () => import("src/pages/Cartoes/CreditCardList.vue"),
          },
          {
            path: "detalhes",
            name: "Detalhes Cartao",
            component: () => import("src/pages/Cartoes/CreditCardExpenses.vue"),
          },
        ],
      },

      {
        path: "/despesas",
        name: "Despesas",
        component: () => import("src/pages/ExpensesList.vue"),
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
