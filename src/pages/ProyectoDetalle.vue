<template>

  <q-page v-if="!loading" style="margin-top: 1px !important; display: flex; flex-direction: column;">
    <div v-if="!proyecto_id && (!sector || sector.value === null)" style=" padding: 0; margin: 0;">
      <q-select v-model="selectedOption" :options="options" class="custom-select" color="primary" label="Sector"
        @update:model-value="selectSector" style="width: 250px; margin-top: 10px;" />
      <hr>
    </div>


    <div>
      <q-splitter v-model="splitterModel">
        <template v-slot:before>

          <q-tabs v-model="tab" @update:model-value="handleTabChange" vertical
            class="bg-white text-black shadow-2 custom-tabs" style="width: 190px">

            <q-tab v-if="sector === 'AGUA Y SANEAMIENTO' || sector_proyecto === 'AGUA Y SANEAMIENTO'"
              name="agua_saneamiento" icon="clean_hands" label="Información General" class="custom-tab" />
            <q-tab v-if="sector === 'CUENCAS' || sector_proyecto === 'CUENCAS'" name="cuencas" icon="gesture"
              label="Información General" class="custom-tab" />
            <q-tab v-if="sector === 'RIEGO' || sector_proyecto === 'RIEGO'" name="riego" icon="water_drop"
              label="Información General" class="custom-tab" />

            <q-tab v-if="sector === 'RESIDUOS' || sector_proyecto === 'RESIDUOS'" name="residuos" icon="delete"
              label="Información General" class="custom-tab" />
            <q-tab name="realizaciones" icon="settings" label="Ejecución de Proyecto" class="custom-tab" />
            <q-tab name="informacion_georreferencial" icon="location_pin" label="Georeferencial" class="custom-tab" />
            <template v-if="
              sector === 'AGUA Y SANEAMIENTO' ||
              sector_proyecto === 'AGUA Y SANEAMIENTO'
            ">
              <q-tab name="conexiones" icon="clean_hands" label="Conexiones" class="custom-tab" />
              <q-tab name="poblaciones" icon="group" label="Poblaciones" class="custom-tab" />
              <q-tab name="drenajes_pluviales" icon="water_drop" label="Drenajes Pluviales" class="custom-tab" />
            </template>

            <q-tab v-if="sector === 'CUENCAS' || sector_proyecto === 'CUENCAS'" name="variables_impacto"
              icon="calculate" label="Variables de Impacto" class="custom-tab" />
            <q-tab name="otros" icon="my_library_books" label="Indicadores" class="custom-tab" />

            <q-tab name="seguimientos" icon="nature_people" label="seguimiento" class="custom-tab" />
          </q-tabs>
        </template>
        <template v-slot:after>
          <q-tab-panels v-model="tab" animated swipeable="false" vertical transition-prev="jump-up"
            transition-next="jump-up">
            <q-tab-panel name="informacion_general">
              <InformacionGeneral :proyecto=proyecto />
            </q-tab-panel>

            <q-tab-panel name="realizaciones">
              <div v-if="proyecto_id">
                <Realizaciones :proyecto="proyecto"></Realizaciones>
              </div>
              <div v-else>
                <h3 style="text-align: center">Primero deve registrar la informacion general</h3>
              </div>
            </q-tab-panel>
            <q-tab-panel name="agua_saneamiento">
              <AguaGen :proyecto="proyecto" @updateProyectoId="handleUpdateProyectoId"></AguaGen>
            </q-tab-panel>
            <q-tab-panel name="cuencas">
              <CuencasGen :proyecto="proyecto"></CuencasGen>
            </q-tab-panel>
            <q-tab-panel name="riego">
              <RiegoGen :proyecto="proyecto"></RiegoGen>
            </q-tab-panel>
            <q-tab-panel name="residuos">
              <ResiduosGen :proyecto="proyecto"></ResiduosGen>
            </q-tab-panel>
            <q-tab-panel name="conexiones">
              <div v-if="proyecto_id">
                <Conexiones :proyecto="proyecto"></Conexiones>
              </div>
              <div v-else>
                <h3 style="text-align: center">Primero deve registrar la informacion general</h3>
              </div>
            </q-tab-panel>
            <q-tab-panel name="informacion_georreferencial">
              <div v-if="proyecto_id">
                <InformacionGeorreferencial :proyecto="proyecto" @update="handleUpdate" />
              </div>
              <div v-else>
                <h3 style="text-align: center">Primero deve registrar la informacion general</h3>
              </div>
            </q-tab-panel>
            <q-tab-panel name="seguimientos">
              <div v-if="proyecto_id">
                <Seguimientos :proyecto="proyecto" />
              </div>
              <div v-else>
                <h3 style="text-align: center">Primero deve registrar la informacion general</h3>
              </div>
            </q-tab-panel>

            <q-tab-panel name="conexiones">
              <div v-if="proyecto_id">
                <Conexiones :proyecto="proyecto"></Conexiones>
              </div>
              <div v-else>
                <h3 style="text-align: center">Primero deve registrar la informacion general</h3>
              </div>
            </q-tab-panel>
            <q-tab-panel name="poblaciones">
              <div v-if="proyecto_id">
                <Poblaciones :proyecto="proyecto"></Poblaciones>
              </div>
              <div v-else>
                <h3 style="text-align: center">Primero deve registrar la informacion general</h3>
              </div>
            </q-tab-panel>
            <q-tab-panel name="drenajes_pluviales">
              <div v-if="proyecto_id">
                <DrenajesPluviales :proyecto="proyecto"></DrenajesPluviales>
              </div>
              <div v-else>
                <h3 style="text-align: center">Primero deve registrar la informacion general</h3>
              </div>
            </q-tab-panel>
            <q-tab-panel name="variables_impacto">
              <div v-if="proyecto_id">
                <VariablesImpacto :proyecto="proyecto"></VariablesImpacto>
              </div>
              <div v-else>
                <h3 style="text-align: center">Primero deve registrar la informacion general</h3>
              </div>
            </q-tab-panel>
            <q-tab-panel name="otros">
              <div v-if="proyecto_id">
                <Otros :proyecto="proyecto"></Otros>
              </div>
              <div v-else>
                <h3 style="text-align: center">Primero deve registrar la informacion general</h3>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </template>
      </q-splitter>
    </div>
  </q-page>
  <q-spinner-cube v-else color="primary" size="5.5em" />
