<template>
  <q-item
    class="item-color"
    clickable
    :exact="props.route === '/'"
    v-ripple
    :to="props.route"
  >
    <q-item-section avatar class="item-section-avatar" v-if="props.icon">
      <q-icon style="font-size: 20px" :name="props.icon" />
    </q-item-section>
    <q-item-section class="item-section-label">
      <q-item-label>
        {{ props.label }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<style lang="scss" scoped>
.item-color {
  color: var(--q-secondary) !important;
}

.item-section-avatar {
  min-width: 0px !important;
}

.item-section-label {
  font-size: 15px;
  font-weight: bold;
}

.q-item.q-router-link--active,
.q-item--active {
  color: var(--q-primary) !important;
  background-color: rgba(2, 123, 227, 0.2);
}
</style>

<script setup>
const props = defineProps({
  label: String,
  route: String,
  icon: String,
});
</script>
