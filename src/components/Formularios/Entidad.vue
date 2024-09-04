<template>
  <q-form
    class="row q-col-gutter-md"
    @submit="$emit('guardar')"
  >
    <q-input
      square
      class="col-xs-12 col-md-8"
      label="Nombre"
      v-model="valoresModel.nombre"
      :rules="valoresRules.nombre"
    >
    </q-input>
    <q-input
      square
      class="col-xs-12 col-md-4"
      label="Sigla"
      v-model="valoresModel.sigla"
      :rules="valoresRules.sigla"
    ></q-input>
    <q-input
      square
      class="col-xs-12 col-md-12"
      label="Descripcion"
      v-model="valoresModel.descripcion"
      :rules="valoresRules.descripcion"
    ></q-input>
    <q-input
      square
      class="col-xs-12 col-md-6"
      label="Email"
      v-model="valoresModel.email"
      :rules="valoresRules.email"
    ></q-input>
    <q-input
      square
      class="col-xs-12 col-md-6"
      label="Web"
      v-model="valoresModel.web"
      :rules="valoresRules.nombre"
    ></q-input>
    <q-input
      square
      class="col-xs-12 col-md-12"
      label="Direccion"
      v-model="valoresModel.direccion"
      :rules="valoresRules.nombre"
    ></q-input>
    <q-input
      square
      class="col-xs-12 col-md-6"
      label="Telefono"
      v-model="valoresModel.telefono"
      :rules="valoresRules.nombre"
    ></q-input>

    <q-select
      square
      clearable
      v-model="valoresModel.idEntidad"
      :options="entidades"
      option-value="id"
      option-label="nombre"
      label="Entidad superior"
      map-options
      emit-value
      class="col-xs-12 col-md-6"
    />
    <q-input
      square
      class="col-xs-12 col-md-6"
      label="Nivel"
      v-model="valoresModel.nivel"
      :rules="valoresRules.nombre"
    ></q-input>
    <div class="col-xs-12 text-right">
      <q-btn
        label="Cancelar"
        @click="$emit('cancelar')"
      />
      <q-btn
        label="Guardar"
        type="submit"
        color="primary"
        class="q-ml-sm"
      />
    </div>
  </q-form>
</template>
<script>

import { useVModel } from '../../composables/useVModel.js'
import { ref, onMounted, inject } from 'vue'
export default {
  props: {
    valores: {
      type: Object,
      default: () => ({})
    }
  },
  setup (props) {
    const _http = inject('http')
    const valoresModel = useVModel(props, 'valores')
    const entidades = ref([])
    const valoresRules = ref({})

    onMounted(async () => {
      const { rows } = await _http.get('/system/entidades')
      entidades.value = rows
    })

    return {
      valoresModel,
      valoresRules,
      entidades
    }
  }
}
</script>
