<template>
    <q-form class="row q-col-gutter-md" @submit="$emit('guardar')">
      <q-input square class="col-xs-12 col-md-12" label="Sector " v-model="valoresModel.nombre"
        :rules="[  val => val.length <= 30 || 'Como maximo solo debe tener  30 carácteres.',val => !!val || 'Este campo es requerido',]"/>
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
  <!---->
  <script>
  import { useVModel } from '../../composables/useVModel.js'
  import { ref, onMounted } from 'vue'
  import validaciones from '../../common/validations'
  import IconListOriginal from '../../common/IconList'
  import { estados } from 'src/constants/estados.js'
  const valoresRules = {
    nombre: [
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
    setup (props) {
      // const _http = inject('http')
      const valoresModel = useVModel(props, 'valores')
      const menus = ref([])
      const IconList = ref(IconListOriginal)
      onMounted(async () => {
        // menus.value = await getMenus()
      })
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
      // async function getMenus () {
      //   const { rows } = await _http.get('/system/menus')
      //   return rows
      // }
      return {
        IconList,
        IconListOriginal,
        valoresModel,
        valoresRules,
        menus,
        filtrarOpciones,
        estados
      }
    }
  }
  </script>
