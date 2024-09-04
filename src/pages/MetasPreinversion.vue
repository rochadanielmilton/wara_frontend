<template>
    <q-page>
      <Titulo titulo="Metas-PreInversión" icono="assignment_turned_in"></Titulo>
      <CrudTable :filters="filters" :columns="columns" :url="url" order="nombre">
        <template v-slot:buttons="{ open }">
          <q-btn
            icon="add"
            color="primary"
            @click="openModal(open)"
            label="Nueva Meta"
          />
        </template>
        <template v-slot:form="{ close, update }">
          <q-card style="width: 1200px; max-width: 90vw">
            <q-toolbar class="q-pa-md">
              <q-icon name="settings" size="md" />
              <q-toolbar-title>
                {{ proyecto.id ? "Editar" : "Agregar" }} Meta
              </q-toolbar-title>
              <q-space />
              <q-btn flat round icon="close" @click="closeModal(close)" />
            </q-toolbar>
            <q-card-section>
              <MetasForm
                :valores="proyecto"
                @guardar="guardar(update, close)"
                @cancelar="closeModal(close)"
                @quit="closeModal(close)"
                isModal
                :isMigrated="isMigrated"
              >
              </MetasForm>
            </q-card-section>
          </q-card>
        </template>

        <template v-slot:row="{ row, open, eliminar }">
          <q-tr class="q-tr-table">
            <q-td>{{ row.id }}</q-td>
            <!-- <q-td class="wide-column">{{row.programas_proyectos}}</q-td> -->
            <q-td>{{ row.meta_title}}</q-td>
            <q-td>{{ row.valor}}</q-td>
            <!-- <q-td>{{ row.entidad_ejecutora }}</q-td>
            <q-td>{{ row.viceministerio }}</q-td>
            <q-td>{{ row.co_ejecutor }}</q-td>
            <q-td>{{ row.fecha_suscripcion_convenio_contrato }}</q-td>
            <q-td>{{ row.fecha_vencimiento }}</q-td>
            <q-td class="wide-column2">{{ row.numero_proyectos }}</q-td>
            <q-td>{{ row.vigente_no_vigente }}</q-td> -->
            <q-td>
              <q-btn
                class="q-pa-xs"
                flat
                round
                icon="edit"
                @click="openModal(open, row.meta)"
              />
              <q-btn
                class="q-pa-xs"
                flat
                round
                color="negative"
                icon="delete"
                @click="eliminar({ url: `${url}${row.meta}/` })"
              />

            </q-td>
          </q-tr>
        </template>
      </CrudTable>
    </q-page>
  </template>

  <script>
  import { ref, inject, onMounted, computed } from "vue";
  import CrudTable from "@components/common/CrudTable";
  import MetasForm from "components/Formularios/MetasForm.vue";
  import FichaProyecto from "components/Formularios/FichaProyecto.vue";
  import { estados } from "src/constants/estados";
  import { useQuasar } from "quasar";
  import { useRoute } from "vue-router";

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
      label: "Meta",
      sortable: true,
    },
    {
      name: "sigla",
      label: "valor",
      sortable: true,
    },

    {
      name: "acciones",
      label: "Acciones",
      sortable: false,
    },
  ];

  export default {
    components: { CrudTable, MetasForm, FichaProyecto },
    name: "Programas",
    setup() {
      const route = useRoute();
      const $q = useQuasar();
      const _http = inject("http");
     const proId =ref(route.params.preinversion_id);

    console.log("holaaaaaaaaaaa", proId);

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
      const url = ref("/proyectos-preinversion/"+proId.value+"/metas/");
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
        if (id) {
        proyecto.value = await _http.get(`${url.value}${id}/`);
        //console.log('hola++++',params);
      }
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
        showConfirmation.value = true;
      };

      const guardar = async (update, close) => {
        const mensaje = !proyecto.value.objetivo
          ? "Proyecto creado de manera exitosa."
          : "Proyecto actualizado de manera exitosa.";
        if (proyecto.value.id) {
          await _http.put(`${url.value}${proyecto.value.meta}/`, proyecto.value);
        } else {
          await _http.put(`${url.value}${proyecto.value.meta}/`, proyecto.value);
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

        const params = { preinversion_id: programaId };

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
        router.push({ name: "proyectos", query: { preinversion_id: programaId } });
      };

      return {
        proId,
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
  </style>


