<template>
  <q-page>
    <Titulo titulo="PreInversiones" icono="text_snippet"></Titulo>
    <CrudTable
      :filters="filters"
      :columns="columns"
      :url="url"
      order="-id"
      ref="crudTable"
    >
      <template v-slot:buttons="{ open }">
        <q-btn
          icon="add"
          color="primary"
          @click="openModal(open)"
          label="Nueva PreInversión"
        />
      </template>
      <template v-slot:form="{ close, update }">
        <q-card style="width: 1200px; max-width: 90vw">
          <q-toolbar class="q-pa-md">
            <q-icon name="settings" size="md" />
            <q-toolbar-title>
              {{ proyecto.id ? "Editar" : "Agregar" }} PreInversión
            </q-toolbar-title>
            <q-space />
            <q-btn flat round icon="close" @click="closeModal(close)" />
          </q-toolbar>
          <q-card-section>
            <PreInversionForm
              :valores="proyecto"
              @guardar="guardar(update, close)"
              @cancelar="cerrarModal(close)"
              @quit="closeModal(close)"
              isModal
              :isMigrated="isMigrated"
              @close-success="($event) => closeSuccess($event, close)"
            >
            </PreInversionForm>
          </q-card-section>
        </q-card>
      </template>

      <template v-slot:row="{ row, open, eliminar }">
        <q-tr>
          <q-td>{{ row.id }}</q-td>
          <q-td style="width: 350px">{{ row.nombre }}</q-td>
          <q-td>{{ row.sector }}</q-td>
          <q-td>{{ row.codigo_convenio }}</q-td>
          <q-td>{{ row.programa ? row.programa.sigla_prog_convenio: "--" }}</q-td>
          <q-td>{{ formatNumber(row.monto_comprometido_estudio) }}</q-td>
          <q-td>{{ formatNumber(row.monto_contratado_estudio) }}</q-td>
          <q-td>{{ formatNumber(row.monto_pagado_estudio) }}</q-td>
          <q-td style="text-align: right">{{ row.avance_financiero }}</q-td>
          <q-td style="text-align: center">{{ row.estado.nombre }}</q-td>
          <q-td style="text-align: center">{{ row.fecha_inicio }}</q-td>
          <q-td style="text-align: center">{{ row.fecha_conclusion }}</q-td>
          <q-td style="text-align: center">
            <div class="btn-group">
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
                color="blue"
                icon="remove_red_eye"
                @click="
                  this.$router.push({
                    name: 'preinversion-metas',
                    params: { preinversion_id: row.id },
                  })
                "
              >
                <q-tooltip>Ver Detalle</q-tooltip>
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
            </div>
          </q-td>
        </q-tr>
      </template>
    </CrudTable>
  </q-page>
</template>

<script>
import { ref, inject, onMounted, computed, watch } from "vue";
import CrudTable from "@components/common/CrudTable";
import PreInversionForm from "components/Formularios/PreInversion";
import FichaProyecto from "components/Formularios/FichaProyecto.vue";
import { estados } from "src/constants/estados";
import { useQuasar } from "quasar";
import { useRoute } from "vue-router";

const filters = [
  {
    label: "Buscar por:  Nombre/Programa/Codigo-convenio",
    field: "search",
    type: "input",
  },
];

const columns = [
  {
    name: "id",
    label: "ID",
    sortable: false,
  },
  {
    name: "nombre",
    label: "nombre",
    sortable: true,
  },
  {
    name: "sector",
    label: "sector",
    sortable: true,
  },
  {
    name: "codigo_convenio",
    label: "codigo_convenio",
    sortable: true,
  },
  {
    name: "programa",
    label: "programa",
    sortable: true,
  },
  {
    name: "comprometido",
    label: "comprometido(Bs.)",
    sortable: true,
  },
  {
    name: "contratado_estudio",
    label: "contratado estudio(Bs)",
    sortable: true,
  },
  {
    name: "monto_pagado",
    label: "monto pagado(Bs.)",
    sortable: true,
  },
  {
    name: "avance_financiero",
    label: "Avance Financiero%",
    sortable: true,
  },
  {
    name: "estado",
    label: "Estado",
    sortable: true,
  },
  {
    name: "fecha_inicio",
    label: "Fecha Inicio",
    sortable: true,
  },
  {
    name: "fecha_conclusion",
    label: "Fecha de Conclusión",
    sortable: true,
  },
  {
    name: "acciones",
    label: "Acciones",
    sortable: false,
  },
];

