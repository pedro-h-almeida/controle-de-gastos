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
        />
        <q-toolbar-title> Quasar App </q-toolbar-title>
        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" overlay elevated>
      <q-list>
        <q-item-label header> Controle de Gastos </q-item-label>

        <div v-for="(element, index) in drawerList" v-bind:key="index">
          <q-separator v-if="element.type === 'separator'" spaced />
          <DrawerItemComponent
            v-if="element.type === 'normal-item'"
            :label="element.label"
            :route="element.route"
            :icon="element.icon"
          />
        </div>
      </q-list>
    </q-drawer>

    <q-page-container>
      <div class="q-pa-md">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref } from "vue";

import DrawerMenuList from "./drawer-menu-list.js";
import DrawerItemComponent from "src/components/layouts/Drawer/drawer-item.vue";

const $q = useQuasar();
const leftDrawerOpen = ref(false);
const drawerList = ref(DrawerMenuList);

$q.dark.set(true);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
