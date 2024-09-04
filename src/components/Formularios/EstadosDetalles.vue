<template>
    <q-form ref="usuario" @submit="$emit('guardar')" class="row q-col-gutter-md">
      <q-input square class="col-xs-12 col-md-6" label="Estado Detallado" v-model="valoresModel.nombre"
        :rules="valoresRules.nombre" ></q-input>
      <q-select v-model="valoresModel.estado_proyecto" square class="col-xs-12 col-md-6" :options="roles"
        label="Estado" option-value="id" option-label="nombre" use-chips emit-value map-options
        :rules="valoresRules.estado_id" />
  
      <q-toggle v-model="valoresModel.estado" color="primary" :false-value="estados.OFF" :true-value="estados.ON" />
  
  
      <div class="col-xs-12 text-right q-gutter-sm">
        <q-btn icon="close" label="Cancelar" @click="$emit('cancelar')" />
        <q-btn icon="check" color="primary" label="Guardar" type="submit" />
      </div>
    </q-form>
  </template>
  <script>
  import axios from "axios";
  import { useVModel } from "../../composables/useVModel.js";
  import { ref, onMounted, inject } from "vue";
  import validaciones from "../../common/validations";
  import { estados } from 'src/constants/estados';
  
  const valoresRules = {
    nombre: [validaciones.requerido,validaciones.maximo100],
    estado_id: [validaciones.requerido],
  };
  
  
  export default {
    props: {
      valores: {
        type: Object,
        default: () => ({}),
      },
    },
    setup(props) {
      const _http = inject("http");
      const valoresModel = useVModel(props, "valores");
      const entidades = ref([]);
      const roles = ref([[]]);
      const selectedRole = ref(null);
      onMounted(async () => {
        try {
          roles.value = await getDepartamentos();
        } catch (error) {
          console.error("Error al obtener roles:", error);
        }
      });
      async function getDepartamentos() {
        try {
          const {results} = await _http.get("/estados/");
          return results;
        } catch (error) {
          console.error("Error al realizar la solicitud:", error);
          return [];
        }
      }
  
      return {
        estados,
        valoresModel,
        valoresRules,
        entidades,
        roles,
        selectedRole,
      };
    },
  };
  </script>
  