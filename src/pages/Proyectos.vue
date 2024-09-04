<template>
  <q-page>
    <Titulo titulo="Proyectos" icono="handyman"> </Titulo>
    <!-- <h6>{{ programa_id }}</h6> -->

    <CrudTable :filters="filters" :columns="columns" :url="url" order="nombre">
      <template v-slot:buttons="{ open }">
        <q-btn
          v-if="usuario && usuario.sector == null"
          v-for="s in sectores"
          :key="s.id"
          icon="add"
          :color="getColor(s.nombre)"
          @click="openModalSector(open, s)"
          :label="s.nombre"
        >
          <q-tooltip>Registrar Proyecto {{ s.nombre }}</q-tooltip>
        </q-btn>
        <q-btn
          v-if="usuario && usuario.sector != null"
          icon="add"
          color="primary"
          @click="openModal(open)"
          label="Nuevo Proyecto"
          ><q-tooltip>Crear</q-tooltip></q-btn
        >
      </template>

      <template v-slot:form="{ close, update }">
        <q-card style="width: 1200px; max-width: 90vw">
          <q-toolbar class="q-pa-md">
            <q-icon name="settings" size="md" />
            <q-toolbar-title>
              {{ proyecto.id ? "Editar" : "Agregar" }} Proyecto
            </q-toolbar-title>
            <q-space />
            <q-btn flat round icon="close" @click="closeModal(close)" />
          </q-toolbar>
          <q-card-section>
            <ResiduosForm
              v-if="
                (usuario &&
                  usuario.sector &&
                  usuario.sector.nombre == 'RESIDUOS') ||
                res == true
              "
              :valores="proyecto"
              @guardar="guardar1(update, close)"
              @cancelar="cerrarModal(close)"
              @quit="closeModal(close)"
              isModal
              :isMigrated="isMigrated"
              denominativo-ejecutivo="RESIDUOS"
              deno-vicemin="VAPSB"
              sector-clasificador="SANEAMIENTO BÁSICO"
              :programa-id="programa_id"
              :isDisabled="isDisabled"
            />

            <CuencasForm
              v-if="
                (usuario &&
                  usuario.sector &&
                  usuario.sector.nombre == 'CUENCAS') ||
                res1 == true
              "
              :valores="proyecto"
              @guardar="guardar2(update, close)"
              @cancelar="cerrarModal(close)"
              @quit="closeModal(close)"
              isModal
              :isMigrated="isMigrated"
              denominativo-ejecutivo="CUENCAS"
              deno-vicemin="VRHR"
              sector-clasificador="RECURSOS HÍDRICOS"
              :programa-id="programa_id"
              :isDisabled="isDisabled"
            />

            <AguaForm
              v-if="
                (usuario &&
                  usuario.sector &&
                  usuario.sector.nombre == 'AGUA Y SANEAMIENTO') ||
                res2 == true
              "
              :valores="proyecto"
              @guardar="guardar3(update, close)"
              @cancelar="cerrarModal(close)"
              @quit="closeModal(close)"
              isModal
              :isMigrated="isMigrated"
              denominativo-ejecutivo="AGUA Y SANEAMIENTO"
              deno-vicemin="VAPSB"
              sector-clasificador="SANEAMIENTO BÁSICO"
              :sector-id="current_sector_id"
              :viceministerio-id="current_viceministerio_id"
              :programa-id="programa_id"
              :isDisabled="isDisabled"
            />

            <RiegoForm
              v-if="
                (usuario &&
                  usuario.sector &&
                  usuario.sector.nombre == 'RIEGO') ||
                res3 == true
              "
              :valores="proyecto"
              @guardar="guardar4(update, close)"
              @cancelar="cerrarModal(close)"
              @quit="closeModal(close)"
              isModal
              :isMigrated="isMigrated"
              denominativo-ejecutivo="RIEGO"
              deno-vicemin="VRHR"
              sector-clasificador="RECURSOS HÍDRICOS"
              :programa-id="programa_id"
              :isDisabled="isDisabled"
            />
          </q-card-section>
        </q-card>
      </template>

      <template v-slot:row="{ row, open, eliminar }">
        <q-tr
          :class="{ 'highlight-green': row.estado_name === 'EN EJECUCIÓN' }"
        >
          <!-- <q-td style="text-align: center">{{ row.codigo_convenio }}</q-td> -->
          <q-td style="text-align: center">{{ row.codigo_sisin }}</q-td>
          <q-td class="wide-column">{{ row.nombre }}</q-td>
          <q-td>{{ row.programa_sigla }}</q-td>
          <q-td>{{ row.sector_name }}</q-td>
          <q-td>{{ row.viceministerio_name }}</q-td>
          <q-td>{{ row.tipo_name }}</q-td>
          <q-td>{{ row.fecha_inicio }}</q-td>
          <q-td>{{ row.fecha_conclusion }}</q-td>
          <q-td style="text-align: center">{{ row.estado_name }}</q-td>
          <q-td
            :class="{
              'highlight-text-red-5':
                row.estado_name === 'CANCELADO' ||
                row.estado_name === 'CONCLUIDO' ||
                row.estado_name === 'DESISTIDO' ||
                row.estado_name === 'PARALIZADO' ||
                row.estado_name === 'CERRADO',
              'highlight-text-green-8':
                row.estado_name === 'EN EJECUCIÓN' ||
                row.estado_name === 'PROGRAMADO',
              'highlight-text-yellow-8':
                row.estado_name === 'DEBITO' ||
                row.estado_name === 'EVALUACION' ||
                row.estado_name === 'PROCESO CONTRATACION' ||
                row.estado_name === 'PROCESO DE LICITACION',
            }"
            ><q-icon name="brightness_1" style="font-size: 18px"></q-icon
          ></q-td>
          <q-td>
            <div class="btn-row">
              <!-- <q-btn
                class="q-pa-xs"
                flat
                round
                icon="edit"
                @click="openModalEdit(open, row.id, row.sector_name)"
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
                    name: 'proyecto-detalle',
                    params: { proyectoId: row.id },
                  })
                "
              >
                <q-tooltip>Ver Detalle</q-tooltip>
              </q-btn> -->

              <q-btn
                class="q-pa-xs"
                flat
                round
                icon="edit"
                @click="
                  this.$router.push({
                    name: 'proyecto-detalle',
                    params: { proyectoId: row.id },
                  })
                "
              >
                <q-tooltip>Editar</q-tooltip>
              </q-btn>

              <q-btn
                class="q-pa-xs"
                flat
                round
                color="blue"
                icon="remove_red_eye"
                @click="openModalEdit(open, row.id, row.sector_name)"
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
import { ref, inject, onMounted, computed } from "vue";
import CrudTable from "@components/common/CrudTable";
import ProyectosForm from "components/Formularios/Proyectos.vue";
import ResiduosForm from "components/Formularios/ResiduosForm.vue";
import RiegoForm from "components/Formularios/RiegoForm.vue";
import CuencasForm from "components/Formularios/CuencasForm.vue";
import AguaForm from "components/Formularios/AguaForm.vue";
import FichaProyecto from "components/Formularios/FichaProyecto.vue";
import { estados } from "src/constants/estados";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import Usuarios from "./Usuarios.vue";
const filters = [
  {
    label: "Nombre/Código SISIN",
    field: "nombre",
    type: "input",
  },
  {
    label: "Viceministerio",
    field: "viceministerio",
    type: "select",
    options: [],
  },
  {
    label: "Gestion",
    field: "gestion",
    type: "input",
  },
  {
    label: "Estado",
    field: "estado",
    type: "select",
    options: [],
  },
  {
    label: "Emblematico",
    field: "estado_emblematico",
    type: "select",
    options: [
      {
        label: "SI",
        value: "t",
      },
      {
        label: "NO",
        value: "f",
      },
    ],
  },
];

