<template>
  <q-form class="row q-col-gutter-md" @submit="$emit('guardar')">
    <q-select v-model="valoresModel.departamento_id" square class="col-xs-12 col-md-6" :options="departamentos"
      label="Departamento" option-value="id" option-label="nombre" use-chips emit-value map-options
      :rules="valoresRules.departamento_id" />

    <q-select v-model="valoresModel.provincia_id" square class="col-xs-12 col-md-6" :options="filteredProvincias"
      label="Provincia" option-value="id" option-label="nombre" use-chips emit-value map-options
      :rules="valoresRules.provincia_id" />

    <q-input square class="col-xs-12 col-md-12" label="Municipio" v-model="valoresModel.nombre"
      :rules="valoresRules.nombre" />

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
import { ref, onMounted, inject, computed } from 'vue';
import validaciones from '../../common/validations';
import { estados } from 'src/constants/estados';

const valoresRules = {
  nombre: [validaciones.requerido,validaciones.maximo100],
  departamento_id: [validaciones.requerido],
  provincia_id: [validaciones.requerido],

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
        const {results} = await _http.get("/departamentos/");
        return results;
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
        return [];
      }
    }

    async function getProvincias() {
      try {
        const {results} = await _http.get("/provincias/");
        return results;
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
        return [];
      }
    }

    const filteredProvincias = computed(() => {
      console.log(JSON.stringify(provincias));
      return valoresModel.value.departamento_id != null&&valoresModel.value.departamento_id != ""
        ? provincias.value.filter(p => p.departamento.id == valoresModel.value.departamento_id)
        : [];
    });

    return {
      estados,
      valoresModel,
      valoresRules,
      filteredProvincias,
      departamentos,
      provincias
    };
  }
};
</script>
