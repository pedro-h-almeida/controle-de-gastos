<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
          v-if="!headerStore.showBackButton"
        />
        <q-btn
          flat
          dense
          round
          icon="arrow_back"
          aria-label="Voltar"
          @click="backButtonClick"
          v-if="headerStore.showBackButton"
        />
        <q-toolbar-title class="text-center">
          {{ headerStore.pageTitle }}
        </q-toolbar-title>
        <q-btn
          flat
          dense
          round
          icon="help_outline"
          aria-label="Ajuda"
          @click="helpButtonClick"
        />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" overlay elevated>
      <q-list>
        <q-item-label header> Controle de Gastos </q-item-label>

        <div v-for="(element, index) in drawerList" v-bind:key="index">
          <q-separator v-if="element.type === 'separator'" spaced />
          <DrawerItemComponent
            v-if="
              element.type === 'normal-item' || element.type === 'log-out-item'
            "
            :label="element.label"
            :route="element.route"
            :icon="element.icon"
            :type="element.type"
          />
        </div>
      </q-list>
    </q-drawer>

    <q-page-container>
      <div>
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

import { useHeaderStore } from "stores/header-store";

import DrawerMenuList from "./drawer-menu-list.js";
import DrawerItemComponent from "src/components/layouts/Drawer/drawer-item.vue";
import DrawerItemLogOutComponent from "src/components/layouts/Drawer/drawer-item-log-out.vue";

const $q = useQuasar();
const router = useRouter();
const headerStore = useHeaderStore();

const leftDrawerOpen = ref(false);
const drawerList = ref(DrawerMenuList);

$q.dark.set(true);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
function backButtonClick() {
  router.back();
}
function helpButtonClick() {
  console.log("MainLayout.vue / helpButtonClick");
}
</script>
