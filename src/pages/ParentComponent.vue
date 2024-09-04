<template>
    <q-page padding>
      <q-btn label="Abrir Modal" color="primary" @click="showModal = true" />
      
      <!-- Modal principal -->
      <q-dialog v-model="showModal">
        <child-card @attempt-close="confirmClose" />
      </q-dialog>
      
      <!-- Alerta de confirmación -->
      <q-dialog v-model="showConfirmation">
        <q-card>
          <q-card-section>
            <div class="text-h6">Confirmación</div>
            <div>¿Estás seguro de que quieres cerrar el modal?</div>
          </q-card-section>
          <q-separator />
          <q-card-actions align="right">
            <q-btn flat label="Cancelar" color="primary" @click="showConfirmation = false" />
            <q-btn flat label="Cerrar" color="negative" @click="closeModal" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-page>
  </template>
  
  <script>
  import ChildCard from 'components/Formularios/ChildCard.vue'
  
  export default {
    components: {
      ChildCard
    },
    data() {
      return {
        showModal: false,
        showConfirmation: false
      }
    },
    methods: {
      confirmClose() {
        this.showConfirmation = true;
      },
      closeModal() {
        this.showModal = false;
        this.showConfirmation = false;
      }
    }
  }
  </script>
  
  <style>
  /* Añade estilos personalizados aquí si es necesario */
  </style>
  