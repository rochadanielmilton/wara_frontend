/*
<template>
  <q-page padding>
    <div class="text-center">
      <h5 style="margin: 10px">
        <b>{{ titulo }}</b>
      </h5>
    </div>
    <div class="q-pa-md q-gutter-md q-my-md" style="
        background-color: rgb(233, 233, 233);
        display: flex;
        justify-content: center;
        align-items: center;
      " v-if="searchIsLocation">
      <CabezeraPrincipal :datos="cabezera" />
    </div>
    <hr />
    <div class="row q-col-gutter-md q-pa-md bg-grey-1"
      style="display: flex; justify-content: center; align-items: center">
      <div class="col-12 col-sm-6 col-md-2">
        <q-select v-model="selectedSearch" :options="['POR LOCALIZACIÓN', 'POR PROGRAMA/PROYECTO']" label="Buscar" />
      </div>

      <div class="col-12 col-sm-6 col-md-2" v-if="!searchIsLocation">
        <q-input v-model="search" label="Nombre proyecto, programa o sigla" outlined @keyup="obtenerListaProyectos" />
      </div>

      <div class="col-12 col-sm-6 col-md-2" v-if="searchIsLocation">
        <q-select v-model="selectedDepartment" :options="departamentos" option-label="nombre" option-value="id"
          label="Departamento" @update:model-value="DepartamentoSelect" />
      </div>

      <div class="col-12 col-sm-6 col-md-2" v-if="searchIsLocation">
        <q-select id="Select" v-model="selectedProvince" :options="provincias" option-label="nombre" option-value="id"
          label="Provincia" class="q-ma-xs bold-label" @update:model-value="ProvinciaSelect" />
      </div>

      <div class="col-12 col-sm-6 col-md-2" v-if="searchIsLocation">
        <q-select id="Select" v-model="selectedMunicipality" :options="municipios" option-label="nombre"
          option-value="id" label="Municipio" class="q-ma-xs bold-label bg-grey-1 select"
          @update:model-value="MunicipioSelect" />
      </div>

      <div class="col-12 col-sm-6 col-md-2">
        <q-select id="Select" v-model="selectedEstado" :options="estados" option-label="nombre" option-value="id"
          label="Estado Proyecto" class="q-ma-xs bold-label bg-grey-1 select" @update:model-value="EstadoSelect"
          :disable="isDisabled" />
      </div>

      <div class="col-12 col-md-2 q-mt-md-md">
        <div class="button-container1" style="
            display: flex;
            flex-wrap: nowrap;
            justify-content: space-between;
          ">
          <q-btn @click="DescargarPDF" v-show="pdf_gral" color="teal-6" class="q-mb-sm" icon="download"
            style="width: 90px; padding: 5px 10px">
            PDF
          </q-btn>
          <q-btn @click="DescargarPDF_lista_proyectos" v-show="pdf_descarga" color="teal-6" class="q-mb-sm"
            icon="download" style="width: 90px; padding: 5px 10px">
            PDF
          </q-btn>
          <q-btn v-if="searchIsLocation" @click="DescargarExcel_lista_proyectos" v-show="pdf_descarga" color="teal-6" class="q-mb-sm"
            icon="download" style="width: 110px; padding: 5px 10px">
            EXCEL
          </q-btn>
          <q-btn @click="Descargar_reporte_sector(cabezera.consulta)" v-show="pdf_gral" color="teal-6" class="q-mb-sm" icon="download"
            style="width: 140px; padding: 5px 15px">
            SECTORES
          </q-btn>
        </div>
      </div>
    </div>
    <hr />

    <div class="q-gutter-md" id="grafico_principal" v-show="grafico_tabla">
      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-7 q-pa-md">
          <HighchartsChart :computerdata="tabla_data" style="height: 600px"/>
          <hr />
          <InversionesGrafico :computerdata="tabla_data" style="height: 600px" />
        </div>
        <div class="col-12 col-md-5 q-pa-md">
          <TablasDinamicas :computerdata="tabla_data" />
        </div>
      </div>
    </div>
    <div v-if="solo_tabla">
      <TablaProyectos :datos_proyectos="datos_proyectos" />
      <div class="col-6 col-md-5 q-pa-md">
        <AvancesFisicoFinanciero :datos-proyectos="datos_proyectos" v-if="datos_proyectos.length > 0">
        </AvancesFisicoFinanciero>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, onMounted, inject, computed, watch } from "vue";
import CabezeraPrincipal from "@components/reportes/CabezeraPrincipal.vue";
import HighchartsChart from "@components/reportes/HighchartsChart222.vue";
import TablasDinamicas from "@components/reportes/TablasDinamicas.vue";
import InversionesGrafico from "@components/reportes/InversionesGrafico.vue";
import TablaProyectos from "@components/reportes/TablaProyectos.vue";
import AvancesFisicoFinanciero from "@components/reportes/AvancesFisicoFinanciero.vue";
import { useQuasar } from "quasar";

export default {
  components: {
    AvancesFisicoFinanciero,
    CabezeraPrincipal,
    HighchartsChart,
    TablasDinamicas,
    InversionesGrafico,
    TablaProyectos,
  },
  setup() {
    function debounce_leading(func, timeout = 300) {
      let timer;
      return (...args) => {
        if (!timer) {
          func.apply(this, args);
        }
        clearTimeout(timer);
        timer = setTimeout(() => {
          timer = undefined;
        }, timeout);
      };
    }

    const $q = useQuasar();
    const cabezera = ref({});
    const tabla_data = ref({});
    const departamentos = ref([{ id: 0, nombre: "TODOS" }]);
    const provincias = ref([{ id: 0, nombre: "TODOS" }]);
    const municipios = ref([{ id: 0, nombre: "TODOS" }]);
    const estados = ref([{ id: 0, nombre: "TODOS" }]);
    const selectedDepartment = ref("TODOS");
    const selectedProvince = ref("TODOS");
    const selectedMunicipality = ref("TODOS");
    const selectedEstado = ref("TODOS");
    const isReadOnly = ref(false);
    const selectedSearch = ref("POR LOCALIZACIÓN");
    const isDisabled = ref(false);

    // Ejemplo de propiedad observada
    const anotherValue = ref("initial");

    watch(selectedSearch, () => {
      selectedDepartment.value = "TODOS";
      selectedProvince.value = "TODOS";
      selectedMunicipality.value = "TODOS";
      search.value = "";
      if (selectedSearch.value == "POR PROGRAMA/PROYECTO") {
        resetSelectedSearchProgramas();
        estados2();
        isDisabled.value = true;
      } else {
        isDisabled.value = false;
        resetSelectedSearchLocation();
      }
    });
    const search = ref("");
    const estados2 = async () => {
      try {
        estados.value = (await _http.get("/estados/?ordering=nombre")).results;
      } catch (error) {
        console.error("Error al obtener Estados.", error);
      }
    };

    const resetSelectedSearchProgramas = () => {
      datos_proyectos.value = [];
      pdf_descarga.value = true;
      pdf_gral.value = false;
      grafico_tabla.value = false;
      solo_tabla.value = true;
    };

    const resetSelectedSearchLocation = () => {
      grafico_tabla.value = true;
      solo_tabla.value = false;
      pdf_gral.value = true;
      pdf_descarga.value = false;
    };

    // watch(search, () => {
    //   debouncedSearch();
    // })

    const titulo = ref("REPORTE EJECUTIVO GENERAL INVERSIÓN EN PROYECTOS");
    const grafico_tabla = ref(true);
    const solo_tabla = ref(false);
    const pdf_descarga = ref(true);
    const pdf_gral = ref(true);
    const datos_proyectos = ref({});
    const dialog = ref(false);
    const position = ref("top");
    const parentMessage = ref("");
    const _http = inject("http");

    const searchIsLocation = computed(() => {
      return selectedSearch.value == "POR LOCALIZACIÓN";
    });

    const fetchData = async () => {
      try {
        cabezera.value = _http.get("/reportes/data-por-sectores/");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      buscarDatos();
      pdf_descarga.value = false;
    };

    const buscarDatos = async () => {
      const params = {};
      if (
        selectedDepartment.value !== "TODOS" &&
        selectedDepartment.value.id !== 0
      )
        params["departamento_id"] = selectedDepartment.value.id;
      if (selectedProvince.value !== "TODOS" && selectedProvince.value.id !== 0)
        params["provincia_id"] = selectedProvince.value.id;
      if (
        selectedMunicipality.value !== "TODOS" &&
        selectedMunicipality.value.id !== 0
      )
        params["municipio_id"] = selectedMunicipality.value.id;
      if (selectedEstado.value !== "TODOS" && selectedEstado.value.id !== 0)
        params["estado_id"] = selectedEstado.value.id;
      try {
        cabezera.value = await _http.get(
          _http.convertQuery("/reportes/data-por-sectores/", params)
        );
      } catch (error) {
        console.log("no hay datos para mostrar");
      }

      try {
        tabla_data.value = await _http.get(
          _http.convertQuery(
            "/reportes/programas-proyectos-inversion-por-depto-prov-mun/",
            params
          )
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const obtenerListaProyectos = async () => {
      const params = {};
      if (
        selectedDepartment.value !== "TODOS" &&
        selectedDepartment.value.id !== 0
      )
        params["departamento_id"] = selectedDepartment.value.id;
      if (selectedProvince.value !== "TODOS" && selectedProvince.value.id !== 0)
        params["provincia_id"] = selectedProvince.value.id;
      if (
        selectedMunicipality.value !== "TODOS" &&
        selectedMunicipality.value.id !== 0
      )
        params["municipio_id"] = selectedMunicipality.value.id;
      if (selectedEstado.value !== "TODOS" && selectedEstado.value.id !== 0)
        params["estado_id"] = selectedEstado.value.id;
      if (search.value != null && search.value != "") {
        params["search"] = search.value;
      }
      if (
        selectedSearch.value == "POR PROGRAMA/PROYECTO" &&
        search.value &&
        search.value.length <= 2
      )
        return;
      try {
        datos_proyectos.value = await _http.get(
          _http.convertQuery("/reportes/list-proyectos-por-municipio/", params),
          false
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const debouncedSearch = debounce_leading(obtenerListaProyectos, 150);

    const DepartamentoSelect = async () => {
      console.log(selectedDepartment.value.id);
      if (selectedDepartment.value.id === 0) {
        pdf_gral.value = true;
        pdf_descarga.value = false;
        selectedDepartment.value = "TODOS";
        selectedMunicipality.value = "TODOS";
        selectedProvince.value = "TODOS";
        provincias.value = [{ id: 0, nombre: "TODOS" }];
        municipios.value = [{ id: 0, nombre: "TODOS" }];
        buscarDatos();
        pdf_gral.value = true;
        pdf_descarga.value = false;
      } else {
        pdf_descarga.value = false;

        provincias.value = [
          { id: 0, nombre: "TODOS" },
          ...(
            await _http.get(
              `/provincias/?departamento_id=${selectedDepartment.value.id}&ordering=nombre`
            )
          ).results,
        ];
        selectedProvince.value = "TODOS"; // Reinicia el selector de provincias
        selectedMunicipality.value = "TODOS"; //Reinicia el selector municipio
        parentMessage.value = selectedDepartment.value.id.toString();
        buscarDatos();
        pdf_gral.value = true;
        pdf_descarga.value = false;
      }

      grafico_tabla.value = true;
      solo_tabla.value = false;
    };

    const ProvinciaSelect = async () => {
      pdf_descarga.value = false;
      if (selectedProvince.value.id === 0) {
        pdf_descarga.value = false;
        selectedMunicipality.value = "TODOS";
        municipios.value = [{ id: 0, nombre: "TODOS" }];
        await buscarDatos();
        grafico_tabla.value = true;
        solo_tabla.value = false;
        pdf_gral.value = true;
        pdf_descarga.value = false;
      } else {
        pdf_descarga.value = false;
        selectedMunicipality.value = "TODOS";
        municipios.value = [
          { id: 0, nombre: "TODOS" },
          ...(
            await _http.get(
              `/municipios/?provincia_id=${selectedProvince.value.id}&ordering=nombre`
            )
          ).results,
        ];

        await buscarDatos();
        grafico_tabla.value = true;
        solo_tabla.value = false;
        pdf_gral.value = true;
        pdf_descarga.value = false;
      }
    };

    const MunicipioSelect = () => {
      if (selectedMunicipality.value.id === 0) {
        pdf_descarga.value = false;
        pdf_gral.value = true;
        buscarDatos();
        grafico_tabla.value = true;
        solo_tabla.value = false;
      } else {
        obtenerListaProyectos();
        buscarDatos();
        grafico_tabla.value = false;
        solo_tabla.value = true;
        pdf_descarga.value = true;
        pdf_gral.value = false;
      }
    };

    const EstadoSelect = () => {
      if (selectedEstado.value.id == 0) {
        selectedEstado.value = "TODOS";
      }
      buscarDatos();
      obtenerListaProyectos();
    };

    const DescargarPDF = async () => {
      console.log("Downloading");
      $q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        message: "Reporte General Descargado",
      });

      const params = {};
      if (
        selectedDepartment.value !== "TODOS" &&
        selectedDepartment.value.id !== 0
      )
        params["departamento_id"] = selectedDepartment.value.id;
      if (selectedProvince.value !== "TODOS" && selectedProvince.value.id !== 0)
        params["provincia_id"] = selectedProvince.value.id;
      if (
        selectedMunicipality.value !== "TODOS" &&
        selectedMunicipality.value.id !== 0
      )
        params["municipio_id"] = selectedMunicipality.value.id;
      if (selectedEstado.value !== "TODOS" && selectedEstado.value.id !== 0)
        params["estado_id"] = selectedEstado.value.id;

      try {
        const respuesta = await _http.get(
          _http.convertQuery("/reportes/reporte_general_pdf/", params),
          true,
          {},
          "blob"
        );

        descargarArchivo(new Blob([respuesta]), "reporte_general.pdf");
      } catch (error) {
        console.error("Error al descargar el PDF", error);
      }
    };

    const DescargarPDF_lista_proyectos = async () => {
      if (selectedSearch.value == "POR PROGRAMA/PROYECTO") {
        try {
          const respuesta = await _http.get(
            _http.convertQuery("/reportes/proyectos-por-busqueda/", {
              search: search.value,
            })
          );
          descargarArchivo(new Blob([respuesta]), "reporte_general.pdf");
          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Detalle de Proyectos Descargado",
          });
        } catch (error) {
          console.error("Error al descargar el PDF", error);
        }
      } else {
        const params = {
          departamento_id: selectedDepartment.value.id,
          provincia_id: selectedProvince.value.id,
          municipio_id: selectedMunicipality.value.id,
        };

        if (selectedEstado.value !== "TODOS" && selectedEstado.value.id !== 0)
          params["estado_id"] = selectedEstado.value.id;

        try {
          const respuesta = await _http.get(
            _http.convertQuery(
              "/reportes/proyectos-por-municipio-pdf/",
              params
            ),
            true,
            {},
            "blob"
          );
          descargarArchivo(new Blob([respuesta]), "reporte_general.pdf");
        } catch (error) {
          console.error("Error al descargar el PDF", error);
        }
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

    const DescargarExcel_lista_proyectos = async () => {
      $q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        message: "Excel Proyectos Descargado",
      });
      const params = {};
      if (
        selectedDepartment.value !== "TODOS" &&
        selectedDepartment.value.id !== 0
      )
        params["departamento_id"] = selectedDepartment.value.id;
      if (selectedProvince.value !== "TODOS" && selectedProvince.value.id !== 0)
        params["provincia_id"] = selectedProvince.value.id;
      if (
        selectedMunicipality.value !== "TODOS" &&
        selectedMunicipality.value.id !== 0
      )
        params["municipio_id"] = selectedMunicipality.value.id;
      if (selectedEstado.value !== "TODOS" && selectedEstado.value.id !== 0)
        params["estado_id"] = selectedEstado.value.id;

      try {
        const respuesta = await _http.get(
          _http.convertQuery(
            "/reportes/proyectos-por-municipio-excel/",
            params
          ),
          true,
          {},
          "blob"
        );
        const nombreArchivo = "Reporte_a_Detalle.xlsx";
        const blob = new Blob([respuesta], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        descargarArchivo(blob, nombreArchivo);
      } catch (error) {
        console.error("Error al descargar Excel", error);
      }
    };

    const Descargar_reporte_sector = async (params) => {
      console.log("-----------",params);
      try {
        const respuesta = await _http.get(
          _http.convertQuery("/reportes/reporte-general-por-sector/", params)
        );
        descargarArchivo(new Blob([respuesta]), "reporte_general.pdf");
        $q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Reporte por sector descargado",
        });
      } catch (error) {
        console.error("Error al descargar el PDF", error);
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "error",
          message: "Error al descargar el PDF",
        });
      }
    };

    onMounted(async () => {
      try {
        const d = await _http.get("/departamentos/?ordering=nombre");

        departamentos.value = [
          { id: 0, nombre: "TODOS" },
          ...(await _http.get(`/departamentos/?ordering=nombre`)).results,
        ];

        estados.value = [
          { id: 0, nombre: "TODOS" },
          ...(await _http.get("/estados/?ordering=nombre")).results,
        ];

        const en_ejecucion = estados.value.find(
          (e) => e.nombre == "EN EJECUCIÓN"
        );
        selectedEstado.value = en_ejecucion;

        fetchData();
      } catch (e) {
        console.log("Error fetching data", e);
      }
    });

    return {
      cabezera,
      tabla_data,
      departamentos,
      provincias,
      municipios,
      estados,
      search,
      isDisabled,
      debouncedSearch,
      selectedDepartment,
      selectedProvince,
      selectedMunicipality,
      selectedEstado,
      selectedSearch,
      searchIsLocation,
      titulo,
      grafico_tabla,
      solo_tabla,
      pdf_descarga,
      pdf_gral,
      datos_proyectos,
      dialog,
      position,
      fetchData,
      buscarDatos,
      obtenerListaProyectos,
      DepartamentoSelect,
      ProvinciaSelect,
      MunicipioSelect,
      EstadoSelect,
      DescargarPDF,
      DescargarPDF_lista_proyectos,
      DescargarExcel_lista_proyectos,
      Descargar_reporte_sector,
    };
  },
};
</script>

<style scoped>
.bold-label {
  font-weight: bold;
}

.q-select {
  background-color: #ffffff;
  border: #979797 solid 1px;
  border-radius: 5px;
  padding-left: 5px;
  padding-right: 5px;
}

.button-container {
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 10px;
}

.button-container1 {
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 10px;
}
</style>
*/