</template>

<script>
import { useRoute } from "vue-router";
import { ref, onMounted, inject,provide} from "vue";
import InformacionGeneral from "components/ProyectoDetalle/InformacionGeneral";
import Realizaciones from "components/ProyectoDetalle/Realizaciones";
import Conexiones from "components/ProyectoDetalle/Conexiones";
import AguaGen from "components/ProyectoDetalle/AguaGen";
import RiegoGen from "components/ProyectoDetalle/RiegoGen";
import CuencasGen from "components/ProyectoDetalle/CuencasGen.vue";
import ResiduosGen from "components/ProyectoDetalle/ResiduosGen.vue";
import InformacionGeorreferencial from "components/ProyectoDetalle/InformacionGeorreferencial.vue";
import Seguimientos from "components/ProyectoDetalle/Seguimientos.vue";
import DrenajesPluviales from "components/ProyectoDetalle/DrenajesPluviales.vue";
import Otros from "components/ProyectoDetalle/Otros.vue";
import Poblaciones from "components/ProyectoDetalle/Poblaciones.vue";
import VariablesImpacto from "components/ProyectoDetalle/VariablesImpacto.vue";
import Proyectos from "./Proyectos.vue";
import { bexBackground } from "quasar/wrappers";
export default {
  components: {
    InformacionGeneral,
    Realizaciones,
    Conexiones,
    AguaGen,
    RiegoGen,
    CuencasGen,
    ResiduosGen,
    InformacionGeorreferencial,
    Seguimientos,
    Otros,
    VariablesImpacto,
    Poblaciones,
    DrenajesPluviales,
  },
  name: "proyecto-detalle",
  setup() {
    const _http = inject("http");
    const _storage = inject("storage");
    const loading = ref(true);
    const route = useRoute();
    const proyecto = ref({});
    provide("proyecto", proyecto);
    const sector = ref(null);
    const sector_proyecto = ref(null);
    const tab = ref("informacion_general");
    provide("tab",tab);
    const proyecto_id = ref(route.params.proyectoId || false);
    provide("proyectoId", proyecto_id);
    const selectedOption = ref('agua_saneamiento');
    const options = ref([
      { label: 'AGUA Y SANEAMIENTO', value: 'agua_saneamiento' },
      { label: 'CUENCAS', value: 'cuencas' },
      { label: 'RIEGO', value: 'riego' },
      { label: 'RESIDUOS', value: 'residuos' }
    ]);
    // const _storage = {
    //   get: (key) => JSON.parse(localStorage.getItem(key)),
    //   set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
    // };


    onMounted(async () => {
      if (proyecto_id.value) {
        try {
          const response = await _http.get(`/proyectos/${route.params.proyectoId}/`);
          proyecto.value = response;
        } catch (error) {

          _message.error("No se pudo cargar el proyecto. Verifica la conexión o el ID del proyecto.");
        };
      }else{

      };

      loading.value = false;
      const usuarioStorage = _storage.get("usuario");
      if (usuarioStorage) {
        const usuario = usuarioStorage;

        sector.value = usuario.sector?.nombre || "";
        if (!sector.value){
          sector_proyecto.value = proyecto.value.sector_name ? proyecto.value.sector_name : 'AGUA Y SANEAMIENTO';
        }else{
          sector_proyecto.value = "";
        }

        // Establece la pestaña activa según el sector
        switch (sector.value) {
          case "AGUA Y SANEAMIENTO":
            tab.value = "agua_saneamiento";
            break;
          case "CUENCAS":
            tab.value = "cuencas";
            break;
          case "RIEGO":
            tab.value = "riego";
            break;
          case "RESIDUOS":
            tab.value = "residuos";
            break;
        }

        if (sector.value === "") {
          switch (sector_proyecto.value) {
            case "AGUA Y SANEAMIENTO":
              tab.value = "agua_saneamiento";
              break;
            case "CUENCAS":
              tab.value = "cuencas";
              break;
            case "RIEGO":
              tab.value = "riego";
              break;
            case "RESIDUOS":
              tab.value = "residuos";
              break;
          }
        }
      } else {
        console.error("No se encontró el usuario en el localStorage");
      }

      const savedTab = _storage.get("tab");
      if (savedTab) {
        tab.value = savedTab;
      }

    });
    const selectSector = (option) => {
      tab.value = option.value;
      sector_proyecto.value = option.label;
    };
    return {
      tab,
      splitterModel: ref(12),
      proyecto,
      loading,
      sector,
      sector_proyecto,
      proyecto_id,
      selectedOption,
      options,
      selectSector,

    };
  },
};
</script>

<style scoped>
.custom-tab.q-tab--active {
  background: var(--q-primary);
  color: white;
  transition: background 0.3s, color 0.3s;
}

.custom-tab .q-tab__indicator {
  display: none;
  background-color: black;
  width: 50px;
}

.custom-select {
  background-color: #d8d5d5;
  /* Color de fondo azul claro */
  border-radius: 8px;
  /* Bordes redondeados */
  padding: 5px;
  /* Espaciado interior */
}
</style>
