<template>
  <q-page>
    <Titulo
      titulo="Usuarios"
      icono="person"
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
          label="Nuevo Usuario"
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
              {{ user.id ? 'Editar' : 'Agregar' }} Usuario
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
            <User
              :valores="user"
              @guardar="guardar(update, close)"
              @cancelar="closeModal(close)"
              :errors="errors"
            ></User>
          </q-card-section>
        </q-card>
      </template>
      <template v-slot:row="{ row, open, eliminar }">
        <q-tr>
          <q-td>{{ row.first_name }}</q-td>
          <q-td>{{ row.last_name }}</q-td>
          <q-td>{{ row.second_last_name }}</q-td>
          <q-td>{{ row.username }}</q-td>
          <q-td>{{ row.email }}</q-td>
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
        </q-tr>
      </template>
    </CrudTable>
  </q-page>
</template>

<script>
import { ref, inject } from 'vue'
import CrudTable from '@components/common/CrudTable'
import User from 'components/Formularios/sector/User.vue'
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
    name: "first_name",
    label: "Primer Nombre",
    sortable: false,
  },
  {
    name: "last_name",
    label: "Apellido Paterno",
    sortable: false,
  },
  {
    name: "second_last_name",
    label: "Apellido Materno",
    sortable: false,
  },
  {
    name: "username",
    label: "Usuario",
    sortable: false,
  },

  {
    name: "email",
    label: "Correo Electronico",
    sortable: true,
  },
  {
    name: "acciones",
    label: "Acciones",
    sortable: false,
  },
];

export default {
  components: { CrudTable, User },
  name: 'Users',
  setup () {
    const _http = inject('http')
    const _message = inject('message')

    const url = ref('/sector/users/')
    const user = ref({
    })

    const errors = ref({})

    const resetForm = () => {
      user.value = {
        first_name: null,
        estado: estados.ON
      }
    }

    const openModal = async (open, id) => {
      resetForm()
      if (id) user.value = await _http.get(`${url.value}${id}/`)
      open()
    }

    const closeModal = (close) => {
      resetForm()
      close()
    }

    const guardar = async (update, close) => {
      errors.value = {}
      try{
        const mensaje = !user.value.id ? 'Usuario creado de manera exitosa.' : 'Usuario actualizado de manera exitosa.'
        if (user.value.id) {
          await _http.put(`${url.value}${user.value.id}/`, user.value)
        } else {
          await _http.post(`${url.value}`, user.value)
        }
        _message.success(mensaje)
        await update()
        closeModal(close)
      }catch(error){
        console.log(error)
        console.log(error.response)
        if (error.response.status == 400) {
          errors.value = error.response.data;
        }
      }
    };

    return {
      errors,
      user,
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
