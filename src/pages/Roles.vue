<template>
  <q-page>
    <Titulo titulo="Roles" icono="groups"></Titulo>
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
          label="Nuevo Rol"
        />
      </template>
      <template v-slot:form="{ close, update }">
        <q-card style="width: 700px; max-width: 90vw">
          <q-toolbar class="q-pa-md">
            <q-icon name="settings" size="md" />
            <q-toolbar-title>
              {{ Rol.id ? "Editar" : "Agregar" }} Rol
            </q-toolbar-title>
            <q-space />
            <q-btn flat round icon="close" @click="closeModal(close)" />
          </q-toolbar>
          <q-card-section>
            <Rol
              :valores="Rol"
              @guardar="guardar(update, close)"
              @cancelar="closeModal(close)"
            ></Rol>
          </q-card-section>
        </q-card>
      </template>
      <template v-slot:row="{ row, open, eliminar }">
        <q-tr>
          <q-td>{{ row.name }}</q-td>

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
import Rol from "components/Formularios/Rol";

const filters = [
  {
    label: "Nombre",
    field: "nombre",
    type: "input",
  },
];

const columns = [
  {
    name: "nombre",
    label: "Nombre",
    sortable: true,
  },
  {
    name: "acciones",
    label: "Acciones",
    sortable: false,
  },
];

export default {
  components: { CrudTable, Rol },
  name: "Dashboard",
  setup() {
    const _http = inject("http");
    const _message = inject("message");
    const url = ref("/groups/");
    const Rol = ref({
      name: null,
    });

    const resetForm = () => {
      Rol.value = {
        name: null,
      };
    };

    const openModal = async (open, id) => {
      resetForm();
      if (id) Rol.value = await _http.get(`${url.value}${id}/`);
      open();
    };

    const closeModal = (close) => {
      resetForm();
      close();
    };

    const guardar = async (update, close) => {
      const mensaje = !Rol.value.id
        ? "Rol creado de manera exitosa."
        : "Rol actualizado de manera exitosa.";
      if (Rol.value.id) {
        await _http.put(`${url.value}${Rol.value.id}/`, Rol.value);
      } else {
        await _http.post(`${url.value}`, Rol.value);
      }
      _message.success(mensaje);
      await update();
      closeModal(close);
    };

    return {
      Rol,
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
