<template>
  <q-form
    ref="parametro"
    class="row q-col-gutter-sm"
    @submit="$emit('guardar')"
  >
    <q-input
      square
      class="col-xs-12 col-md-6"
      label="Grupo"
      v-model="valoresModel.grupo"
      :rules="valoresRules.grupo"
    />
    <q-input
      square
      class="col-xs-12 col-md-6"
      label="Nombre"
      v-model="valoresModel.nombre"
      :rules="valoresRules.nombre"
    />
    <q-input
      square
      class="col-xs-12 col-md-6"
      label="Descripcion"
      v-model="valoresModel.descripcion"
      :rules="valoresRules.descripcion"
    />
    <q-input
      square
      class="col-xs-12 col-md-6"
      label="Codigo"
      v-model="valoresModel.codigo"
      :rules="valoresRules.codigo"
    ></q-input>
    <div class="col-xs-12 text-right">
      <q-btn
        class="q-ml-sm"
        icon="close"
        label="Cancelar"
        @click="$emit('cancelar')"
      />
      <q-btn
        class="q-ml-sm"
        icon="check"
        color="primary"
        label="Guardar"
        type="submit"
      />
    </div>
  </q-form>
</template>
<script>

import { useVModel } from '../../composables/useVModel.js'
import { ref, onMounted, inject } from 'vue'
import validaciones from '../../common/validations'

const valoresRules = {
  nombre: [
    validaciones.requerido
  ],
  descripcion: [
    validaciones.requerido
  ],
  idEntidad: [
    validaciones.requerido
  ]
}

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
