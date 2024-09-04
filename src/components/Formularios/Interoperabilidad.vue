<template>
  <q-stepper
    header-class="text-center"
    v-model="step"
    ref="stepper"
    color="info"
    animated
    flat
    class="no-padding"
    done-color="positive"
    inactive-color="grey"
  >
    <q-step
      :name="1"
      title="Datos Generales"
      caption="Informacion de la aplicación."
      icon="settings"
      :done="step > 1"
    >
      <q-form
        ref="formRol"
        class="row q-col-gutter-md"
      >
        <q-input
          square
          class="col-xs-12 col-md-8"
          label="Nombre de la aplicacion"
          v-model="valoresModel.nombre"
          :rules="valoresRules.nombre"
        />
        <q-input
          square
          class="col-xs-12 col-md-4"
          label="Duracion del token"
          v-model="valoresModel.caducidad"
          :rules="valoresRules.caducidad"
        >
          <template v-slot:append>
            Hrs.
          </template>
        </q-input>

        <q-input
          square
          type="textarea"
          class="col-xs-12"
          label="Descripcion"
          v-model="valoresModel.descripcion"
          :rules="valoresRules.descripcion"
        />
        <q-select
          square
          v-model="valoresModel.idEntidad"
          :options="entidades"
          option-value="id"
          option-label="nombre"
          label="Entidad"
          map-options
          emit-value
          class="col-xs-12"
          :rules="valoresRules.idEntidad"
        />
        <q-checkbox
          v-if="valoresModel.id"
          v-model="valoresModel.regenerar"
          label="Volver a generar el token"
        />

      </q-form>
    </q-step>
    <q-step
      :name="2"
      title="Permisos"
      caption="Permisos del sistema"
      icon="create_new_folder"
      :done="step > 2"
    >
      <div class="row">
        <div
          class="col-xs-12 col-md-6"
          v-for="(permiso, index) of valoresModel.permisos"
          :key="index"
        >
          <q-toggle
            v-model="permiso.permitido"
            checked-icon="check"
            color="positive"
            unchecked-icon="clear"
            :label="permiso.nombre"
          >
            <p class="text-caption text-grey-7">{{ permiso.descripcion }}</p>
          </q-toggle>

        </div>
      </div>
    </q-step>
    <template v-slot:navigation>
      <q-stepper-navigation
        align="right"
        class="row q-gutter-md"
      >
        <q-btn
          @click="$emit('cancelar')"
          label="Cancelar"
          icon="close"
          class="q-ml-sm"
        />
        <q-space />
        <q-btn
          v-if="step > 1"
          @click="anterior"
          label="Back"
          icon="navigate_before"
          class="q-ml-sm"
        />
        <q-btn
          @click="siguiente(props)"
          color="primary"
          :icon="step === 2 ? 'save' : 'navigate_next'"
          :label="step === 2 ? 'Guardar' : 'Siguiente'"
        />
      </q-stepper-navigation>
    </template>
  </q-stepper>
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
  setup (props, { emit }) {
    const _http = inject('http')

    const step = ref(1)
    const valoresModel = useVModel(props, 'valores')
    const formRol = ref(null)
    const entidades = ref([])
    const permisos = ref([])

    onMounted(async () => {
      entidades.value = await getEntidades()
      valoresModel.value.permisos = await getPermisos()
    })

    async function getEntidades () {
      const { rows } = await _http.get('/system/entidades')
      return rows
    }

    async function getPermisos () {
      let url = 'system/permisos?tipo=INTEROPERABILIDAD'
      if (props.valores.id) {
        url = `system/aplicaciones/${props.valores.id}/permisos`
      }
      const rows = await _http.get(url)
      return rows.rows || rows
    }

    const anterior = () => {
      step.value--
    }

    const siguiente = async () => {
      if (step.value === 1) {
        const validacion = await formRol.value.validate()
        if (validacion) {
          step.value++
        }
      } else {
        const permisos = []
        for (const permiso of valoresModel.value.permisos) {
          if (permiso.permitido) {
            permisos.push(permiso.id)
          }
        }
        valoresModel.value.permisos = permisos
        await emit('guardar')
      }
    }

    return {
      step,
      entidades,
      valoresModel,
      valoresRules,
      formRol,
      siguiente,
      permisos,
      anterior
    }
  }
}
</script>
