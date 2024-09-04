<template>
    <q-form class="row q-col-gutter-md" @submit="$emit('guardar')">
      <q-input square class="col-xs-12 col-md-12" label="Permiso" v-model="valoresModel.name"
        :rules="valoresRules.name" required />
        <q-input square class="col-xs-12 col-md-12" label="Descripción" v-model="valoresModel.codename"
        :rules="valoresRules.codename" required />

      <div class="col-xs-12 text-right">
        <q-btn class="q-ml-sm" icon="close" label="Cancelar" @click="$emit('cancelar')" />
        <q-btn class="q-ml-sm" icon="check" color="primary" label="Guardar" type="submit" />
      </div>
    </q-form>
  </template>
  <!---->
  <script>
  import { useVModel } from '../../composables/useVModel.js'
  import { ref, onMounted, inject } from 'vue'
  import validaciones from '../../common/validations'
  import IconListOriginal from '../../common/IconList'
  import { estados } from 'src/constants/estados.js'

  const valoresRules = {
    name: [
      validaciones.requerido
    ],
    codename: [
      validaciones.requerido
    ],

  }
  export default {
    props: {
      valores: {
        type: Object,
        default: () => ({})
      }
    },
    setup(props) {
      const _http = inject('http')
      const valoresModel = useVModel(props, 'valores')
      const menus = ref([])
      const IconList = ref(IconListOriginal)
      const filtrarOpciones = (val, update) => {
        if (val === '') {
          update(() => {
            IconList.value = IconListOriginal
          })
          return
        }
        update(() => {
          const needle = val.toLowerCase()
          IconList.value = IconListOriginal.filter(v => v.toLowerCase().includes(needle))
        })
      }
      return {
        IconList,
        IconListOriginal,
        valoresModel,
        valoresRules,
        menus,
        filtrarOpciones,
        estados,
      }
    }
  }
  </script>
