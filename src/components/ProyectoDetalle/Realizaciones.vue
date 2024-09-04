<template>
  <div>
    <div class="row justify-end">
      <q-btn
        @click="goBack"
        icon="arrow_back"
        label="Proyectos"
        color="primary"
        class="text-center"
      />
    </div>

    <div class="text-h4 q-mb-md"> <q-icon name="settings" />EJECUCIÓN DEL PROYECTO</div>

    <RealizacionesForm :valores="proyecto" @guardar="guardar" />

    <br />

    <div class="row justify-end">

       <q-btn @click="openModal" label="Ficha Técnica" color="primary" />
    <q-dialog v-model="isModalOpen">
      <q-card style="width: 1200px; max-width: 90vw">
        <q-card-section>
          <q-toolbar>
            <q-btn flat round icon="close" @click="isModalOpen = false" />
          </q-toolbar>
        </q-card-section>

        <q-card-section>
          <!-- Aquí se muestra el componente hijo -->
         <FichaTecnicaProyecto :ejecucion-id="proyecto.id" @guardar="guardar" />
        </q-card-section>

        <q-card-actions align="right">

          <q-btn             icon="close"
            label="Cerrar"
            color="primary" @click="isModalOpen = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
      <!-- <q-btn
        class="text-center"
        label="Ficha Tecnica"
        color="primary"
        icon="file_download"
        @click="
          $router.push({
            name: 'FichaEjecucion',
            params: { realizacion_id: proyecto.id },
          })
        "
      /> -->
    </div>
  </div>
</template>

<script>
import { ref, inject, onMounted } from "vue";
import CrudTable from "@components/common/CrudTable";
import RealizacionesForm from "components/Formularios/RealizacionesForm.vue";
import FichaTecnicaProyecto from "components/Formularios/FichaTecnicaProyecto.vue";

export default {
  name: "Realizaciones",
  components: { CrudTable, RealizacionesForm,FichaTecnicaProyecto },
  setup(props) {
        const isModalOpen = ref(false);

    const openModal = () => {
      isModalOpen.value = true;
    };
    const _http = inject("http");
    const _message = inject("message");
    const url = ref("/realizaciones/?proyecto_id=" + props.proyecto.id);
    const url_realizacion = ref("/realizaciones/");

    const realizaciones = ref();
    onMounted(async () => {

      console.log();
    });

    const goBack = () => {
      window.history.back();
    };

    const guardar = async (update, close) => {
      console.log("para guardar");

      try {
        const mensaje = !realizacion.value.id
          ? "Realización creada de manera exitosa."
          : "Realización actualizada de manera exitosa.";

        console.log(realizacion.value);
        console.log("ttttttttt:", typeof realizacion.value.total_inversion);

        if (typeof realizacion.value.total_inversion === "string") {
          realizacion.value.total_inversion = parseFloat(
            realizacion.value.total_inversion.replace(/,/g, ""),
            10
          ); //convierte a entero
        }

        if (typeof realizacion.value.presupuesto_vapsb === "string") {
          realizacion.value.presupuesto_vapsb = parseFloat(
            realizacion.value.presupuesto_vapsb.replace(/,/g, ""),
            10
          ); //convierte a entero
        }



        if (typeof realizacion.value.financiamiento_externo === "string") {
          5;
          realizacion.value.financiamiento_externo = parseInt(
            realizacion.value.financiamiento_externo.replace(/,/g, ""),
            10
          ); //convierte a entero
        }
        console.log("externo", realizacion.value.financiamiento_externo);


        if (realizacion.value.departamentos_model != null) {
          realizacion.value.departamento =
            realizacion.value.departamentos_model.id;
        }
        if (realizacion.value.provincia_model != null) {
          realizacion.value.provincia = realizacion.value.provincia_model.id;
        }
        if (realizacion.value.municipio_model != null) {
          realizacion.value.municipio = realizacion.value.municipio_model.id;
        }

        realizacion.value.lugar = realizacion.value.lugar_model.id; //datos obligados

        const data = {
          ...realizacion.value,
          departamentos_ids: realizacion.value.departamentos_model.map(
            (d) => d.id
          ),
          provincias_ids: realizacion.value.provincia_model.map((d) => d.id),
          municipios_ids: realizacion.value.municipio_model.map((d) => d.id),
        };
        if (realizacion.value.id) {
          console.log("ACTUALIZAARRRRRRR");
          console.log(`${url_realizacion.value}${realizacion.value.id}/`);
          console.log("Actualizarrrrrrrrr;", realizacion.value);
          await _http.put(
            `${url_realizacion.value}${realizacion.value.id}/`,
            data
          );
        } else {
          // console.log(`${url_realizacion.value}`);
          console.log("para guardarrrr;", realizacion.value);
          await _http.post(`${url_realizacion.value}`, data);
        }
        _message.success(mensaje);
        await update();
        resetForm();
        closeModal(close);
      } catch (error) {
        console.log(error);
        for (const key in error) {
          if (error.hasOwnProperty(key)) {
            _message.error(`${key}: ${error[key]}`);
            console.log(`${key}: ${error[key]}`);
          }
        }
      }
    };

    return {
      guardar,
      goBack,
      realizaciones,
            isModalOpen,
      openModal
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
