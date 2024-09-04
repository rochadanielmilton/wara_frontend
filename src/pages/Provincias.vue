<template>
  <q-page>
    <Titulo titulo="Provincias" icono="map"></Titulo>
    <CrudTable :filters="filters" :columns="columns" :url="url" :order="sort">
      <template v-slot:buttons="{ open }">
        <q-btn icon="add" color="primary" @click="openModal(open)" label="Nueva Provincia" />
      </template>
      <template v-slot:form="{ close, update }">
        <q-card style="width: 700px; max-width: 90vw;">
          <q-toolbar class="q-pa-md">
            <q-icon name="settings" size="md" />
            <q-toolbar-title>
              {{ menu.id ? 'Editar' : 'Agregar' }} Provincia
            </q-toolbar-title>
            <q-space />
            <q-btn flat round icon="close" @click="closeModal(close)" />
          </q-toolbar>
          <q-card-section>
            <Menu v-model:valores="menu" @guardar="guardar(update, close)" @cancelar="closeModal(close)"></Menu>
          </q-card-section>
        </q-card>
      </template>
      <template v-slot:row="{ row, open, eliminar, cambiarEstado }">
        <q-tr>
          <q-td>{{ row.departamento.nombre }}</q-td>
          <q-td>{{ truncateText(row.nombre,25)  }}</q-td>
          <q-tooltip background-color="primary">{{ row.nombre }}</q-tooltip>
          <q-td>
            <q-toggle
            v-model="row.estado"
            color="primary"
            :false-value="estados.OFF"
            :true-value="estados.ON"
            @click="cambiarEstado({
          registro: {
        ...row,
        departamento_id: row.departamento.id
      }, url: `${url}${row.id}/`
    })" />
          </q-td>
          <q-td>
            {{ row.estado }}
          </q-td>
          <q-td>
            <q-btn class="q-pa-xs" flat round icon="edit" @click="openModal(open, row.id)" />
            <q-btn class="q-pa-xs" flat round color="negative" icon="delete"
              @click="eliminar({ url: `${url}${row.id}/` })" />
          </q-td>

        </q-tr>
      </template>
    </CrudTable>
  </q-page>
</template>

<script>
import { ref, inject } from 'vue'
import CrudTable from '@components/common/CrudTable'
import Menu from 'components/Formularios/Provincias.vue'
import { estados } from 'src/constants/estados'

const filters = [
  {
    label: 'Nombre',
    field: 'nombre',
    type: 'input'
  },
  {
    label: 'Estado',
    field: 'estado',
    type: 'select',
    options: [
      {
        label: estados.ON,
        value: estados.ON
      },
      {
        label: estados.OFF,
        value: estados.OFF
      }
    ]
  }
]

const columns = [

  {
    name: 'departamento__nombre',
    label: 'Departamento',
    sortable: true
  },
  {
    name: 'nombre',
    label: 'Provincia',
    sortable: true
  },
  {
    name: 'estado',
    label: 'Estado',
    sortable: false
  },
  {
    name: 'estado',
    label: 'Detalle Estado',
    sortable: false
  },
  {
    name: 'acciones',
    label: 'Acciones',
    sortable: false
  },

]

export default {
  components: { CrudTable, Menu },
  name: 'Dashboard',
  setup() {
    const _http = inject('http')
    const _message = inject('message')

    const url = ref('/provincias/')
    const menu = ref({
      departamento_id: null,
      nombre: null,
    })

    const sort = ref("departamento__nombre")

    const resetForm = () => {
      menu.value = {
        departamento_id: null,
        nombre: null,
        estado: estados.ON
      }
    }

    const openModal = async (open, id) => {
      resetForm()
      if (id) {
        const response = await _http.get(`${url.value}${id}/`)

        menu.value = {
          id,
          nombre: response.nombre,
          departamento_id: response.departamento.id,
          estado: response.estado
        }
      }
      open()
    }

    const closeModal = (close) => {
      resetForm()
      close()
    }

    const guardar = async (update, close) => {
      const mensaje = !menu.value.id ? 'Provincia creado de manera exitosa.' : 'Provincia actualizado de manera exitosa.'
      if (menu.value.id) {
        await _http.put(`${url.value}${menu.value.id}/`, menu.value)
      } else {
        await _http.post(`${url.value}`, menu.value)
      }
      _message.success(mensaje)
      await update()
      closeModal(close)
    }

    return {
      sort,
      rowCounter: 1,
      menu,
      estados,
      filters,
      columns,
      url,
      closeModal,
      openModal,
      guardar
    }
  },
  methods:{
    truncateText(text, length) {
      return text.length > length ? text.slice(0, length) + '...' : text;
    },
  }
}
</script>
<style scoped>
.q-td{
  text-align: center;
}
</style>