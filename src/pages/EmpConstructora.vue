<template>
  <q-page>
    <Titulo titulo="Empresas Constructoras" icono="electric_rickshaw"></Titulo>
    <CrudTable :filters="filters" :columns="columns" :url="url" :order="'createdAt'">
      <template v-slot:buttons="{ open }">
        <q-btn icon="add" color="primary" @click="openModal(open)" label="Nueva Empresa" />
      </template>
      <template v-slot:form="{ close, update }">
        <q-card style="width: 700px; max-width: 90vw;">
          <q-toolbar class="q-pa-md">
            <q-icon name="settings" size="md" />
            <q-toolbar-title>
              {{ menu.id ? 'Editar' : 'Agregar' }} Empresa Constructora
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
          <q-td>{{ row.id }}</q-td>
          <q-td>{{ row.nombre }}</q-td>
          <q-td>
             <q-toggle
              v-model="row.estado"

              color="primary"
              :false-value="estados.OFF"
              :true-value="estados.ON"
              @click="cambiarEstado({ registro: row, url: `${url}${row.id}/` })"
            />
          </q-td>
          <q-td>
            {{row.estado}}
          </q-td>
          <q-td>
              <q-btn
                class="q-pa-xs"
                flat
                round
                icon="edit"
                @click="openModal(open, row.id)"
              >
              <q-tooltip>Editar</q-tooltip>
              </q-btn>
              <q-btn
                class="q-pa-xs"
                flat
                round
                color="negative"
                icon="delete"
                @click="eliminar({ url: `${url}${row.id}/` })"
              >
              <q-tooltip>Eliminar</q-tooltip>
              </q-btn>
            </q-td>
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
import Menu from 'components/Formularios/Constructora.vue'
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
  // {
  //   label: 'Descripcion',
  //   field: 'descripcion',
  //   type: 'input'
  // }
  // {
  //   label: 'Estado',
  //   field: 'estado',
  //   type: 'select',
  //   options: [
  //     {
  //       label: 'ACTIVO',
  //       value: 'ACTIVO'
  //     },
  //     {
  //       label: 'INACTIVO',
  //       value: 'INACTIVO'
  //     }
  //   ]
  // }
]

const columns = [
{
    name: 'ID',
    label: 'Id',
    sortable: false
  },
  {
    name: 'acciones',
    label: 'Empresa',
    sortable: false
  },
  // {
  //   name: 'activo',
  //   label: 'Activo',
  //   sortable: true
  // },
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
    name: 'nombre',
    label: 'Acciones',
    sortable: true
  }

]

export default {
  components: { CrudTable, Menu },
  name: 'Dashboard',
  setup() {
    const _http = inject('http')
    const _message = inject('message')

    const url = ref('/empresa-constructora/')
    const menu = ref({
      grupo: null,
      nombre: null,
      descripcion: null,
      codigo: null,
      orden: 1
    })

    const resetForm = () => {
      menu.value = {
        nombre: null,
        estado: estados.ON
      }
    }

    const openModal = async (open, id) => {
      resetForm()
      if (id) menu.value = await _http.get(`${url.value}${id}/`)
      open()
    }

    const closeModal = (close) => {
      resetForm()
      close()
    }

    const guardar = async (update, close) => {
      const mensaje = !menu.value.id ? 'Menu creado de manera exitosa.' : 'Menu actualizado de manera exitosa.'
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
      menu,
      estados,
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
