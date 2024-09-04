<template>

  <q-page v-if="!loading" style="margin-top: 1px !important">
    <div>
      <q-splitter v-model="splitterModel">
        <template v-slot:before>
          <q-tabs
            v-model="tab"
            @update:model-value="handleTabChange"
            vertical
            class="bg-white text-black shadow-2 custom-tabs"
            style="width: 190px"
          >
            <q-tab
              v-if="sector_proyecto === 'AGUA Y SANEAMIENTO'"
              name="agua_saneamiento"
              icon="clean_hands"
              label="Información General"
              class="custom-tab"
            />

            <q-tab
              v-if="sector_proyecto === 'CUENCAS'"
              name="cuencas"
              icon="water_drop"
              label="Información General"
              class="custom-tab"
            />

            <q-tab
              v-if="sector_proyecto === 'RIEGO'"
              name="riego"
              icon="water_drop"
              label="Información General"
              class="custom-tab"
            />
            <q-tab
              v-if="sector_proyecto === 'RESIDUOS'"
              name="residuos"
              icon="delete"
              label="Información General"
              class="custom-tab"
            />

            <q-tab
              v-if="sector === 'AGUA Y SANEAMIENTO'"
              name="agua_saneamiento"
              icon="clean_hands"
              label="Información General"
              class="custom-tab"
            />
            <q-tab
              v-if="sector === 'CUENCAS'"
              name="cuencas"
              icon="gesture"
              label="Información General"
              class="custom-tab"
            />
            <q-tab
              v-if="sector === 'RIEGO'"
              name="riego"
              icon="water_drop"
              label="Información General"
              class="custom-tab"
            />

            <q-tab
              v-if="sector === 'RESIDUOS'"
              name="residuos"
              icon="delete"
              label="Información General"
              class="custom-tab"
            />
            <q-tab
              name="realizaciones"
              icon="settings"
              label="Ejecución de Proyecto"
              class="custom-tab"
            />

            <template
              v-if="
                sector === 'AGUA Y SANEAMIENTO' ||
                sector_proyecto === 'AGUA Y SANEAMIENTO'
              "
            >
              <q-tab
                name="conexiones"
                icon="clean_hands"
                label="Conexiones"
                class="custom-tab"
              />
              <q-tab
                name="poblaciones"
                icon="group"
                label="Poblaciones"
                class="custom-tab"
              />
              <q-tab
                name="drenajes_pluviales"
                icon="water_drop"
                label="Drenajes Pluviales"
                class="custom-tab"
              />
            </template>

            <q-tab
              v-if="sector === 'CUENCAS' || sector_proyecto === 'CUENCAS'"
              name="variables_impacto"
              icon="calculate"
              label="Variables de Impacto"
              class="custom-tab"
            />
            <q-tab
              name="otros"
              icon="my_library_books"
              label="Indicadores"
              class="custom-tab"
            />
            <q-tab
              name="informacion_georreferencial"
              icon="location_pin"
              label="Georeferencial"
              class="custom-tab"
            />
            <q-tab
              name="seguimientos"
              icon="nature_people"
              label="seguimiento"
              class="custom-tab"
            />
          </q-tabs>
        </template>
        <template v-slot:after>
          <q-tab-panels
            v-model="tab"
            animated
            swipeable="false"
            vertical
            transition-prev="jump-up"
            transition-next="jump-up"
          >
            <q-tab-panel name="informacion_general">
              <InformacionGeneral :proyecto="proyecto" />
            </q-tab-panel>
            <q-tab-panel name="realizaciones">
              <Realizaciones :proyecto="proyecto"></Realizaciones>
            </q-tab-panel>
            <q-tab-panel name="agua_saneamiento">
              <AguaGen :proyecto="proyecto"></AguaGen>
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
              <Conexiones :proyecto="proyecto"></Conexiones>
            </q-tab-panel>
            <q-tab-panel name="informacion_georreferencial">
              <InformacionGeorreferencial
                :proyecto="proyecto"
                @update="handleUpdate"
              />
            </q-tab-panel>
            <q-tab-panel name="seguimientos">
              <Seguimientos :proyecto="proyecto" />
            </q-tab-panel>

            <q-tab-panel name="conexiones">
              <Conexiones :proyecto="proyecto"></Conexiones>
            </q-tab-panel>
            <q-tab-panel name="poblaciones">
              <Poblaciones :proyecto="proyecto"></Poblaciones>
            </q-tab-panel>
            <q-tab-panel name="drenajes_pluviales">
              <DrenajesPluviales :proyecto="proyecto"></DrenajesPluviales>
            </q-tab-panel>
            <q-tab-panel name="variables_impacto">
              <VariablesImpacto :proyecto="proyecto"></VariablesImpacto>
            </q-tab-panel>
            <q-tab-panel name="otros">
              <Otros :proyecto="proyecto"></Otros>
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
import { ref, onMounted, inject } from "vue";
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
    const proyecto = ref(null);
    const sector = ref(null);
    const sector_proyecto = ref(null);
    const tab = ref("informacion_general");

    // const _storage = {
    //   get: (key) => JSON.parse(localStorage.getItem(key)),
    //   set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
    // };

    const handleTabChange = (value) => {
      _storage.set("tab", value);
    };

    onMounted(async () => {
      proyecto.value = await _http.get(
        `/proyectos/${route.params.proyectoId}/`
      );
      loading.value = false;
      sector_proyecto.value = proyecto.value.sector_name;
      const usuarioStorage = _storage.get("usuario");
      if (usuarioStorage) {
        const usuario = usuarioStorage;

        sector.value = usuario.sector?.nombre || "";

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

    return {
      tab,
      splitterModel: ref(12),
      proyecto,
      loading,
      sector,
      sector_proyecto,
      handleTabChange,
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
</style>
