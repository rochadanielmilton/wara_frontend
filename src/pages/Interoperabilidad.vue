<template>
  <q-page>
    <Titulo
      titulo="Interoperabilidad"
      icono="cloud_sync"
    ></Titulo>
    <CrudTable
      :filters="filters"
      :columns="columns"
      :url="url"
      :order="'createdAt'"
    >
      <template v-slot:buttons="{ open }">
        <q-btn
          icon="add"
          color="primary"
          @click="openModal(open)"
          label="Nueva interoperabilidad"
        />
      </template>
      <template v-slot:form="{ close, update }">
        <q-card style="width: 900px; max-width: 90vw;">
          <q-toolbar class="q-pa-md">
            <q-icon
              name="cloud_sync"
              size="md"
            />
            <q-toolbar-title>
              {{ rol.id ? 'Editar' : 'Agregar' }} interoperabilidad
            </q-toolbar-title>
            <q-space />
            <q-btn
              flat
              round
              icon="close"
              @click="closeModal(close)"
            />
          </q-toolbar>
          <q-card-section>
            <Interoperabilidad
              v-model:valores="rol"
              @guardar="guardar(update, close)"
              @cancelar="closeModal(close)"
            ></Interoperabilidad>
          </q-card-section>
        </q-card>
      </template>
      <template v-slot:row="{ row, open, eliminar, cambiarEstado }">
        <q-tr>
          <q-td>
            <q-btn
              class="q-pa-xs"
              flat
              round
              icon="edit"
              @click="openModal(open, row.id)"
            />
            <q-btn
              class="q-pa-xs"
              flat
              round
              color="negative"
              icon="delete"
              @click="eliminar({ url: `${url}/${row.id}` })"
            />
          </q-td>
          <q-td>
            <q-toggle
              v-model="row.estado"
              color="primary"
              false-value="INACTIVO"
              true-value="ACTIVO"
              @click="cambiarEstado({ registro: row, url: `${url}/${row.id}` })"
            />
          </q-td>
          <q-td>{{ row.nombre }}</q-td>
          <q-td>{{ row.descripcion }}</q-td>
          <q-td>{{ row.entidad?.nombre }}</q-td>
          <q-td>{{ row.caducidad ? `${row.caducidad} Hrs.` : 'INFINITO' }} </q-td>
          <q-td>
            <q-input
              style="min-width:400px;min-height:200px;overflow-x:hidden !important;"
              :readonly="true"
              type="textarea"
              v-model="row.token"
            />
          </q-td>
          <q-td class="text-center">{{ row.createdAt }}</q-td>
          <q-td class="text-center">{{ row.updatedAt }}</q-td>
          <q-td>
            <Estado :estado="row.estado" />
          </q-td>
        </q-tr>
      </template>
    </CrudTable>
  </q-page>
</template>

<script>
import { ref, inject } from 'vue'
import CrudTable from '@components/common/CrudTable'
import Interoperabilidad from 'components/Formularios/Interoperabilidad'

const filters = [
  {
    label: 'Nombre',
    field: 'nombre',
    type: 'input'
  },
  {
    label: 'Descripcion',
    field: 'descripcion',
    type: 'input'
  },
  {
    label: 'Estado',
    field: 'estado',
    type: 'select',
    options: [
      { label: 'ACTIVO', value: 'ACTIVO' },
      { label: 'INACTIVO', value: 'INACTIVO' }
    ]
  }
]

const columns = [
  {
    name: 'acciones',
    label: 'Acciones',
    sortable: false
  },
  {
    name: 'activo',
    label: 'Activo',
    sortable: false
  },
  {
    name: 'nombre',
    label: 'Nombre',
    sortable: false
  },
  {
    name: 'descripcion',
    label: 'Descripcion',
    sortable: false
  },
  {
    name: 'entidad',
    label: 'Entidad',
    sortable: false
  },
  {
    name: 'caducidad',
    label: 'Caducidad',
    sortable: false
  },
  {
    name: 'token',
    label: 'Token',
    sortable: false
  },
  {
    name: 'createdAt',
    label: 'Fecha de registro',
    sortable: false
  },
  {
    name: 'updatedAt',
    label: 'Fecha de ultima actualizacion',
    sortable: false
  },
  {
    name: 'estado',
    label: 'Estado',
    sortable: false
  }
]

export default {
  components: { CrudTable, Interoperabilidad },
  name: 'Dashboard',
  setup () {
    const _http = inject('http')
    const url = ref('system/aplicaciones')
    const rol = ref({
      nombre: null,
      descripcion: null,
      idEntidad: null,
      permisos: [],
      menus: []
    })

    const resetForm = () => {
      rol.value = {
        nombre: null,
        descripcion: null,
        idEntidad: null,
        regenerar: false,
        permisos: [],
        menus: []
      }
    }

    const openModal = async (open, id) => {
      resetForm()
      if (id) {
        rol.value = await _http.get(`/${url.value}/${id}`)
        rol.value.regenerar = false
      }
      open()
    }

    const closeModal = (close) => {
      resetForm()
      close()
    }

    const guardar = async (update, close) => {
      if (rol.value.id) {
        await _http.put(`/${url.value}/${rol.value.id}`, rol.value)
      } else {
        await _http.post(`/${url.value}`, rol.value)
      }
      await update()
      closeModal(close)
    }

    const getNombreCompleto = (usuario) => {
      return `${usuario.nombres} ${usuario.primerApellido} ${usuario.segundoApellido}`
    }

    return {
      rol,
      filters,
      columns,
      url,
      closeModal,
      openModal,
      getNombreCompleto,
      guardar
    }
  }
}
</script>
<style lang="scss">
td {
  width: 50px;
}
</style>
