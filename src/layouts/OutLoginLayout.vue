<template>
  <q-layout view="lHh Lpr lFf">
    <q-header :class="{ 'bg-white': ! $q.dark.isActive, 'q-dark': $q.dark.isActive }">
      <q-toolbar>
        <q-space />
        <q-toggle name="dark" v-model="darkMode" icon="dark_mode" @click="darkModeChange" />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { useQuasar } from 'quasar'
import { ref } from 'vue'

export default {

  setup () {
    const $q = useQuasar()
    const darkMode = ref($q.dark.isActive)

    return {
      darkMode,
      darkModeChange () {
        $q.dark.set(!$q.dark.isActive)
      }
    }
  }
}
</script>
