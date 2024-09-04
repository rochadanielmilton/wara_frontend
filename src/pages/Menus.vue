<template>
  <q-page>
    <Titulo titulo="Menus" icono="manage_accounts"></Titulo>
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
      <template v-slot:form="{ close, update }">
        <q-card style="width: 700px; max-width: 90vw">
          <q-toolbar class="q-pa-md">
            <q-icon name="settings" size="md" />
            <q-toolbar-title>
              {{ menu.id ? "Editar" : "Agregar" }} menu
            </q-toolbar-title>
            <q-space />
            <q-btn flat round icon="close" @click="closeModal(close)" />
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
          <q-td>{{ row.nombre }}</q-td>
          <q-td>{{ row.ruta }}</q-td>
          <q-td>
            <q-icon size="md" :name="row.icono" />
          </q-td>
          <q-td>{{ row.orden }}</q-td>
          <q-td>
            {{ row.grupo }}
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
        </q-tr>
      </template>
    </CrudTable>
  </q-page>
</template>

<script>
import { ref, inject } from "vue";
import CrudTable from "@components/common/CrudTable";
import Menu from "components/Formularios/Menu";

const filters = [
  {
    label: "Nombre",
    field: "nombre",
    type: "input",
  },
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
];

const columns = [
  {
    name: "nombre",
    label: "Nombre",
    sortable: true,
  },
  {
    name: "ruta",
    label: "Ruta",
    sortable: true,
  },
  {
    name: "icono",
    label: "Icono",
    sortable: false,
  },
  {
    name: "orden",
    label: "Orden",
    sortable: true,
  },
  {
    name: "menuSuperior",
    label: "Menu superior",
    sortable: false,
  },
  {
    name: "acciones",
    label: "Acciones",
    sortable: false,
  },
];

export default {
  components: { CrudTable, Menu },
  name: "Dashboard",
  setup() {
    const _http = inject("http");
    const _message = inject("message");

    const url = ref("/menu/");
    const menu = ref({
      grupo: 1,
      nombre: null,
      descripcion: null,
      codigo: null,
      orden: 1,
    });

    const resetForm = () => {
      menu.value = {
        grupo: 1,
        nombre: null,
        descripcion: null,
        codigo: null,
        orden: 1,
      };
    };

    const openModal = async (open, id) => {
      // console.log(id);
      resetForm();
      if (id) menu.value = await _http.get(`${url.value}${id}/`);
      open();
    };

    const closeModal = (close) => {
      resetForm();
      close();
    };

    const guardar = async (update, close) => {
      const mensaje = !menu.value.id
        ? "Menu creado de manera exitosa."
        : "Menu actualizado de manera exitosa.";
      if (menu.value.id) {
        await _http.put(`${url.value}${menu.value.id}/`, menu.value);
      } else {
        await _http.post(`${url.value}`, menu.value);
      }
      _message.success(mensaje);
      await update();
      closeModal(close);
    };

    return {
      menu,
      filters,
      columns,
      url,
      closeModal,
      openModal,
      guardar,
    };
  },
};
</script>
