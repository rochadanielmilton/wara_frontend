<template>
  <q-page>
    <Titulo titulo="HISTORIAL TOKEN" icono="add_location_alt"></Titulo>

    <q-table
      :rows="rows"
      :columns="columns"
      row-key="token_key"
      :pagination="pagination"
    >
      <template v-slot:top="props">
        <q-btn @click="refreshTable" label="TOKEN" color="primary" />
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td v-for="col in props.cols" :key="col.name">
            <template v-if="col.name === 'actions'">
              <q-btn
                class="q-pa-xs"
                flat
                round
                color="negative"
                icon="delete"
                @click="eliminar({ url: `${url}${row.id}/` })"
              />
            </template>
            <template v-else>
              {{ props.row[col.name] }}
            </template>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        {
          name: "token_key",
          label: "Tokend",
          align: "left",
          field: (row) => row.token_key,
        },
        {
          name: "expiry",
          label: "EXPIRA",
          align: "left",
          field: (row) => row.expiry,
        },
        {
          name: "created",
          label: "CREADO",
          align: "left",
          field: (row) => row.created,
        },
        { name: "actions", label: "ACCIONES", align: "center" }, // Columna para los botones
      ],
      rows: [
        {
          token_key: "fe911727",
          expiry: "2024-07-22T13:57:15.631186",
          created: "2024-07-22T03:57:15.633147",
        },
        {
          token_key: "581ffc1e",
          expiry: "2024-07-22T17:36:52.271700",
          created: "2024-07-22T07:36:52.271700",
        },
        {
          token_key: "87be98d7",
          expiry: "2024-07-22T18:59:46.443883",
          created: "2024-07-22T08:59:46.444171",
        },
        {
          token_key: "cce89d02",
          expiry: "2024-07-22T19:28:07.602180",
          created: "2024-07-22T09:28:07.602180",
        },
        {
          token_key: "95b2f51e",
          expiry: "2024-07-22T20:11:28.476326",
          created: "2024-07-22T10:11:28.477031",
        },
        {
          token_key: "1fc746f4",
          expiry: "2024-07-22T20:26:46.957087",
          created: "2024-07-22T10:26:46.957087",
        },
      ],
      pagination: {
        rowsPerPage: 10,
      },
    };
  },
  methods: {
    refreshTable() {
      // Add logic to refresh the table data if needed
    },



    handleButtonClick(row) {
      // Handle button click action
      console.log("Button clicked for row:", row);
    },
  },
};
</script>

<style scoped>
/* Add custom styles here */
</style>
