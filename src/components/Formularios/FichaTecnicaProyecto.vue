<template>
  <q-page>
    <Titulo titulo="Ficha - Técnica" icono="article"></Titulo>
    <!-- {{ $route.params.realizacion_id }} -->
    <q-card>
      <!-- Encabezado de la ficha técnica -->
      <q-card-section>

      </q-card-section>

      <!-- Sección de información general -->
      <q-card-section>
        <div
          class="text-subtitle1 bg-primary text-weight-bold text-center text-light-blue-1"
        >
          NOMBRE DEL PROYECTO
        </div>
        <div style="text-align: center; border-style: groove; font-size: 18px">
          <p>{{ ejecucion?.proyecto_general.nombre }}</p>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <div
          class="text-subtitle1 bg-primary text-weight-bold text-center text-light-blue-1"
        >
          CARACTERÍSTICAS
        </div>

        <q-form class="q-gutter-md row">
          <q-item class="col-3 q-mb-3">
            <q-item-section>
              <q-input label="Código SISIN" readonly dense />
              {{ ejecucion?.proyecto_general.codigo_sisin }}
            </q-item-section>
          </q-item>
          <q-item class="col-3 q-mb-3">
            <q-item-section>
              <q-input label="Tipo de Proyecto" readonly dense />
              {{ ejecucion?.proyecto_general.tipo_name }}
            </q-item-section>
          </q-item>
          <q-item class="col-3 q-mb-3">
            <q-item-section>
              <q-input label="Viceministerio Ejecutor" readonly dense />
              {{ ejecucion?.proyecto_general.viceministerio_name }}
            </q-item-section>
          </q-item>
          <q-item class="col-3 q-mb-none">
            <q-item-section>
              <q-input label="Sector" readonly dense />
              {{ ejecucion?.proyecto_general.sector_clasificador_name }}
            </q-item-section>
          </q-item>
          <q-item class="col-3 q-mb-none">
            <q-item-section>
              <q-input label="Sigla Entidad Ejecutora" readonly dense />
              {{ ejecucion?.proyecto_general.ejecutor_name }}
            </q-item-section>
          </q-item>
          <q-item class="col-3 q-mb-none">
            <q-item-section>
              <q-input label="Entidad Ejecutora" readonly dense />
              {{ ejecucion?.proyecto_general.ejecutor_name }}
            </q-item-section>
          </q-item>
          <q-item class="col-3 q-mb-none">
            <q-item-section>
              <q-input label="Estado" readonly dense />
              {{ ejecucion?.proyecto_general.estado_name }}
            </q-item-section>
          </q-item>
          <q-item class="col-3 q-mb-none">
            <q-item-section>
              <q-input label="Fecha de Inicio Convenio" readonly dense />
              {{ ejecucion?.proyecto_general.fecha_inicio }}
            </q-item-section>
          </q-item>
          <q-item class="col-3 q-mb-none">
            <q-item-section>
              <q-input label="Fecha de Conclusión Convenio" readonly dense />
              {{ ejecucion?.proyecto_general.fecha_conclusion }}
            </q-item-section>
          </q-item>
          <q-item class="col-3 q-mb-none">
            <q-item-section>
              <q-input label="Gobierno" readonly dense />
              {{ ejecucion?.proyecto_general.gobierno }}
            </q-item-section>
          </q-item>
        </q-form>
      </q-card-section>

      <q-separator />

      <q-separator />
      <!-- Sección de especificaciones técnicas -->
      <q-card-section>
        <div
          class="text-subtitle1 bg-primary text-weight-bold text-center text-light-blue-1"
        >
          OBJETIVO DE SUSCRIPCIÓN DEL PROYECTO
        </div>
        <div class="q-pa-md example-column-row-wrapping">
          <div class="column" style="height: 300px; max-height: 100%">
            <div class="col-5">
              <q-item-section>
                <q-input label="Objetivo" readonly dense />
                {{ ejecucion?.proyecto_general.objetivo }}
              </q-item-section>
            </div>
            <div class="col-6">
              <q-item-section>
                <q-input label="Detalle" readonly dense />
                {{ ejecucion?.proyecto_general.detalle }}
              </q-item-section>
            </div>
            <div class="col-9">
              <center>
                <img
                  v-if="ejecucion?.proyecto_general.imagen_proyecto != null"
                  style="width: 450px"
                  :src="ejecucion?.proyecto_general.imagen_proyecto"
                  alt="Mi Imagen"
                  class="table-image"
                />
              </center>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <!-- Sección de datos adicionales -->
      <q-card-section>
        <div
          class="text-subtitle1 bg-primary text-weight-bold text-center text-light-blue-1"
        >
          BENEFICIOS DEL PROYECTO
        </div>
        <q-form class="q-gutter-md row">
          <q-item class="col-4 q-mb-none">
            <q-item-section>
              <q-input
                label="Directos / Familias Beneficiarias"
                readonly
                dense
              /><span>{{
                ejecucion?.proyecto_general.numero_familias_beneficiadas?.toLocaleString(
                  "en-US"
                )
              }}</span>
            </q-item-section>
          </q-item>
          <q-item class="col-4 q-mb-none">
            <q-item-section>
              <q-input
                label="Indirectos / Faminilias Beneficiarias"
                readonly
                dense
              /><span>{{
                ejecucion?.proyecto_general.numero_familias_indirectas?.toLocaleString(
                  "en-US"
                )
              }}</span>
            </q-item-section>
          </q-item>
          <!--          <q-item class="col-4 q-mb-none">
            <q-item-section>
          <q-item class="col-4 q-mb-none">
            <q-item-section>
              <q-input label="Variable de impacto / ha otro" readonly dense />
            </q-item-section>
          </q-item>
          <q-item class="col-4 q-mb-none">
            <q-item-section>
              <q-input label="Area de intervención / Km2 ha" readonly dense />
            </q-item-section>
          </q-item>-->
        </q-form>
      </q-card-section>
    </q-card>

    <q-separator />
    <!-- Sección de especificaciones técnicas -->
    <q-card-section>
      <div
        class="text-subtitle1 bg-primary text-weight-bold text-center text-light-blue-1"
      >
        LOCALIZACIÓN DEL PROYECTO
      </div>
      <q-form class="q-gutter-md row">
        <q-item class="col-4 q-mb-none">
          <q-item-section>
            <q-input label="Departamento" readonly dense />
            {{
              ejecucion?.proyecto_especifico.departamentos
                .map((d) => d.nombre)
                .join(" , ")
            }}
          </q-item-section>
        </q-item>
        <q-item class="col-4 q-mb-none">
          <q-item-section>
            <q-input label="Provincia" readonly dense />{{
              ejecucion?.proyecto_especifico.provincias
                .map((d) => d.nombre)
                .join(" , ")
            }}
          </q-item-section>
        </q-item>
        <q-item class="col-4 q-mb-none">
          <q-item-section>
            <q-input label="Municipio" readonly dense />{{
              ejecucion?.proyecto_especifico.municipios
                .map((d) => d.nombre)
                .join(" , ")
            }}
          </q-item-section>
        </q-item>
      </q-form>
    </q-card-section>

    <q-separator />
    <!-- Sección de especificaciones técnicas -->
    <q-card-section>
      <div
        class="text-subtitle1 bg-primary text-weight-bold text-center text-light-blue-1"
      >
        ESTADO DE SITUACIÓN
      </div>
      <q-input label="Observaciones" readonly dense />{{
        ejecucion?.proyecto_general.observaciones
      }}
      <q-form class="q-gutter-md row">
        <q-item class="col-4 q-mb-none">
          <q-item-section>
            <q-input label="Avance Finaciero %" readonly dense />{{
              ejecucion?.proyecto_especifico.avance_fisico
            }}
          </q-item-section>
        </q-item>
        <q-item class="col-4 q-mb-none">
          <q-item-section>
            <q-input label="Avance Fisico %" readonly dense />{{
              ejecucion?.proyecto_especifico.avance_financiamiento
            }}
          </q-item-section>
        </q-item>
        <q-item class="col-4 q-mb-none">
          <q-item-section>
            <q-input label="Cancelado Financiero" readonly dense />
            <span>{{
              formatNumber(ejecucion?.proyecto_especifico?.eje_acum)
            }}</span>
          </q-item-section>
        </q-item>
        <q-item class="col-4 q-mb-none">
          <q-item-section>
            <q-input label="Saldo por cancelar" readonly dense />
            <span>{{
              formatNumber(ejecucion?.proyecto_especifico?.saldo_presupuesto)
            }}</span>
          </q-item-section>
        </q-item>
      </q-form>
    </q-card-section>

    <q-separator />
    <!-- Sección de especificaciones técnicas -->
    <q-card-section>
      <div
        class="text-subtitle1 bg-primary text-weight-bold text-center text-light-blue-1"
      >
        FUENTE DE FINANCIAMIENTO
      </div>
      <q-form class="q-gutter-md row">
        <q-item class="col-4 q-mb-none">
          <q-item-section>
            <q-input
              label="Recurso Interno/ En bolivianos | En millones"
              readonly
              dense
            />{{
              formatNumber(ejecucion?.proyecto_especifico?.contraparte_local)
            }}
          </q-item-section>
        </q-item>
        <q-item class="col-4 q-mb-none">
          <q-item-section>
            <q-input
              label="Recursos Externos / En bolivianos | En millones"
              readonly
              dense
            />

            {{
              formatNumber(
                ejecucion?.proyecto_especifico?.financiamiento_externo
              )
            }}
          </q-item-section>
        </q-item>
        <q-item class="col-4 q-mb-none">
          <q-item-section>
            <q-input label="Total inversión" readonly dense />
            {{ formatNumber(ejecucion?.proyecto_especifico?.total_inversion) }}
          </q-item-section>
        </q-item>
        <q-item class="col-4 q-mb-none">
          <q-item-section>
            <q-input label="Organismo(s)" readonly dense />{{
              ejecucion?.proyecto_general.organizacion_name
            }}
          </q-item-section>
        </q-item>
      </q-form>
    </q-card-section>
    <q-card-section>
      <div
        class="text-subtitle1 bg-primary text-weight-bold text-center text-light-blue-1"
      >
        EMPRESA CONSTRUCTORA / SUPERVISIÓN / ACOMPAÑAMIENTO
      </div>
      <q-form class="q-gutter-md row">
        <q-item class="col-4 q-mb-none">
          <q-item-section>
            <q-input label="Empresa Constructora: " readonly dense />{{
              ejecucion?.proyecto_general.empresa_constructora_name
            }}
          </q-item-section>
        </q-item>
        <q-item class="col-4 q-mb-none">
          <q-item-section>
            <q-input label="Supervisión" readonly dense />{{
              ejecucion?.proyecto_general.ucep_responsable_name
            }}
          </q-item-section>
        </q-item>
      </q-form>
    </q-card-section>

    <br />
    <center>
      <q-btn
        color="primary"
        icon="print"
        label="Descargar Archivo"
        @click="downloadFicha(ejecucion.proyecto_especifico.id)"
        download
      />
    </center>
  </q-page>
