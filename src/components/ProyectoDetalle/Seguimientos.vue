<template>
  <div>
    <Titulo titulo="SEGUIMIENTOS" icono="nature_people"></Titulo>
    <q-toolbar-title class="red-title" v-if="isButtonDisabled">
      DEBE INGRESAR A LA SECCION DE <b>EJECUCION</b>, PARA REALIZAR UN
      SEGUIMIENTO
    </q-toolbar-title>

    <div class="row justify-end">
      <q-btn @click="goBack" icon="arrow_back" label="Volver" color="primary" />
    </div>
    <br /><br />
    <CrudTable
      :filters="filters"
      :columns="columns"
      :url="url"
      :order="'createdAt'"
    >
      <template v-slot:buttons="{ open }">
        <q-btn
          v-if="permisos.crear === true"
          icon="add"
          color="primary"
          @click="openModal(open)"
          label="Nuevo Seguimiento"
          :disable="isButtonDisabled"
        />

        <q-btn
          color="primary"
          label="Reporte General Seguimiento"
          icon="file_download"
          @click="descargar_pdf_general"
          :disable="isButtonDisabled"
        />
      </template>

      <template v-slot:form="{ close, update }">
        <q-card style="width: 700px; max-width: 90vw">
          <q-toolbar class="q-pa-md">
            <q-icon name="settings" size="md" />
            <q-toolbar-title>
              {{ Seguimiento.id ? "Editar" : "Agregar" }} Seguimientos
            </q-toolbar-title>
            <q-space />
            <q-btn flat round icon="close" @click="closeModal(close)" />
          </q-toolbar>
          <q-card-section>
            <Seguimiento
              :valores="Seguimiento"
              @guardar="guardar(update, close)"
              @cancelar="cerrarModal(close)"
              @quit="closeModal(close)"
            ></Seguimiento>
          </q-card-section>
        </q-card>
      </template>

      <template v-slot:row="{ row, open, eliminar }">
        <q-tr
          :class="{
            'highlight-row':
              row.estado_seguimiento === 'pendiente' ||
              row.estado_seguimiento === 'observado' ||
              row.estado_seguimiento === 'subsanado',
          }"
        >
          <q-td class="wide-column">{{ row.proyecto_name }}</q-td>
          <q-td>{{ row.mes }}</q-td>
          <q-td>{{ row.anio }}</q-td>
          <q-td>{{ formatNumber(row.total_programado_proyecto) }}</q-td>
          <q-td>{{ formatNumber(row.avance_financiero_mes) }}</q-td>
          <q-td>{{ formatNumber(row.acumulado_financiero_mes) }}</q-td>
          <q-td>{{ row.acumulado_porcentaje_financiero_mes }}</q-td>
          <q-td>{{ row.porcentaje_avance_fisico_mes }}</q-td>
          <q-td>{{ row.acumulado_porcentaje_fisico_mes }}</q-td>
          <q-td>{{ formatNumber(row.saldo_programado_proyecto) }}</q-td>
          <!-- <q-td>{{ row.estado_seguimiento }}</q-td> -->

          <q-td
            :class="{
              'highlight-pendiente': row.estado_seguimiento === 'pendiente',
              'highlight-rechazado': row.estado_seguimiento === 'observado',
              'highlight-aprobado': row.estado_seguimiento === 'aprobado',
              'highlight-subsanado': row.estado_seguimiento === 'subsanado',
            }"
          >
            {{ row.estado_seguimiento }}</q-td
          >
          <!-- <q-td style="font-weight: bold">{{ row.observacion_estado }}</q-td> -->
          <q-td
            ><q-btn
              flat
              class="q-pa-xs q-mx-xs"
              :color="row.estado_seguimiento !== 'aprobado' ? 'red' : 'green'"
              :icon="row.estado_seguimiento !== 'aprobado' ? 'close' : 'check'"
          /></q-td>

          <q-td class="wide-column">{{ row.observacion_estado }}</q-td>

          <q-td>
            <div class="btn-group">
              <template v-if="rol === 'TECNICO SECTOR'">
                <template v-if="row.estado_seguimiento === 'observado'">
                  <q-btn
                    class="q-pa-xs"
                    flat
                    round
                    color="primary"
                    icon="edit"
                    @click="openModal(open, row.id)"
                  >
                    <q-tooltip>Editar</q-tooltip>
                  </q-btn>
                </template>

                <!-- <q-btn
                dense
                class="q-pa-xs"
                flat
                round
                color="primary"
                icon="file_download"
                @click="descargar_pdf_especifico(row.id,row.mes,row.anio)"
              >
                <q-tooltip>Descargar PDF</q-tooltip>
              </q-btn> -->
              </template>

              <template v-if="rol === 'ADMINISTRADOR SECTOR'">
                <!-- <q-btn
                    class="q-pa-xs"
                    flat
                    round
                    color="primary"
                    icon="file_download"
                    @click="descargar_pdf_especifico(row.id,row.mes,row.anio)"
                  >
                    <q-tooltip>Descargar PDF</q-tooltip>
                  </q-btn> -->

                <q-btn
                  v-if="row.estado_seguimiento !== 'aprobado'"
                  class="q-pa-xs"
                  flat
                  round
                  color="primary"
                  icon="edit"
                  @click="openModal(open, row.id)"
                >
                  <q-tooltip>Editar</q-tooltip>
                </q-btn>
              </template>

              <template v-if="rol === 'ADMINISTRADOR MINISTERIO'">
                <div class="btn-group">
                  <!-- <q-btn
                  class="q-pa-xs"
                  flat
                  round
                  color="primary"
                  icon="file_download"
                   @click="descargar_pdf_especifico(row.id,row.mes,row.anio)"
                >
                  <q-tooltip>Descargar PDF</q-tooltip>
                </q-btn> -->

                  <q-btn
                    v-if="row.estado_seguimiento !== 'aprobado'"
                    class="q-pa-xs"
                    flat
                    round
                    color="primary"
                    icon="edit"
                    @click="openModal(open, row.id)"
                  >
                    <q-tooltip>Editar</q-tooltip>
                  </q-btn>
                </div>
              </template>
              <!-- PARA TODOS  -->
              <q-btn
                class="q-pa-xs"
                flat
                round
                color="primary"
                icon="file_download"
                @click="descargar_pdf_especifico(row.id, row.mes, row.anio)"
              >
                <q-tooltip>Descargar PDF</q-tooltip>
              </q-btn>
              <q-btn
                class="q-pa-xs"
                flat
                round
                color="green"
                icon="library_books"
                @click="
                  $router.push({
                    name: 'FichaSeguimiento',
                    params: { seguimiento_id: row.id },
                  })
                "
              >
                <q-tooltip>Ficha Seguimiento</q-tooltip>
              </q-btn>
            </div>
          </q-td>

        </q-tr>
      </template>
    </CrudTable>
  </div>
