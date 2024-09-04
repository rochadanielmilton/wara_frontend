<template>
  <q-page>
    <div class="row justify-end">
      <q-btn @click="goBack" icon="arrow_back" label="Proyectos" color="primary" />
    </div>
    <div class="text-h4 q-mb-md"> <q-icon name="water_drop" /> INFORMACION GENERAL</div>
    <ProyectosForm :valores="proyecto" @guardar="guardar"></ProyectosForm>
  </q-page>
</template>

<script>
import { useVModel } from "../../composables/useVModel.js";
import ProyectosForm from "components/Formularios/Proyectos.vue";
import { ref, inject } from "vue";
export default {
  props: {
    proyecto: {
      type: Object,
      default: () => ({}),
    },
  },
  components: { ProyectosForm },
  name: "Informacion general",
  setup(props) {
    console.log("proyecto IG");
    console.log(props.proyecto);

    const proyecto = ref(props.proyecto);
    const _http = inject("http");
    const _message = inject("message");
    const url = ref("/proyectos/");

    const guardar = async () => {
      const mensaje = !proyecto.value.id
        ? "Proyecto creado de manera exitosa."
        : "Proyecto actualizado de manera exitosa.";

      try {
        const formData = new FormData();

        for (const key in proyecto.value) {
          if (key === 'imagen_proyecto' && proyecto.value[key] instanceof File) {
            formData.append(key, proyecto.value[key]);
          } else if (proyecto.value[key] != null && key !== 'imagen_proyecto') {
            formData.append(key, proyecto.value[key]);
          }
        }

        if (proyecto.value.id) {
          await _http.put(`${url.value}${proyecto.value.id}/`, formData);
        } else {
          await _http.post(`${url.value}`, formData, config);
        }

        _message.success(mensaje);
      } catch (error) {
        _message.error("Ocurrió un error al guardar el proyecto.ssss");
        console.error(error);
      }
    };

    const goBack = () => {
      // route.value.back();
      window.history.back();
    };
    return {
      proyecto,
      guardar,
      goBack,
    };
  },
};
</script>
