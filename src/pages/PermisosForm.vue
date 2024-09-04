<template>
  <q-page>
    <Titulo titulo="Permisos" icono="gpp_maybe"></Titulo>
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
          label="Nuevo Permiso"
        />
      </template>
      <template v-slot:form="{ close, update }">
        <q-card style="width: 700px; max-width: 90vw">
          <q-toolbar class="q-pa-md">
            <q-icon name="settings" size="md" />
            <q-toolbar-title>
              {{ menu.id ? "Editar" : "Agregar" }} Permiso
            </q-toolbar-title>
            <q-space />
            <q-btn flat round icon="close" @click="closeModal(close)" />
          </q-toolbar>
          <q-card-section>
            <Menu
              v-model:valores="menu"
              @guardar="guardar(update, close)"
              @cancelar="closeModal(close)"
            ></Menu>
          </q-card-section>
        </q-card>
      </template>
      <template v-slot:row="{ row, open, eliminar, cambiarEstado }">
        <q-tr>
          <q-td>{{ row.name }}</q-td>
          <q-td>
            {{ row.codename }}
          </q-td>
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
import { ref, inject } from "vue";
import CrudTable from "@components/common/CrudTable";
import Menu from "components/Formularios/Permisos.vue";
import { estados } from "src/constants/estados";

const filters = [
  {
    label: "Nombre",
    field: "nombre",
    type: "input",
  },
  {
    label: "Estado",
    field: "estado",
    type: "select",
    options: [
      {
        label: estados.ON,
        value: estados.ON,
      },
      {
        label: estados.OFF,
        value: estados.OFF,
      },
    ],
  },
];

const columns = [
  {
    name: "name",
    label: "Permiso",
    sortable: true,
  },
  {
    name: "codename",
    label: "Descripcion",
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

    const url = ref("/permissions/");
    const menu = ref({
      name: null,
      codename: null,
    });

    const resetForm = () => {
      menu.value = {
        nombre: null,
        estado: estados.ON,
      };
    };

    const openModal = async (open, id) => {
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
        ? "Permiso creado de manera exitosa."
        : "Permiso actualizado de manera exitosa.";
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
      estados,
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
