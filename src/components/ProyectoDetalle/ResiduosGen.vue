<template>
  <q-page>
    <div class="row justify-end">
      <q-btn
        @click="goBack"
        icon="arrow_back"
        label="Proyectos"
        color="primary"
      />
    </div>
    <div class="text-h4 q-mb-md">
      <q-icon name="delete" /> INFORMACION GENERAL
    </div>
    <ResiduosForm
      :valores="proyecto"
      @guardar="guardar"
      denominativo-ejecutivo="RESIDUOS"
      :datos_actualizados="datos_actualizados"
    ></ResiduosForm>
  </q-page>
</template>

<script>
import { useVModel } from "../../composables/useVModel.js";
import ResiduosForm from "components/Formularios/ResiduosForm.vue";
import { ref, inject } from "vue";

export default {
  props: {
    proyecto: {
      type: Object,
      default: () => ({}),
    },
  },
  components: { ResiduosForm },
  name: "Informacion general",
  setup(props) {
    const datos_actualizados = ref({});
    const proyecto = ref(props.proyecto);
    const _http = inject("http");
    const _message = inject("message");
    const url = ref("/proyectos/");

    const guardar = async () => {
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

        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const formData = new FormData();
        for (const [key, value] of Object.entries(proyecto.value)) {
          formData.append(key, value);
        }

        if (proyecto.value.id) {
          const response = await _http.put(
            `${url.value}${proyecto.value.id}/`,
            formData,
            config
          );

          datos_actualizados.value = response;
        } else {
          await _http.post(`${url.value}`, formData, config);
        }
        _message.success(mensaje);
      } catch (error) {
        _message.error("Ocurrió un error al guardar el proyecto.");
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
      datos_actualizados,
    };
  },
};
</script>