const columns = [
  /*{
      name: "codigo convenio",
      label: "codigo convenio",
      sortable: true,
    },*/
  {
    name: "codigo_sisin",
    label: "codigo_sisin",
    sortable: true,
  },
  {
    name: "nombre",
    label: "Nombre",
    sortable: true,
  },
  {
    name: "programa_sigla",
    label: "programa",
    sortable: true,
  },
  {
    name: "sector",
    label: "Sector",
    sortable: true,
  },
  {
    name: "viceministerio",
    label: "Viceministerio",
    sortable: true,
  },
  {
    name: "estado",
    label: "Tipo",
    sortable: true,
  },
  {
    name: "estado",
    label: "Fecha Inicio",
    sortable: true,
  },
  {
    name: "estado",
    label: "Fecha Conclusión",
    sortable: true,
  },
  {
    name: "estado",
    label: "Estado",
    sortable: true,
  },
  {
    name: "estado",
    label: "",
    sortable: true,
  },
  {
    name: "acciones",
    label: "Acciones",
    sortable: false,
  },
];

export default {
  components: {
    CrudTable,
    ProyectosForm,
    FichaProyecto,
    ResiduosForm,
    RiegoForm,
    CuencasForm,
    AguaForm,
  },
  name: "Proyectos",
  setup() {
    const store = useStore();
    const route = useRoute();
    const _storage = inject("storage");
    const sectores = ref([]);
    const res = ref(false);
    const res1 = ref(false);
    const res2 = ref(false);
    const res3 = ref(false);
    const isDisabled = ref(false);
    const current_sector_id = ref(null);
    const current_viceministerio_id = ref(null);
    const programa_id = computed(() => route.query.programa_id);
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

    Promise.all([
      _http.get("/sectores_select/?ordering=nombre"),
      _http.get("/viceministerios_select/?ordering=nombre"),
    ]).then(([s, v]) => {
      sectores.value = s.results;

      const viceministerioFilter = filters.find(
        (filter) => filter.field === "viceministerio"
      );
      if (viceministerioFilter) {
        viceministerioFilter.options = v.results.map((option) => ({
          label: option.nombre,
          value: option.id,
        }));
      }
    });

    const getColor = (sectorName) => {
      switch (sectorName) {
        case "RESIDUOS":
          return "warning";
        case "CUENCAS":
          return "light-blue-14";
        case "AGUA Y SANEAMIENTO":
          return "blue-14";
        case "RIEGO":
          return "teal";
        default:
          return "primary";
      }
    };

    const _message = inject("message");
    const showConfirmation = ref(false);

    const url = ref(
      "/proyectos/" +
        (route.query.programa_id
          ? `?programa_id=${route.query.programa_id}`
          : "")
    );

    const proyecto = ref({
      tipo_migrado: "nuevo",
    });

    const isMigrated = computed(() => {
      return proyecto.value.tipo_migrado
        ? proyecto.value.tipo_migrado == "migrado"
        : false;
    });

    const usuario = computed(() => store.state.global.usuario);

    const resetForm = () => {
      proyecto.value = {
        nombre: null,
        estado: null,
      };
    };

    const openModalEdit = async (open, id, sector) => {
      if (sector == "RESIDUOS") {
        res.value = true;
        res1.value = false;
        res2.value = false;
        res3.value = false;
        proyecto.value = await _http.get("/proyectos/" + id + "/");
      }
      if (sector == "CUENCAS") {
        res.value = false;
        res1.value = true;
        res2.value = false;
        res3.value = false;
        proyecto.value = await _http.get("/proyectos/" + id + "/");
      }
      if (sector == "AGUA Y SANEAMIENTO") {
        res.value = false;
        res1.value = false;
        res2.value = true;
        res3.value = false;
        proyecto.value = await _http.get("/proyectos/" + id + "/");
      }
      if (sector == "RIEGO") {
        res.value = false;
        res1.value = false;
        res2.value = false;
        res3.value = true;
        proyecto.value = await _http.get("/proyectos/" + id + "/");
      }
      isDisabled.value = true;
      open();
    };

    const openModalSector = (open, sector) => {
      current_sector_id.value = sector.id;
      current_viceministerio_id.value = sector.viceministerio.id;
      if (sector.nombre == "RESIDUOS") openModalAdmin1(open);
      if (sector.nombre == "CUENCAS") openModalAdmin2(open);
      if (sector.nombre == "AGUA Y SANEAMIENTO") openModalAdmin3(open);
      if (sector.nombre == "RIEGO") openModalAdmin4(open);
    };

    const openModal = async (open, id) => {
      resetForm();
      const url =
        "/proyectos/" +
        (route.query.programa_id
          ? `${id}/?programa_id=${route.query.programa_id}`
          : "");
      if (id) proyecto.value = await _http.get("/proyectos/" + id + "/");
      open();
    };

    const openModalAdmin1 = async (open, id) => {
      resetForm();
      res.value = true;
      res1.value = false;
      res2.value = false;
      res3.value = false;
      const url =
        "/proyectos/" +
        (route.query.programa_id
          ? `${id}/?programa_id=${route.query.programa_id}`
          : "");
      if (id) proyecto.value = await _http.get("/proyectos/" + id + "/");
      open();
    };

    const openModalAdmin2 = async (open, id) => {
      resetForm();
      res.value = false;
      res1.value = true;
      res2.value = false;
      res3.value = false;
      const url =
        "/proyectos/" +
        (route.query.programa_id
          ? `${id}/?programa_id=${route.query.programa_id}`
          : "");
      if (id) proyecto.value = await _http.get("/proyectos/" + id + "/");
      open();
    };

    const openModalAdmin3 = async (open, id) => {
      resetForm();
      res.value = false;
      res1.value = false;
      res2.value = true;
      res3.value = false;
      const url =
        "/proyectos/" +
        (route.query.programa_id
          ? `${id}/?programa_id=${route.query.programa_id}`
          : "");
      if (id) proyecto.value = await _http.get("/proyectos/" + id + "/");
      open();
    };

    const openModalAdmin4 = async (open, id) => {
      resetForm();
      res.value = false;
      res1.value = false;
      res2.value = false;
      res3.value = true;
      const url =
        "/proyectos/" +
        (route.query.programa_id
          ? `${id}/?programa_id=${route.query.programa_id}`
          : "");
      if (id) proyecto.value = await _http.get("/proyectos/" + id + "/");
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
      confirmClose(close);
    };

    const guardar = async (update, close) => {
      const mensaje = !proyecto.value.id
        ? "Proyecto creado de manera exitosa."
        : "Proyecto actualizado de manera exitosa.";

      try {
        console.log("laksdjñflkjasñdlfjañlsdkfj");
        // valores.value.empresa_constructora = valores.value.empresa_constructora_name;
        const formData = new FormData();

        for (const key in proyecto.value) {
          if (
            key === "imagen_proyecto" &&
            proyecto.value[key] instanceof File
          ) {
            formData.append(key, proyecto.value[key]);
          } else if (proyecto.value[key] != null && key !== "imagen_proyecto") {
            formData.append(key, proyecto.value[key]);
          }
        }

        if (proyecto.value.id) {
          await _http.put(`${url.value}${proyecto.value.id}/`, formData);
        } else {
          await _http.post(`${url.value}`, formData);
        }
        _message.success(mensaje);
        await update();
        closeModal(close);
      } catch (error) {
        _message.error("Ocurrió un error al guardar el proyecto.");
        console.error(error);
      }
    };

    const guardar1 = async (update, close) => {
      //GUARDA RESIDUOS
      console.log("rrrrrrrrrrrrrrr");
      const mensaje = !proyecto.value.id
        ? "Proyecto creado de manera exitosa."
        : "Proyecto actualizado de manera exitosa.";

      try {
        // valores.value.empresa_constructora = valores.value.empresa_constructora_name;
        proyecto.value.sector = proyecto.value.sector_clasificador_name.id;
        proyecto.value.sector_clasificador =
          proyecto.value.sector_clasificador_name.id;
        proyecto.value.sector_clasificador =
          proyecto.value.sector_clasificador_name.id;

        const campos = ["documento_creacion"];
        campos.forEach((campo) => {
          if (
            proyecto.value[campo] == null ||
            typeof proyecto.value[campo] == "string"
          ) {
            delete proyecto.value[campo];
          }
        });

        const fechas = [
          "fecha_conclusion",
          "fecha_inicio",
          "fecha_fin_cif",
          "fecha_inicio_cif",
        ];
        fechas.forEach((fechaKey) => {
          if (proyecto.value[fechaKey] === null) {
            delete proyecto.value[fechaKey];
          }
        });

        // proyecto.value.empresa_constructora = proyecto.value.empresa_constructora_name.id;
        console.log(
          "empresa_constructora",
          proyecto.value.empresa_constructora
        );
        console.log("guardar residuo:::", proyecto.value);

        console.log("alguardar Residuos", proyecto.value);

        const formData = new FormData();

        for (const key in proyecto.value) {
          if (
            key === "imagen_proyecto" &&
            proyecto.value[key] instanceof File
          ) {
            formData.append(key, proyecto.value[key]);
          } else if (proyecto.value[key] != null && key !== "imagen_proyecto") {
            formData.append(key, proyecto.value[key]);
          }
        }
        if (proyecto.value.id) {
          await _http.put(
            `/residuos/proyectos/${proyecto.value.id}/`,
            formData
          );
        } else {
          await _http.post(`/residuos/proyectos/`, formData);
        }
        _message.success(mensaje);
        await update();
        closeModal(close);
      } catch (error) {
        _message.error("Ocurrió un error al guardar el proyecto.");
        console.error(error);
      }
    };

    const guardar2 = async (update, close) => {
      // GUARDAR CUENCAS
      const mensaje = !proyecto.value.id
        ? "Proyecto creado de manera exitosa."
        : "Proyecto actualizado de manera exitosa.";

      try {
        for (const [key, value] of Object.entries(proyecto.value)) {
          if (value === null || value === undefined || value === "")
            delete proyecto.value[key];
        }

        const docus = ["documento_creacion", "imagen_proyecto"];
        docus.forEach((val) => {
          if (typeof proyecto.value[val] === "string")
            delete proyecto.value[val];
        });

        console.log("para guardar cuencas", proyecto.value);

        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const formData = new FormData();
        for (const [key, value] of Object.entries(proyecto.value)) {
          formData.append(key, value);
        }

        if (proyecto.value.id) {
          const reponse = await _http.put(
            `/cuencas/proyectos/${proyecto.value.id}/`,
            formData,
            config
          );
          console.log("reponse_del servidor", reponse);
        } else {
          await _http.post(`/cuencas/proyectos/`, formData, config);
        }
        _message.success(mensaje);
        await update();
        closeModal(close);
      } catch (error) {
        _message.error("Ocurrió un error al guardar el proyecto");
        console.error(error);
      }
    };

    const guardar3 = async (update, close) => {
      const mensaje = !proyecto.value.id
        ? "Proyecto creado de manera exitosa."
        : "Proyecto actualizado de manera exitosa.";

      try {
        // valores.value.empresa_constructora = valores.value.empresa_constructora_name;
        const formData = new FormData();

        for (const key in proyecto.value) {
          if (
            key === "imagen_proyecto" &&
            proyecto.value[key] instanceof File
          ) {
            formData.append(key, proyecto.value[key]);
          } else if (proyecto.value[key] != null && key !== "imagen_proyecto") {
            formData.append(key, proyecto.value[key]);
          }
        }

        if (proyecto.value.id) {
          await _http.put(
            `/agua-saneamiento/proyectos/${proyecto.value.id}/`,
            formData
          );
        } else {
          await _http.post(`/agua-saneamiento/proyectos/`, formData);
        }
        _message.success(mensaje);
        await update();
        closeModal(close);
      } catch (error) {
        _message.error("Ocurrió un error al guardar el proyecto");
        console.error(error);
      }
    };

    const guardar4 = async (update, close) => {
      // GUARDAR RIEGO
      const mensaje = !proyecto.value.id
        ? "Proyecto creado de manera exitosas."
        : "Proyecto actualizado de manera exitosa.";
      try {
        for (const [key, value] of Object.entries(proyecto.value)) {
          if (value === null || value === undefined || value === "")
            delete proyecto.value[key];
        }

        const docus = ["documento_creacion", "imagen_proyecto"];
        docus.forEach((val) => {
          if (typeof proyecto.value[val] === "string")
            delete proyecto.value[val];
        });

        console.log("para guardar RIEGO", proyecto.value);

        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const formData = new FormData();
        for (const [key, value] of Object.entries(proyecto.value)) {
          formData.append(key, value);
        }

        if (proyecto.value.id) {
          await _http.put(
            `/riego/proyectos/${proyecto.value.id}/`,
            formData,
            config
          );
        } else {
          await _http.post(`/riego/proyectos/`, formData, config);
        }
        _message.success(mensaje);
        await update();
        closeModal(close);
      } catch (error) {
        _message.error("Ocurrió un error al guardar el proyecto.");
        console.error(error);
      }
    };

    onMounted(async () => {
      _storage.remove("tab");
    });

    return {
      programa_id,
      openModalAdmin4,
      res3,
      openModalAdmin3,
      res2,
      openModalAdmin2,
      res1,
      openModalAdmin1,
      res,
      openModalEdit,
      usuario,
      proyecto,
      estados,
      filters,
      columns,
      url,
      closeModal,
      cerrarModal,
      openModal,
      openModalSector,
      guardar,
      guardar1,
      guardar2,
      guardar3,
      guardar4,
      showConfirmation,
      confirmClose,
      exitModal,
      isMigrated,
      sectores,
      getColor,
      current_sector_id,
      current_viceministerio_id,
      isDisabled,
    };
  },

  methods: {
    truncateText(text, length) {
      // console.log(text);
      if (text != null) {
        return text.length > length ? text.slice(0, length) + "..." : text;
      }
    },
  },
};
</script>
<style scoped>
.highlight-green {
  background-color: rgba(237, 248, 238, 0.897);
}

.highlight-text-red-5 {
  color: rgb(224, 87, 87);
}

.highlight-text-green-8 {
  color: rgba(28, 182, 40, 0.911);
}

.highlight-text-yellow-8 {
  color: rgb(236, 228, 0);
}

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

.btn-row {
  display: flex;
  flex-wrap: nowrap;
  /* Asegura que los botones no envuelvan a la siguiente línea */
  gap: 5px;
  overflow-x: auto;
  /* Permite el desplazamiento horizontal si los botones no caben */
}
</style>
