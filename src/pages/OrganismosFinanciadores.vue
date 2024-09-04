<template>
  <q-page>
    <Titulo titulo="Organismos Financiadores" icono="build"></Titulo>
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
          label="Adicionar Financiador"
        />
      </template>
      <template v-slot:form="{ close, update }">
        <q-card style="width: 700px; max-width: 90vw">
          <q-toolbar class="q-pa-md">
            <q-icon name="settings" size="md" />
            <q-toolbar-title>
              {{ Financiadore.id ? "Editar" : "Agregar" }} Financiadores
            </q-toolbar-title>
            <q-space />
            <q-btn flat round icon="close" @click="closeModal(close)" />
          </q-toolbar>
          <q-card-section>
            <Financiadore
              :valores="Financiadore"
              @guardar="guardar(update, close)"
              @cancelar="closeModal(close)"
            ></Financiadore>
          </q-card-section>
        </q-card>
      </template>
      <template v-slot:row="{ row, open, eliminar }">
        <q-tr>

          <q-td>{{ row.sigla }}</q-td>

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
import Financiadore from "components/Formularios/Organismo-Financiadore.vue";

const filters = [
  {
    label: "sigla",
    field: "sigla",
    type: "input",
  },
  
  
];

const columns = [
  // {
  //   name: "created_at",
  //   label: "created_at",
  //   sortable: true,
  // },
  // {
  //   name: "id",
  //   label: "id",
  //   sortable: true,
  // },
  // {
  //   name: "is_deleted",
  //   label: "is_deleted",
  //   sortable: false,
  // },
  {
    name: "sigla",
    label: "sigla",
    sortable: true,
  },
  // {
  //   name: "updated_at",
  //   label: "Menu superior",
  //   sortable: false,
  // },
  {
    name: "acciones",
    label: "Acciones",
    sortable: false,
  },
];

export default {
  // components: { CrudTable, Menu },
  components: { CrudTable, Financiadore },

  name: "Dashboard",
  setup() {
    const _http = inject("http");
    const _message = inject("message");

    const url = ref("/organizaciones-financieras/");
    const Financiadore = ref({
      sigla: null,
    });

    const resetForm = () => {
      Financiadore.value = {
        sigla: null,
      };
    };

    const openModal = async (open, id) => {
      resetForm();
      if (id) Financiadore.value = await _http.get(`${url.value}${id}/`);
      open();
    };

    const closeModal = (close) => {
      resetForm();
      close();
    };

    const guardar = async (update, close) => {
      const mensaje = !Financiadore.value.id
        ? "Organismo Financiador creado de manera exitosa."
        : "Organismo Financiador actualizado de manera exitosa.";

      console.log(Financiadore.value);
      if (Financiadore.value.id) {
        await _http.put(
          `${url.value}${Financiadore.value.id}/`,
          Financiadore.value
        );
      } else {
        await _http.post(`${url.value}`, Financiadore.value);
      }
      _message.success(mensaje)
      await update();
      closeModal(close);
    };

    return {
      Financiadore,
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
<style scoped>
.q-td{
  text-align: center;
}
</style>