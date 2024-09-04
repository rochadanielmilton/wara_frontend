<template>
  <q-form class="row q-col-gutter-md" @submit="$emit('guardar')">
    <q-select v-model="valoresModel.ministerio_id" square class="col-xs-12 col-md-6" :options="departamentos"
      label="Ministerio" option-value="id" option-label="nombre" use-chips emit-value map-options
      :rules="valoresRules.ministerio_id" />

    <q-select v-model="valoresModel.descentralizadas_ids" square class="col-xs-12 col-md-6" :options="provincias"
      label="Descentralizadas" option-value="id" option-label="nombre" use-chips emit-value map-options multiple
      :rules="valoresRules.descentralizadas_ids" />

    <q-input square class="col-xs-12 col-md-12" label="Nombre" v-model="valoresModel.nombre"
      :rules="[  val => val.length <= 30 || 'Como maximo solo debe tener  30 carácteres.',val => !!val || 'Este campo es requerido',]" />
    <q-input square class="col-xs-12 col-md-12" label="Dirección" v-model="valoresModel.direccion"
      :rules="valoresRules.nombre" />
    <q-input square class="col-xs-12 col-md-12" label="Email" v-model="valoresModel.email"
      :rules="valoresRules.meail" />
      <q-toggle
        v-model="valoresModel.estado"
        :label="`Estado ${valoresModel.estado==estados.ON ? estados.ON : estados.OFF}`"
        color="primary"
        :false-value="estados.OFF"
        :true-value="estados.ON"
    />
      <div class="col-xs-12 text-right">
      <q-btn class="q-ml-sm" icon="close" label="Cancelar" @click="$emit('cancelar')" />
      <q-btn class="q-ml-sm" icon="check" color="primary" label="Guardar" type="submit" />
    </div>
  </q-form>
</template>

<script>
import { useVModel } from '../../composables/useVModel.js';
import { ref, onMounted, inject } from 'vue';
import validaciones from '../../common/validations';
import { estados } from 'src/constants/estados';
import axios from "axios";

const valoresRules = {
  nombre: [validaciones.minimoCincuenta],
  ministerio_id: [validaciones.requerido],
  descentralizadas_ids: [validaciones.requerido],

};

export default {
  props: {
    valores: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const _http = inject("http");
    const valoresModel = useVModel(props, 'valores');
    const departamentos = ref([]);
    const provincias = ref([]);

    onMounted(async () => {
      departamentos.value = await getDepartamentos();
      provincias.value = await getProvincias();
    });

    async function getDepartamentos() {
      try {
        const {results} = await _http.get(`/ministerios/`);
       // const response = await _http.get("http://127.0.0.1:8000/api/ministerios/");
        return results;
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
        return [];
      }
    }

    async function getProvincias() {
      try {
        const {results} = await _http.get("/descentralizadas/");
        return results;
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
        return [];
      }
    }


    return {
      valoresModel,
      valoresRules,

      departamentos,
      provincias,
      estados
    };
  }
};
</script>
