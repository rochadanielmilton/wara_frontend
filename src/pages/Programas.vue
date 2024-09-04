<template>
  <q-page>
    <Titulo titulo="Programas" icono="work"></Titulo>
    <CrudTable :filters="filters" :columns="columns" :url="url" order="nombre">
      <template v-slot:buttons="{ open }">
        <q-btn
          icon="add"
          color="primary"
          @click="openModal(open)"
          label="Nuevo Programa"
        />
      </template>
      <template v-slot:form="{ close, update }">
        <q-card style="width: 1200px; max-width: 90vw">
          <q-toolbar class="q-pa-md">
            <q-icon name="settings" size="md" />
            <q-toolbar-title>
              {{ proyecto.id ? "Editar" : "Agregar" }} Programa
            </q-toolbar-title>
            <q-space />
            <q-btn flat round icon="close" @click="closeModal(close)" />
          </q-toolbar>
          <q-card-section>
            <ProgramasForm
              :valores="proyecto"
              @guardar="guardar(update, close)"
              @cancelar="cerrarModal(close)"
              @quit="closeModal(close)"
              isModal
              :isMigrated="isMigrated"
            />
          </q-card-section>
        </q-card>
      </template>

      <template v-slot:row="{ row, open, eliminar }">
        <q-tr class="q-tr-table">
          <q-td>{{ row.id }}</q-td>
          <q-td class="wide-column">{{ row.programas_proyectos }}</q-td>
          <q-td>{{ row.sigla_prog_convenio }}</q-td>
          <q-td>{{ row.entidad_ejecutora }}</q-td>
          <q-td>{{ row.viceministerio }}</q-td>
          <q-td>{{ row.co_ejecutor }}</q-td>
          <q-td>{{ row.fecha_suscripcion_convenio_contrato }}</q-td>
          <q-td>{{ row.fecha_vencimiento }}</q-td>

          <q-td
            >
            <q-btn-group unelevated>
              <q-btn
                label="Proyectos"
                color="primary"
                size="xs"
                @click.prevent="openProyectos(row.id)"
                >
              <q-tooltip>Ver Proyectos Inversión</q-tooltip>
            </q-btn>

              <q-btn
                @click="downloadFile"
                :label="row.numero_proyectos"
                color="secondary"
                size="xs"
                @click.prevent="descargarProyectos(row.id)"
                >
              <q-tooltip>Descargar Proyectos Inversión</q-tooltip>
            </q-btn>
            </q-btn-group>

          </q-td
          >


          <q-td
            >
            <q-btn-group unelevated>
              <q-btn
                label="Preinversiones"
                color="primary"
                size="xs"
                @click.prevent="openPreinversiones(row.id)"
                >
              <q-tooltip>Ver Proyectos Preinversión</q-tooltip>
            </q-btn>
              <q-btn
                @click="downloadFile"
                :label="row.numero_preinversiones"
                color="secondary"

                size="xs"
                @click.prevent="descargarProyectosPreinversion(row.id)"

              >
              <q-tooltip>Descargar Proyectos Preinversión</q-tooltip>
            </q-btn>
            </q-btn-group>
          </q-td>

          <q-td
            :class="{
              'highlight-text': row.vigente_no_vigente === 'NO VIGENTE',
              'highlight-text-green': row.vigente_no_vigente === 'VIGENTE',
            }"
          >
            {{ row.vigente_no_vigente }}</q-td
          >

          <q-td>
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
              <!-- <q-btn
                class="q-pa-xs"
                flat
                round
                color="green"
                icon="article"
                @click="downloadFile(row.id)"
              /> -->
              <q-btn
                class="q-pa-xs"
                flat
                round
                color="green"
                icon="file_download"
                @click="downloadFile(row.id)"
              >
                <q-tooltip>Descargar Ficha</q-tooltip>
              </q-btn>
              <!-- <q-btn v-if="row.numero_proyectos > 0" class="q-pa-xs" flat round icon="filter_none"
                @click="openProyectos(row.id)">
                <q-tooltip>Ver Proyectos</q-tooltip>
              </q-btn> -->
              <q-btn
                class="q-pa-xs"
                flat
                round
                color="blue"
                icon="remove_red_eye"
                @click="
                  this.$router.push({
                    name: 'programa-objetivos',
                    params: { programa_id: row.id },
                  })
                "
              >
                <q-tooltip>Ver Objetivos</q-tooltip>
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
import { ref, inject, onMounted, computed } from "vue";
import CrudTable from "@components/common/CrudTable";
import ProgramasForm from "components/Formularios/Programas.vue";
import FichaProyecto from "components/Formularios/FichaProyecto.vue";
import { estados } from "src/constants/estados";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

const filters = [
  {
    label: "Buscar por nombre, sigla o viceministerio",
    field: "search",
    type: "input",
  },
];

