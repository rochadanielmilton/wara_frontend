<template>
  <q-page>
    <!-- {{ proyecto?.id }} -->
    <div class="row justify-end">
      <q-btn
        @click="goBack"
        icon="arrow_back"
        label="Proyectos"
        class="text-center"
        color="primary"
      />
    </div>

    <div class="text-h4 q-mb-md"><q-icon name="location_pin" />UBICACION GEOGRAFICA DEL PROYECTO</div>
    <MapView
      :datos_mapa="datos_mapa"
      @actualizar-datos="manejarDatos"
      :estado_btn_guardar="estado_btn_guardar"
    />

    <q-markup-table :separator="separator" flat bordered>
      <thead>
        <tr>
          <th class="text-left text-h7">Latitud:</th>
          <th class="text-center">Longitud:</th>
          <th class="text-center">Accion</th>
          <th class="text-center">Accion</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-left text-h7">
            <q-input
              v-model="latitud"
              label="Latitud"
              :disable="isDisabled"
              square
            />
          </td>
          <td class="text-center">
            <q-input
              v-model="longitud"
              label="Longitud"
              :disable="isDisabled"
              square
            />
          </td>
          <td class="text-center">
            <q-btn
              label="MARCAR"
              @click="volar_al_mapa"
              color="primary"
              :disable="isDisabled"
            />
          </td>
          <td class="text-center">
            <!-- <q-btn
              label="guardar"
              @click="guardar"
              color="primary"
              :disable="isDisabled"
            /> -->

            <!-- Botón A que realiza la acción 'accionBotonA' cuando se hace clic -->
            <q-btn
              v-if="showButtonA"
              @click="accionBotonA"
              label="EDITAR"
              color="primary"
            />
            <!-- aaa -->
            <!-- Botón B que realiza la acción 'accionBotonB' cuando se hace clic -->
            <q-btn
              v-else
              @click="accionBotonB"
              label="GUARDAR"
              color="primary"
            />
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </q-page>
</template>

<script>
import { ref, inject, onMounted, defineEmits } from "vue";
import MapView from "components/common/MapView.vue";
import { useRouter } from "vue-router";
export default {
  name: "InformacionGeorreferencial",
  components: {
    MapView,
  },
  setup(props) {
    // console.log(props);
    const router = useRouter();
    const _http = inject("http");
    console.log("propssss", props.proyecto.latitud);
    // const url = ref("update-geo-localizacion/?proyecto_id="+props.proyecto_id+"&latitud="+"111"+"&longitud="+"111");

    const _message = inject("message");
    const separator = ref("vertical"); //'Horizontal' 'cell' 'vertical' 'none'
    const latitud = ref(null);
    const longitud = ref(null);
    const datos_mapa = ref(null);
    const isDisabled = ref(false);
    const showButtonA = ref(false);
    const emit = defineEmits();
    const estado_btn_guardar = ref(false);

    const accionBotonA = () => {
      //editar
      showButtonA.value = false;
      isDisabled.value = false;
      estado_btn_guardar.value = !estado_btn_guardar.value; //para la funcion onMapclick(e);
      console.log("estado_btn_guardar***", !estado_btn_guardar.value);
    };

    const accionBotonB = async () => {
      //guardar a DB.
      if (latitud.value != null && longitud.value != null) {
        await _http.put(
          "/update-geo-localizacion/?proyecto_id=" +
            props.proyecto.id +
            "&latitud=" +
            latitud.value +
            "&longitud=" +
            longitud.value
        );
        props.proyecto.latitud = latitud;
        props.proyecto.longitud = longitud;
        showButtonA.value = true;
        isDisabled.value = true;
        _message.success("Se actualizo la ubicación correctamente");

        // emit("actualizacion-exitosa", { latitud: latitud.value, longitud: longitud.value });

        estado_btn_guardar.value = false;
      } else {
        console.log("No hay datos...");
      }
    };

    const toggleButton = () => {
      showButtonA.value = !showButtonA.value;
    };

    const obtner_coordenadas = async () => {
      if (
        props.proyecto.latitud != "null" &&
        props.proyecto.longitud != "null"
      ) {
        //TIENE DATOS
        datos_mapa.value = {
          latitud: props.proyecto.latitud,
          longitud: props.proyecto.longitud,
        };
        latitud.value = props.proyecto.latitud; //input
        longitud.value = props.proyecto.longitud; //input
        showButtonA.value = true;
        isDisabled.value = true;
      } else {
        showButtonA.value = !showButtonA.value;
      }
    };

    const volar_al_mapa = () => {
      if (latitud.value != null && longitud.value != null) {
        //envia datos al hijo
        datos_mapa.value = {
          latitud: latitud,
          longitud: longitud,
        };
      } else {
        _message.error("Click en el mapa para obtener las coordenadas");
      }
    };
    // const guardar = async () => {};

    const manejarDatos = (datos) => {
      console.log("dato1 recibido : ", datos.dato1);
      console.log("dato2 recibido : ", datos.dato2);
      latitud.value = datos.dato1;
      longitud.value = datos.dato2;
    };

    onMounted(async () => {
      obtner_coordenadas();
    });

    const goBack = () => {
      // route.value.back();
      window.history.back();
    };

    return {
      latitud,
      longitud,
      goBack,
      volar_al_mapa,
      separator,
      datos_mapa,
      manejarDatos,
      obtner_coordenadas,
      isDisabled,
      showButtonA,
      toggleButton,
      accionBotonA,
      accionBotonB,
      emit,
      estado_btn_guardar,
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
.q-stepper {
  margin-bottom: 20px;
}
.q-stepper {
  width: 530px;
}
.input-nomal .q-card {
  width: 220px;
}
.q-select {
  width: 300px;
}
.text-h7 {
  text-transform: uppercase;
}
.mayuscula {
  text-transform: uppercase;
}

.q-input {
  /* width: 500px; */
  text-transform: uppercase;
}
</style>
