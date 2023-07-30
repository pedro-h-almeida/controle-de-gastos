// MENU ACEITA AS OPÇÕES DESCRITAS ABAIXO
// 1 - index: INDEX E USADO NA HORA DE CRIAR AS TRANSIÇÕES
// 2 - label: TEXTO QUE IRA APARECER NO MENU (Ex: 'Sair')
// 3 - route: ROTA QUE O MENU IRA REDIRECIONAR (Ex: '/login')
// 4 - type: TIPO DO ITEM - normal-item, separator, blank-space
// 5 - icon: ICONE AO LADO DO LABEL (Ex: 'fas fa-sign-out-alt')
// TODO MELHORAR A DESCRIÇÃO 6 - children: TRANSFORMAR EM UM MENU DE EXPANSÃO

export default [
  {
    type: "separator",
  },
  {
    index: 1,
    label: "Página Inicial",
    route: "/",
    type: "normal-item",
    icon: "fas fa-home",
  },
  {
    index: 2,
    label: "Cartões",
    route: "/cartoes",
    type: "normal-item",
    icon: "fas fa-credit-card",
  },
  {
    index: 3,
    label: "Despesas",
    route: "/despesas",
    type: "normal-item",
    icon: "fas fa-receipt",
  },
  {
    type: "separator",
  },
  {
    index: 0,
    label: "Sair",
    route: "/login",
    type: "log-out-item",
    icon: "fas fa-sign-out-alt",
  },
];