const columns = [
  {
    name: "id",
    label: "ID",
    sortable: true,
  },
  {
    name: "nombre",
    label: "nombre",
    sortable: true,
  },
  {
    name: "sigla",
    label: "sigla",
    sortable: true,
  },
  {
    name: "entidad_ejecutora",
    label: "Entidad Ejecutora",
    sortable: true,
  },
  {
    name: "viceministerio",
    label: "Viceministerio",
    sortable: true,
  },
  {
    name: "co_ejecutor",
    label: "Co-Ejecutor",
    sortable: true,
  },
  {
    name: "fecha_suscripcion_convenio_contrato",
    label: "Fecha Convenio/Contrato",
    sortable: true,
  },
  {
    name: "fecha_vencimiento",
    label: "Fecha de Vencimiento",
    sortable: true,
  },
  {
    name: "numero_proyectos",
    label: "N° P.inversión",
    sortable: true,
  },
  {
    name: "numero_preinversiones",
    label: "N° P.preinversión",
    sortable: true,
  },
  {
    name: "estado",
    label: "Estado",
    sortable: true,
  },
  {
    name: "acciones",
    label: "Acciones",
    sortable: false,
  },
];

export default {
  components: { CrudTable, ProgramasForm, FichaProyecto },
  name: "Programas",
  setup() {
    const router = useRouter();
    const $q = useQuasar();
    const _http = inject("http");
    _http
      .get("/estados/?ordering=nombre")
      .then((response) => {
        const fetchedOptions = response.results;

        const estadoFilter = filters.find(
          (filter) => filter.field === "estado"
        );
        if (estadoFilter) {
          estadoFilter.options = fetchedOptions.map((option) => ({
            label: option.nombre,
            value: option.id,
          }));
        }
      })
      .catch((error) => {
        console.error("Error fetching estado options:", error);
      });
    const _message = inject("message");
    const showConfirmation = ref(false);
    const url = ref("/programas/");
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
        // nombre: null,
        // estado: null,
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
      console.log("datos al guardar...", proyecto.value);
      const mensaje = !proyecto.value.id
        ? "Programa creado de manera exitosa."
        : "Programa actualizado de manera exitosa.";

      // proyecto.value.sector_ids = proyecto.value.sector_ids.map((item) => item.id);
      console.log("para guardarrrrr", proyecto.value);


      // proyecto.value.sector_ids = proyecto.value.sector_ids.id;
      // proyecto.value.sector_ids = proyecto.value.sector_ids;
      console.log("proyecto.value.sector_ids", proyecto.value.sector_ids);

      if (proyecto.value.id) {
        await _http.put(`${url.value}${proyecto.value.id}/`, proyecto.value);
      } else {

        // const config = { headers: { "Content-Type": "multipart/form-data" } };
        // const formData = new FormData();
        // for (const [key, value] of Object.entries(proyecto.value)) {
        //   formData.append(key, value);
        // }

        // console.log("formdata*** POST", formData);
        await _http.post(`${url.value}`, proyecto.value);

        // await _http.post(`${url.value}`, proyecto.value);
      }
      _message.success(mensaje);
      await update();
      closeModal(close);
    };

    const descargarProyectos = async (programaId) => {
      const params = { programa_id: programaId };

      try {
        const respuesta = await _http.get(
          _http.convertQuery("/reporte-proyectos-programa/", params),
          true,
          {},
          "blob"
        );
        descargarArchivo(
          new Blob([respuesta]),
          "reporte_proyectos_programa.pdf"
        );
        $q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Proyectos de Programa Descargado exitosamente.",
        });
      } catch (error) {
        console.error("Error al descargar el PDF", error);
      }
    };
    const descargarProyectosPreinversion = async (programaId) => {
      const params = { programa_id: programaId };

      try {
        const respuesta = await _http.get(
          _http.convertQuery("/reporte-preinversion-programa/", params),
          true,
          {},
          "blob"
        );
        descargarArchivo(
          new Blob([respuesta]),
          "reporte_preinversion_programa.pdf"
        );
        $q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Proyectos de preinversion de Programa Descargado exitosamente.",
        });
      } catch (error) {
        console.error("Error al descargar el PDF", error);
      }
    };
    const downloadFile = async (programaId) => {
      if(typeof programaId !='number') return;
      const params = { programa_id: programaId };

      try {
        const respuesta = await _http.get(
          _http.convertQuery("/reporte-programa-pdf/", params),
          true,
          {},
          "blob"
        );
        descargarArchivo(new Blob([respuesta]), "reporte_ficha_programa.pdf");
        $q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Ficha de Programa Descargado exitosamente.",
        });
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

    const openPreinversiones = (programaId) => {
      router.push({ name: "preinversiones", query: { programa_id: programaId } });
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
      openPreinversiones,
      descargarProyectos,
      descargarProyectosPreinversion,
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
<style scoped>
.wide-column {
  width: 300px;
  text-align: center;
  white-space: normal;
  word-break: break-word;
  overflow-wrap: break-word;
  vertical-align: middle;
}

.wide-column2 {
  text-align: center;
  white-space: normal;
  word-break: break-word;
  font-weight: bold;
}
.btn-group {
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start; /* O 'center' o 'space-between', dependiendo de cómo quieras distribuir los botones */
  align-items: center;
}
.highlight-text {
  color: red;

  text-align: center;
}

.highlight-text-green {
  color: rgb(8, 167, 8);

  text-align: center;
}
.no-underline {
  text-decoration: none;
  color: rgb(5, 73, 175);
}
</style>
