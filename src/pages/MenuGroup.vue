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
          label="Nueva asignacion"
        />
      </template>
      <template v-slot:form="{ close, update }">
        <q-card style="width: 700px; max-width: 90vw">
          <q-toolbar class="q-pa-md">
            <q-icon name="settings" size="md" />
            <q-toolbar-title>
              {{ MenuGroupComponente.id ? "Editar" : "Agregar" }} Grupo - Menu
            </q-toolbar-title>
            <q-space />
            <q-btn flat round icon="close" @click="closeModal(close)" />
          </q-toolbar>
          <q-card-section>
            <MenuGroupComponente
              :valores="MenuGroupComponente"
              @guardar="guardar(update, close)"
              @cancelar="closeModal(close)"
            ></MenuGroupComponente>
          </q-card-section>
        </q-card>
      </template>
      <template v-slot:row="{ row, open, eliminar }">
        <q-tr>
          <q-td>{{ row.grupo }}</q-td>
          <q-td>{{ row.menu }}</q-td>
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
import MenuGroupComponente from "components/Formularios/MenuGroupComponente";

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
    name: "group_id",
    label: "Rol",
    sortable: true,
  },
  {
    name: "menu_id",
    label: "Menu Asignado",
    sortable: true,
  },
  {
    name: "acciones",
    label: "Acciones",
    sortable: false,
  },
];

export default {
  components: { CrudTable, MenuGroupComponente },
  name: "MenuGroup",
  setup() {
    const _http = inject("http");
    const _message = inject("message");
    const url = ref("/menu-group/");
    const MenuGroupComponente = ref({
      group_id: null,
      menu_id: [],
    });

    const resetForm = () => {
      MenuGroupComponente.value = {
        group_id: null,
        menu_id: null,
      };
    };

    const openModal = async (open, id) => {
      resetForm();
      if (id) MenuGroupComponente.value = await _http.get(`${url.value}${id}/`);
      open();
    };

    const closeModal = (close) => {
      resetForm();
      close();
    };

    const guardar = async (update, close) => {
      const mensaje = !MenuGroupComponente.value.id
        ? "MenuGroupComponente creado de manera exitosa."
        : "MenuGroupComponente actualizado de manera exitosa.";
      console.log("1111111");

      // console.log(MenuGroupComponente.value.group_id);
      // console.log(MenuGroupComponente.value.menu_id[0]);
      // console.log(MenuGroupComponente.value.menu_id[1]);
      // console.log(MenuGroupComponente.value.menu_id[2]);
      console.log(MenuGroupComponente.value);

      const length_vec = MenuGroupComponente.value.menu_id.length;
      for (let i = 0; i < length_vec; i++) {
        const valores_nuevos = {
          group_id: MenuGroupComponente.value.group_id,
          menu_id: MenuGroupComponente.value.menu_id[i],
        };
        console.log(valores_nuevos);
        // await _http.post('/menu-group/', valores_nuevos);

      }


        // await _http.post(`${url.value}`, valores_nuevos);
      // if (MenuGroupComponente.value.id) {
      //   await _http.put(
      //     `${url.value}${MenuGroupComponente.value.id}/`,
      //     MenuGroupComponente.value
      //   );
      // } else {
      //   await _http.post(`${url.value}`, MenuGroupComponente.value);
      // }

      _message.success(mensaje);
      await update();
      closeModal(close);
    };

    return {
      MenuGroupComponente,
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
