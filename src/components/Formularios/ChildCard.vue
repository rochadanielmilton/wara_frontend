<template>
    <q-card>
      <q-card-section>
        <div class="text-h6">Formulario importante</div>
        <div>Por favor, no cierre este modal hasta completar el formulario.</div>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn flat label="Cerrar" color="primary" @click="attemptClose" />
      </q-card-actions>
    </q-card>
  </template>
  
  <script>
  export default {
    name: 'ChildCard',
    methods: {
      attemptClose() {
        this.$emit('attempt-close');
      }
    }
  }
  </script>
  
  <style scoped>
  /* Añade estilos personalizados aquí si es necesario */
  </style>
  