</template>

<script>
import { ref, inject, onMounted } from "vue";
import CrudTable from "@components/common/CrudTable";
import Seguimiento from "components/Formularios/Seguimiento.vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
const filters = [
  {
    label: "MES",
    field: "mes",
    type: "input",
  },
  {
    name: "ANIO",
    field: "anio",
    label: "AÑO",
    type: "input",
  },
  {
    name: "estado_seguimiento",
    field: "estado_seguimiento",
    label: "ESTADO",
    type: "select",
    options: [
      {
        label: "observado",
        value: "observado",
      },
      {
        label: "aprobado",
        value: "aprobado",
      },
      {
        label: "subsanado",
        value: "subsanado",
      },
      {
        label: "pendiente",
        value: "pendiente",
      },
    ],
  },
];

const columns = [
  {
    name: "orden",
    label: "Proyecto",
    sortable: true,
  },

  {
    name: "ruta",
    label: "MES",
    sortable: true,
  },
  {
    name: "nombre",
    label: "AÑO",
    sortable: true,
  },
  {
    name: "orden",
    label: "total programado proyecto(Bs.)",
    sortable: true,
  },

  {
    name: "orden",
    label: "ejecutado mes(Bs.)",
    sortable: true,
  },
  {
    name: "orden",
    label: "acumulado mes(Bs.)",
    sortable: true,
  },
  {
    name: "orden",
    label: "avance financiero mes(%)",
    sortable: true,
  },
  {
    name: "orden",
    label: "avance fisico mes(%)",
    sortable: true,
  },
  {
    name: "orden",
    label: "acum fisico mes(%)",
    sortable: true,
  },
  {
    name: "orden",
    label: "saldo proyecto(Bs.)",
    sortable: true,
  },

  {
    name: "estado",
    label: "Estado Seguimiento",
    sortable: true,
  },
  {
    name: "orden",
    label: "APR. ",
    sortable: true,
  },
  {
    name: "orden",
    label: "Obs.",
    sortable: true,
    width: "300px",
  },

  {
    name: "acciones",
    label: "Acciones",
    sortable: false,
  },
];

