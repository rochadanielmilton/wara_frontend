<template>
    <q-form class="row q-col-gutter-md" @submit="$emit('guardar')">
      <q-input square class="col-xs-12 col-md-12" label="Unidad Descentralizda" v-model="valoresModel.nombre"
        :rules="[  val => val.length <= 30 || 'Como maximo solo debe tener  30 carácteres.',val => !!val || 'Este campo es requerido',]"/>

        <q-input square class="col-xs-12 col-md-12"  label="Dirección" v-model="valoresModel.direccion"
        :rules="valoresRules.nombre"  />

        <q-input square class="col-xs-12 col-md-12" type="email" label="Email" v-model="valoresModel.email"
        :rules="valoresRules.email"/>
        <q-toggle
        v-model="valoresModel.estado"
        :label="`Estado ${valoresModel.estado==estados.ON ? estados.ON : estados.OFF}`"
        color="primary"
        :false-value="estados.OFF"
        :true-value="estados.ON"
    />

    <!-- required  <q-input square class="col-xs-12 col-md-6" label="Ruta" v-model="valoresModel.ruta" :rules="valoresRules.ruta" />
      <q-select square use-input class="col-xs-12 col-md-6" label="Icono" :options="IconList" v-model="valoresModel.icono"
        :rules="valoresRules.icono" @filter="filtrarOpciones">
        <template v-slot:append>
          <q-icon size="md" color="primary" :name="valoresModel.icono" class="q-ml-md" />
        </template>
        <template v-slot:option="props">
          <q-item v-bind="props.itemProps" v-on="props.itemEvents">
            <q-item-section avatar>
              <q-icon :name="props.opt" />
            </q-item-section>
            <q-item-section>
              <q-item-label v-html="props.opt" />
              <q-item-label caption>{{ props.opt }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-select>
      <q-input square class="col-xs-12 col-md-6" label="Orden" v-model="valoresModel.orden" :rules="valoresRules.orden" />
      <q-input square class="col-xs-12 col-md-6" label="Grupo" v-model="valoresModel.grupo" :rules="valoresRules.grupo" />   -->
      <!-- <q-select
          square
          v-model="valoresModel.idMenu"
          :options="menus"
          option-value="id"
          option-label="nombre"
          label="Menu superior"
          map-options
          emit-value
          class="col-xs-12 col-md-6"
          :rules="valoresRules.idMenu"
          clearable
        /> -->
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
      validaciones.minimoCincuenta
    ],
    /*
    direccion: [
      validaciones.requerido
    ],*/
    email: [
      validaciones.correo
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