export default {
  components: { CrudTable, PreInversionForm, FichaProyecto },
  name: "PreInversiones",
  setup() {
    const router = useRoute();
    const $q = useQuasar();
    const _http = inject("http");
    const _message = inject("message");
    const showConfirmation = ref(false);
    const url = ref(
      "/proyectos-preinversion/" +
        (router.query.programa_id
          ? `?programa_id=${router.query.programa_id}`
          : "")
    );

    const crudTable = ref(null);
    const proyecto = ref({
      tipo_migrado: "nuevo",
    });

    const isMigrated = computed(() => {
      return proyecto.value.tipo_migrado
        ? proyecto.value.tipo_migrado == "migrado"
        : false;
    });

    const resetForm = () => {
      proyecto.value = {
        nombre: null,
        estado: null,
      };
    };

    const openModal = async (open, id) => {
      resetForm();
      if (id) proyecto.value = await _http.get(`${url.value}${id}/`);
      open();
    };

    const closeModal = (close) => {
      resetForm();
      close();
    };

    const closeSuccess = (message, close) => {
      crudTable.value.updateList();
      _message.success(message);
      close();
    };

    const confirmClose = (close) => {
      showConfirmation.value = true;
    };

    const exitModal = (close) => {
      showConfirmation.value = true;
    };
    const cerrarModal = (close) => {
      console.log("este modal");
      showConfirmation.value = true;
      confirmClose(close);
    };

    const guardar = async (update, close) => {
      const mensaje = !proyecto.value.id
        ? "PreInversión creada de manera exitosa."
        : "PreInversión actualizada de manera exitosa.";
      if (proyecto.value.id) {
        await _http.put(
          `/proyectos-preinversion/${proyecto.value.id}/`,
          proyecto.value
        );
      } else {
        await _http.post(`/proyectos-preinversion/?paso=5`, proyecto.value);
      }
      _message.success(mensaje);
      await update();
      closeModal(close);
    };

    const downloadFile = async (programaId) => {
      $q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        message: "Ficha de Programa Descargado exitosamente.",
      });

      const params = { programa_id: programaId };

      try {
        const respuesta = await _http.get(
          _http.convertQuery("/reporte-programa-pdf/", params),
          true,
          {},
          "blob"
        );
        descargarArchivo(new Blob([respuesta]), "reporte_ficha_programa.pdf");
      } catch (error) {
        console.error("Error al descargar el PDF", error);
      }
    };

    const descargarArchivo = (blob, nombreArchivo) => {
      const url = window.URL.createObjectURL(blob);

      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");

      const timestamp = `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;

      const fileExtension = nombreArchivo.split(".").pop();
      const nombreArchivoConTimestamp = `${nombreArchivo.replace(
        `.${fileExtension}`,
        ""
      )}_${timestamp}.${fileExtension}`;

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", nombreArchivoConTimestamp);
      document.body.appendChild(link);
      link.click();
      link.remove();
    };

    const openProyectos = (programaId) => {
      router.push({ name: "proyectos", query: { programa_id: programaId } });
    };
    const formatNumber = (value) => {
      if (value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      } else {
        return value;
      }
    };
    return {
      proyecto,
      estados,
      filters,
      columns,
      url,
      closeModal,
      cerrarModal,
      openModal,
      guardar,
      showConfirmation,
      confirmClose,
      exitModal,
      isMigrated,
      downloadFile,
      openProyectos,
      crudTable,
      closeSuccess,
      formatNumber,
    };
  },
  methods: {
    truncateText(text, length) {
      if (text != null) {
        return text.length > length ? text.slice(0, length) + "..." : text;
      }
    },
  },
};
</script>
<style>
.btn-group {
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start; /* O 'center' o 'space-between', dependiendo de cómo quieras distribuir los botones */
  align-items: center;
}
</style>
