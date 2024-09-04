<template>
  <q-page>
    <Titulo
      titulo="Menus"
      icono="menu"
    ></Titulo>
   <q-btn
              name="settings"
              size="md"
              label="asdfas"
              @click ="abrir_button"
            />

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
          label="Nuevo menu"
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
              {{ menu.id ? 'Editar' : 'Agregar' }} menu
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
            <Menu
              :valores="menu"
              @guardar="guardar(update, close)"
              @cancelar="closeModal(close)"
            ></Menu>
          </q-card-section>
        </q-card>
      </template>
      <template v-slot:row="{ row, open, eliminar }">
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
              @click="eliminar({ url: `${url}${row.id}/` })"
            />

          </q-td>
          <q-td>{{ row.group_id }}</q-td>
          <q-td>{{ row.menu_id }}</q-td>
        </q-tr>
      </template>
    </CrudTable>
  </q-page>
</template>

<script>
import { ref, inject } from 'vue'
import CrudTable from '@components/common/CrudTable'
import Menu from 'components/Formularios/Menu'


const filters = [
  {
    label: 'Nombre',
    field: 'nombre',
    type: 'input'
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
    name: 'acciones',
    label: 'Acciones',
    sortable: false
  },
  // {
  //   name: 'activo',
  //   label: 'Activo',
  //   sortable: true
  // },
  {
    name: 'nombre',
    label: 'Nombre',
    sortable: true
  },
  {
    name: 'ruta',
    label: 'Ruta',
    sortable: true
  },
  {
    name: 'icono',
    label: 'Icono',
    sortable: false
  },



]

export default {
  components: { CrudTable, Menu },
  name: 'Dashboard',
  setup () {
    const _http = inject('http')
    const _message = inject('message')


    const abrir_button = () =>{
      console.log('aaaa:',url.value);
      alert('asdf');
    };
    const url = ref('/menu-group/')
    const menu = ref({
      grupo: null,
      nombre: null,
      descripcion: null,
      codigo: null,
      orden: 1
    })

    const resetForm = () => {
      menu.value = {
        grupo: null,
        nombre: null,
        descripcion: null,
        codigo: null,
        orden: 1
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
      filters,
      columns,
      url,
      closeModal,
      openModal,
      guardar,
      abrir_button,
    }
  }
}
</script>