</template>

<script>
import { ref, inject, onMounted } from "vue";
import CrudTable from "@components/common/CrudTable";
import Seguimiento from "components/Formularios/Seguimiento.vue";
import { useQuasar } from "quasar";
import { useRoute } from "vue-router";
import MapView2 from "@components/common/MapView2.vue";

const filters = [
  {
    label: "Nombre",
    field: "nombre",
    type: "input",
  },
];

const columns = [];

export default {
  components: { CrudTable, Seguimiento, MapView2 },
  name: "Seguimientos",
   props: {
     ejecucionId: {
       type: Number,
       required: true,
     },
   },
  setup(props) {
    const $q = useQuasar();
    const _http = inject("http");
    const _message = inject("message");
    const route = useRoute();
    const realizacionId = ref(props.ejecucionId);
    console.log("realizacionId", realizacionId);

    const url = ref(
      "/obtener-ficha-tecnica/?realizacion_id=" + realizacionId.value
    );
    const url_realizacion = ref("/seguimientos/");
    const ejecucion = ref(null);
    const goBack = () => {
      // route.value.back();
      window.history.back();
    };

    // const url = ref("/seguimientos/");

    // const url = ref('/seguimientos/' + route.params.realizacion_id)
    console.log(realizacionId.value);
    const myLink = ref(
      "/api/reporte-seguimiento-pdf/?realizacion_id=/" + realizacionId.value
    );

    // const url_seguimientos = ref("/seguimientos/");

    const foto = window.location.href;
    console.log("fotos: ", foto);

    const Seguimiento = ref({
      mes: null,
      anio: null,
      avance_financiero_mes: null,
      porcentaje_avance_fisico_mes: null,
      realizacion: realizacionId.value,
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
        mes: null,
        anio: null,
        avance_financiero_mes: null,
        porcentaje_avance_fisico_mes: null,
        realizacion: realizacionId.value,
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
      // console.log(id);
      resetForm();
      if (id) {
        // console.log(`${url.value}`);
        // Seguimiento.value = await _http.get(`${url.value}${id}/`);
        Seguimiento.value = await _http.get(`${url_realizacion.value}${id}/`);
        console.log(Seguimiento.value);
        console.log(Seguimiento.value.fotografia_1);
      }

      open();
    };

    const closeModal = (close) => {
      resetForm();
      close();
    };

    const guardar = async (update, close) => {
      const mensaje = !Seguimiento.value.id
        ? "Menu creado de manera exitosa."
        : "Menu actualizado de manera exitosa.";
      if (Seguimiento.value.id) {
        await _http.put(
          `${url.value}${Seguimiento.value.id}/`,
          Seguimiento.value
        );
      } else {
        // Seguimiento.value.fotografia_1 = Seguimiento.value.fotografia_1[0].name;
        console.log(Seguimiento.value);
        const formData = new FormData();
        // formData.append("fotografia_1", Seguimiento.value.fotografia_1);

        // console.log();
        for (const [key, value] of Object.entries(Seguimiento.value)) {
          console.log(`${key}: ${value}`);
          formData.append(key, value);
        }

        // formData.append("realizacion", 6192);

        console.log("****************");
        console.log(formData);
        const config = { headers: { "Content-Type": "multipart/form-data" } };

        await _http.post(`${url.value}`, formData, config);
        // console.log(Seguimiento.value.fotografia_1[0].name);
        // await _http.post(`${url.value}`, Seguimiento.value);
      }
      _message.success(mensaje);
      await update();
      closeModal(close);
    };

    const downloadFicha = async (realizacionId) => {
      $q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        message: "Ficha Descargado exitosamente.",
      });

      const params = { realizacion_id: realizacionId };

      try {
        const respuesta = await _http.get(
          _http.convertQuery("/reporte-ficha-tecnica-pdf/", params),
          true,
          {},
          "blob"
        );
        descargarArchivo(new Blob([respuesta]), "reporte_ficha.pdf");
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

    const downloadFile = () => {
      // URL del archivo que deseas descargar
      const fileUrl =
        window.location.protocol +
        "//" +
        window.location.hostname +
        ":" +
        "8000" +
        "/api/reporte_avance_proyecto_pdf/?realizacion_id=" +
        realizacionId.value;
      console.log(fileUrl);
      // Nombre con el que se descargará el archivo
      const fileName = "archivo.pdf";
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = fileName;
      link.click();
    };

    const descargar_pdf = (id) => {
      const fileUrl =
        window.location.protocol +
        "//" +
        window.location.hostname +
        ":" +
        "8000" +
        "/api/reporte-seguimiento-mensual-pdf/?seguimiento_id=" +
        id;
      console.log(fileUrl);
      // Nombre con el que se descargará el archivo
      const fileName = "archivoss.pdf";
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = fileName;
      link.click();
    };
    onMounted(async () => {
      // console.log('antes de cargar el dom');
      // console.log(url.value);
      const response = await _http.get(
        "/realizaciones/?proyecto_id=" + realizacionId.value
      );
      const rrr = response.results[0].id;
      console.log("realizacion****", response.results[0].id);

      ejecucion.value = await _http.get(
        "/obtener-ficha-tecnica/?realizacion_id=" + rrr
      );
      console.log(ejecucion.value);
      // loading.value=false;
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
      formatNumber,
      foto,
      Seguimiento,
      filters,
      columns,
      url,
      closeModal,
      openModal,
      guardar,
      realizacionId,
      myLink,
      downloadFile,
      descargar_pdf,
      ejecucion,
      downloadFicha,
      goBack,
      // url_seguimientos
      // realizacion_id,
    };
  },
  methods: {
    formatNumberWithCommas(number, locale = "en-US", options = {}) {
      return number.toLocaleString(locale, options);
    },
  },
};
</script>

<style scoped>
.table-image {
  width: 50%;
  /* Ajusta el ancho de la imagen al 100% del contenedor */
  max-width: 150px;
  /* Máximo ancho de 500px */
  height: 50%;
  /* height: 50%; */

  /* Mantiene la relación de aspecto original */
}
</style>