export default {
  components: { CrudTable, Seguimiento },
  name: "Seguimientos",
  setup(props) {
    const rol = ref("");
    const _http = inject("http");
    const _message = inject("message");
    const _storage = inject("storage");
    const route = useRoute();
    const store = useStore();

    const realizacionId = ref(route.params.realizacion_id);
    const url = ref(
      "/seguimientos/?realizacion_id=" + props.proyecto.realizacion_id
    );

    const url_realizacion = ref("/seguimientos/");
    const isButtonDisabled = ref(false);
    const realizacion_id = ref("");

    const permisos = ref({
      crear: false,
      editar: false,
      eliminar: false,
      mostrar: false,
      descargar: false,
      acciones: false,
    });

    const goBack = () => {
      window.history.back();
    };

    const Seguimiento = ref({
      proyecto_id: props.proyecto.id,
      realizacion: realizacion_id.value,
      mes: null,
      anio: null,
      avance_financiero_mes: null,
      porcentaje_avance_fisico_mes: null,
      observacion: null,
      fotografia_1: null,
      fotografia_2: null,
      fotografia_3: null,
      fotografia_4: null,
      documento_respaldo_avance: null,
      estado_proyecto: 2,
      file: null,
    });

    const resetForm = () => {
      Seguimiento.value = {
        proyecto_id: props.proyecto.id,
        realizacion: realizacion_id.value,
        mes: null,
        anio: null,
        avance_financiero_mes: null,
        porcentaje_avance_fisico_mes: null,
        observacion: null,
        fotografia_1: null,
        fotografia_2: null,
        fotografia_3: null,
        fotografia_4: null,
        documento_respaldo_avance: null,
        estado_proyecto: 2,
        file: null,
      };
    };

    const openModal = async (open, id) => {
      // resetForm();
      if (id) {
        //al abrir EDITAR
        Seguimiento.value = await _http.get(`${url_realizacion.value}${id}/`);
        Seguimiento.value.avance_financiero_mes = parseInt(
          Seguimiento.value.avance_financiero_mes
        );

        console.log("Al abrir EDITAR***", Seguimiento.value);

        open();
      } else {
        //NUEVO
        resetForm();
        Seguimiento.value.realizacion = realizacion_id.value;
        console.log("Al abrir NUEVO***", Seguimiento.value);
        open();
      }
    };

    const confirmClose = (close) => {
      showConfirmation.value = true;
    };

    const closeModal = (close) => {
      console.log();
      resetForm();
      close();
    };

    const cerrarModal = (close) => {
      showConfirmation.value = true;
      confirmClose(close);
    };

    const guardar = async (update, close) => {
      try {
        console.log("alskjdfñljasdñlf");
        // console.log('guardar seguimiento:',Seguimiento.value);
        const mensaje = !Seguimiento.value.id
          ? "Creado de manera exitosa."
          : "Actualizado de manera exitosa.";

        if (Seguimiento.value.avance_financiero_mes != null) {
          if (Seguimiento.value.avance_financiero_mes.length >= 5) {
            Seguimiento.value.avance_financiero_mes = parseInt(
              Seguimiento.value.avance_financiero_mes.replace(/,/g, ""),
              10
            );
          } else {
            Seguimiento.value.avance_financiero_mes = parseInt(
              Seguimiento.value.avance_financiero_mes
            );
          }
        }

        console.log("guardar seguimiento:", Seguimiento.value);

        // Seguimiento.value.anio = Seguimiento.value.anio.label;
        // Seguimiento.value.mes = Seguimiento.value.mes.label;
        // Seguimiento.value.anio = Seguimiento.value.anio.toString();
        // Seguimiento.value.mes = Seguimiento.value.mes.toString();

        const campos = [
          "fotografia_1",
          "fotografia_2",
          "fotografia_3",
          "fotografia_4",
          "documento_respaldo_avance",
        ];
        campos.forEach((campo) => {
          if (
            Seguimiento.value[campo] == null ||
            typeof Seguimiento.value[campo] == "string"
          ) {
            delete Seguimiento.value[campo];
          }
        });

        if (
          typeof Seguimiento.value.porcentaje_avance_financiero_mes === "string"
        ) {
          Seguimiento.value.porcentaje_avance_financiero_mes = parseInt(
            Seguimiento.value.porcentaje_avance_financiero_mes.replace(
              /,/g,
              ""
            ),
            10
          ); //convierte a entero
        }

        Seguimiento.value.created_by_id = 1; //BACKEND
        Seguimiento.value.update_by_id = 1; //BACKEND
        //Agregamos nuevo campo al objeto Seguimiento
        Object.assign(Seguimiento.value, {
          realizacion: realizacion_id.value,
        }); //BACKEND

        if (Seguimiento.value.id) {
          console.log(`${url.value}${Seguimiento.value.id}/`);
          // await _http.put(
          //   `${url.value}${Seguimiento.value.id}/`,
          //   Seguimiento.value
          // );

          Object.assign(Seguimiento.value, {
            realizacion: Seguimiento.value.realizacion_id,
          }); //BACKEND
          // Seguimiento.value;

          const config = { headers: { "Content-Type": "multipart/form-data" } };
          const formData = new FormData();
          for (const [key, value] of Object.entries(Seguimiento.value)) {
            formData.append(key, value);
          }

          console.log("formdata*** PUT", formData);
          await _http.put(
            "/seguimientos/" + Seguimiento.value.id + "/",
            formData,
            config
          );
        } else {
          const config = { headers: { "Content-Type": "multipart/form-data" } };
          const formData = new FormData();
          for (const [key, value] of Object.entries(Seguimiento.value)) {
            formData.append(key, value);
          }

          console.log("formdata*** POST", formData);
          await _http.post("/seguimientos/", formData, config);

        }

        _message.success(mensaje);
        await update();
        closeModal(close);
      } catch (error) {
        console.error(error);
        _message.error(error.response.data.message);
        _message.error(error.response.data.porcentaje_avance_fisico_mes);

        for (const clave in error) {
          if (miObjeto.hasOwnProperty(clave)) {
            console.log(`${clave}: ${miObjeto[clave]}`);
            _message.error(`${clave}: ${miObjeto[clave]}`);
          }
        }
      }
    };

    const descargar_pdf_general = async () => {
      try {
        const params = { realizacion_id: realizacion_id.value };
        const respuesta = await _http.get(
          _http.convertQuery("/reporte_avance_proyecto_pdf/", params),
          false,
          "blob"
        );
        descargarArchivo(new Blob([respuesta]), `Reporte General.pdf`);
        _message.success("ARCHIVO DESCARGADO");
      } catch (error) {
        _message.error("Error al descargar el archivo", error);
      }
    };

    const descargar_pdf_especifico = async (id, mes, anio) => {
      try {
        const params = { seguimiento_id: id };
        const respuesta = await _http.get(
          _http.convertQuery("/reporte-seguimiento-mensual-pdf/", params),
          false,
          "blob"
        );
        descargarArchivo(
          new Blob([respuesta]),
          `Reporte de ${mes} ${anio}.pdf`
        );
        _message.success("ARCHIVO DESCARGADO");
      } catch (error) {
        _message.error("Error al descargar el archivo", error);
      }
    };

    const descargarArchivo = (blob, nombreArchivo) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", nombreArchivo);
      document.body.appendChild(link);
      link.click();
      link.remove();
    };

    const eliminar_pendiente = async (id) => {
      console.log("iddddddd***", id);
      _http.put("/baja-ultimo-seguimiento/?seguimiento_id=" + id);

      _message.success("SE BORRO EL REGISTRO , ACTUALIZE LA PAGINA");
    };

    const cambiar_estado = (id) => {
      _http.put("/aprobacion-seguimiento/?seguimiento_id=" + id);
      _message.success("SE CAMBIO EL ESTADO DEL REGISTRO , ACTUALIZE LA TABLA");
    };

    const permisos_asignados = () => {
      // PERMISOS MODIFICAR POR PANTALLA
      const usuario = _storage.get("permisos");
      // console.log("usuario***", usuario);
      const array = usuario.map((val) => val.codename);
      // console.log("permisos***", array); //obtenemos todos los permisos
      const searchItems = [
        "crear_seguimiento",
        "editar_seguimiento",
        "eliminar_seguimiento",
        "mostrar_seguimiento",
        "descargar_seguimiento",
        "acciones_seguimiento",
      ];
      searchItems.forEach((item) => {
        if (array.includes(item)) {
          // Extraer la clave base del campo (por ejemplo, 'crear_seguimiento' -> 'crear')
          const key = item.split("_")[0];
          // Verificar si la clave base existe en el objeto permisos
          if (permisos.value.hasOwnProperty(key)) {
            permisos.value[key] = true;
          }
        }
      });
      console.log("permisos actualizados**", permisos.value);
      //END PERMISOS
    };

    onMounted(async () => {
      const usuario = _storage.get("usuario");
      rol.value = usuario.rol;
      permisos_asignados();

      const response = await _http.get(
        "/realizaciones/?proyecto_id=" + props.proyecto.id
      );
      console.log("realizaciones segun un proyectos", response);
      if (response.results[0] != undefined) {
        console.log("existe registro");
        isButtonDisabled.value = false;
        realizacion_id.value = response.results[0].id;

        Seguimiento.value.realizacion = realizacion_id.value;
        console.log("realizacion_id***", realizacion_id.value);
        url.value = "/seguimientos/?realizacion_id=" + realizacion_id.value;
      } else {
        console.log("no existe registro");
        isButtonDisabled.value = true;
      }
    });
    const formatNumber = (value) => {
      if (value || value === 0) {
        // Convertir a cadena para asegurar que todos los números sean tratados correctamente
        let [integerPart, decimalPart] = value.toString().split(".");

        // Formatear la parte entera con puntos como separadores de miles
        integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        // Si existe una parte decimal, agregarla con una coma
        if (decimalPart) {
          return `${integerPart},${decimalPart}`;
        }

        return integerPart;
      } else {
        return value;
      }
    };
    return {
      cambiar_estado,
      eliminar_pendiente,
      Seguimiento,
      filters,
      columns,
      url,
      closeModal,
      openModal,
      guardar,
      realizacionId,
      descargar_pdf_general,
      descargar_pdf_especifico,
      goBack,
      cerrarModal,
      confirmClose,
      isButtonDisabled,
      realizacion_id,
      permisos,
      permisos_asignados,
      formatNumber,
      rol,
      descargarArchivo,
    };
  },

  props: {
    proyecto: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style scoped>
.custom-width {
  width: 200px;
}

.highlight-row {
  background-color: rgba(255, 0, 0, 0.048);
}

.highlight-pendiente {
  color: rgb(247, 138, 49);
  font-weight: bold;
}
.highlight-rechazado {
  color: red;
  font-weight: bold;
}
.highlight-subsanado {
  color: rgb(247, 138, 49);
  font-weight: bold;
}

.highlight-aprobado {
  color: rgb(8, 167, 8);
  font-weight: bold;
}

.red-title {
  color: rgb(8, 167, 8);
}

.elegant-button {
  width: 60px;
  height: 60px;

  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  /* Sombra sutil */
  transition: all 0.3s ease;
  /* Transición suave */
}

.elegant-button:hover {
  background-color: #0056b3;
  /* Color de fondo en hover */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  /* Sombra más pronunciada en hover */
  transform: scale(1.05);
  /* Efecto de aumento al pasar el ratón */
}
.btn-group {
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start; /* O 'center' o 'space-between', dependiendo de cómo quieras distribuir los botones */
  align-items: center;
}
.wide-column {
  width: 300px;
  text-align: center;
  white-space: normal;
  word-break: break-word;
  overflow-wrap: break-word;
  vertical-align: middle;
}
</style>
