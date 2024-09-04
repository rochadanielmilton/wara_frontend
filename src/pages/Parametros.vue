<template>
  <q-page>
    <Titulo
      titulo="Parametros"
      icono="settings"
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
          label="Nuevo parametro"
        />
      </template>
      <template v-slot:form="{ close, update}">
        <q-card style="width: 700px; max-width: 90vw;">
          <q-toolbar class="q-pa-md">
            <q-icon
              name="settings"
              size="md"
            />
            <q-toolbar-title>
              {{ entidad.id ? 'Editar' : 'Agregar' }} parametro
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
            <Parametro
              v-model:valores="entidad"
              @guardar="guardar(update, close)"
              @cancelar="closeModal(close)"
            ></Parametro>
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
          <q-td>{{ row.grupo }}</q-td>
          <q-td>{{ row.descripcion }}</q-td>
          <q-td>{{ row.codigo }}</q-td>
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
import Parametro from 'components/Formularios/Parametro'

const filters = [
  {
    label: 'Nombre',
    field: 'nombre',
    type: 'input'
  },
  {
    label: 'Grupo',
    field: 'grupo',
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
      {
        label: 'ACTIVO',
        value: 'ACTIVO'
      },
      {
        label: 'INACTIVO',
        value: 'INACTIVO'
      }
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
    sortable: true
  },
  {
    name: 'nombre',
    label: 'Nombre',
    sortable: true
  },
  {
    name: 'grupo',
    label: 'Grupo',
    sortable: true
  },
  {
    name: 'descripcion',
    label: 'Descripcion',
    sortable: true
  },
  {
    name: 'codigo',
    label: 'Codigo',
    sortable: true
  },
  {
    name: 'estado',
    label: 'Estado',
    sortable: false
  }
]

export default {
  components: { CrudTable, Parametro },
  name: 'Dashboard',
  setup () {
    const _http = inject('http')
    const url = ref('system/parametros')
    const entidad = ref({
      grupo: null,
      nombre: null,
      descripcion: null,
      codigo: null,
      estado: 'ACTIVO'
    })

    const resetForm = () => {
      entidad.value = {
        grupo: null,
        nombre: null,
        descripcion: null,
        codigo: null,
        estado: 'ACTIVO'
      }
    }

    const openModal = async (open, id) => {
      resetForm()
      if (id) {
        entidad.value = await _http.get(`/${url.value}/${id}`)
      }
      open()
    }

    const closeModal = (close) => {
      resetForm()
      close()
    }

    const guardar = async (update, close) => {
      if (entidad.value.id) {
        await _http.put(`/${url.value}/${entidad.value.id}`, entidad.value)
      } else {
        await _http.post(`/${url.value}`, entidad.value)
      }
      await update()
      closeModal(close)
    }

    return {
      entidad,
      filters,
      columns,
      url,
      closeModal,
      openModal,
      guardar
    }
  }
}
</script>
