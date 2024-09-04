<template>
  <q-page>
    <div class="row justify-end">
      <q-btn
        @click="goBack"
        icon="arrow_back"
        label="Proyectos"
        class="text-center"
        color="primary"
      />
    </div>
    <div class="text-h4 q-mb-md">
      <q-icon name="calculate" />VARIABLES DE IMPACTO
    </div>
    <!-- {{ proyecto?.id }} -->
    <q-form ref="form" @submit="submitForm" @reset="resetForm">
      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-6">
          <q-input
            square
            v-model="variables_impacto.area_intervencion_km2"
            label="area intervención km2"
                        mask="###.###.###.###.###.###.###.###.###.###.###.###.###"
                  reverse-fill-mask
                  unmasked-value
            :rules="[validaNumero]"
          />
        </div>

        <div class="col-12 col-md-6">
          <q-input
            square
            v-model="variables_impacto.hectareas_forestadas"
            label="hectáreas forestadas"
                        mask="###.###.###.###.###.###.###.###.###.###.###.###.###"
                  reverse-fill-mask
                  unmasked-value
            :rules="[validaNumero]"
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            square
            v-model="variables_impacto.viveros_construccion_forta"
            label="viveros construcción forta"
                        mask="###.###.###.###.###.###.###.###.###.###.###.###.###"
                  reverse-fill-mask
                  unmasked-value
            :rules="[validaNumero]"
          />
        </div>

        <div class="col-12 col-md-6">
          <q-input
            square
            v-model="variables_impacto.superficie_protegida"
            label="superficie protegida"
                        mask="###.###.###.###.###.###.###.###.###.###.###.###.###"
                  reverse-fill-mask
                  unmasked-value
            :rules="[validaNumero]"
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            square
            v-model="variables_impacto.recoleccion_de_agua_de_lluvia"
            label="recoleccion de agua de lluvia"
                        mask="###.###.###.###.###.###.###.###.###.###.###.###.###"
                  reverse-fill-mask
                  unmasked-value
            :rules="[validaNumero]"
          />
        </div>

        <div class="col-12 col-md-6">
          <q-input
            square
            v-model="variables_impacto.informacion"
            label="informacion"
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            square
            v-model="variables_impacto.hectareas_protegidas"
            label="hectareas protegidas"
                        mask="###.###.###.###.###.###.###.###.###.###.###.###.###"
                  reverse-fill-mask
                  unmasked-value
            :rules="[validaNumero]"
          />
        </div>

        <div class="col-12 col-md-6">
          <q-input
            square
            v-model="variables_impacto.sistemas_riego"
            label="sistemas riego"
                        mask="###.###.###.###.###.###.###.###.###.###.###.###.###"
                  reverse-fill-mask
                  unmasked-value
            :rules="[validaNumero]"
          />
        </div>
      </div>

      <br />
      <div class="q-gutter-md row">
        <q-btn type="submit" label="Actualizar" color="primary" />
        <q-btn
          class="q-ml-sm"
          icon="close"
          label="Cancelar"
          @click="cancelar"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { ref, inject, onMounted } from "vue";
export default {
  name: "Variables Impacto",
  setup(props) {
    const _http = inject("http");
    const _message = inject("message");
    const url = ref("/proyectos/" + props.proyecto.id + "/variables-impacto/");
    const alert = ref(false);
    const separator = ref("vertical"); //'Horizontal' 'cell' 'vertical' 'none'
    const isButtonDisabled = ref(false);
    const variables_impacto = ref({
      area_intervencion_km2: null,
      hectareas_forestadas: null,
      hectareas_reforestadas: null,
      viveros_construccion_forta: null,
      superficie_protegida: null,
      informacion: null,
      hectareas_protegidas: null,
      sistemas_riego: null,
      recoleccion_de_agua_de_lluvia: null,
    });
    const form = ref(null);

    const actualizar = async () => {
      try {
        for (const clave in variables_impacto.value) {
          if (variables_impacto.value[clave] === "")
            variables_impacto.value[clave] = null;
        }
        await _http.put(url.value, variables_impacto.value);
        _message.success("SE ACTUALIZO CORRECTAMENTE");
        alert.value = false;
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

    const submitForm = async () => {
      if (form.value) {
        const valid = await form.value.validate();
        if (valid) {
          try {
            for (const clave in variables_impacto.value) {
              if (variables_impacto.value[clave] === "")
                variables_impacto.value[clave] = null;
            }
            await _http.put(url.value, variables_impacto.value);
            _message.success("SE ACTUALIZO CORRECTAMENTE");
            alert.value = false;
          } catch (error) {
            console.error("Error al enviar los datos:", error);
            for (const key in error) {
              if (error.hasOwnProperty(key)) {
                _message.error(`${key}: ${error[key]}`);
                console.log(`${key}: ${error[key]}`);
              }
            }
          }
        } else {
          console.log("Formulario inválido");
        }
      } else {
        console.error("El formulario no está correctamente referenciado");
      }
    };

    const validaNumero = (val) => {
      if (val === null || val === "" || val === undefined) {
        return true; // No es requerido
      }
      return val > 0 || "El número debe ser mayor a cero";
    };

    const cancelar = async () => {
      variables_impacto.value = await _http.get(url.value);
      alert.value = false;
    };

    onMounted(async () => {
      try {
        variables_impacto.value = await _http.get(url.value);
      } catch (error) {
        isButtonDisabled.value = true;
        // _message.error("No existe relacion (antiguo)");
      }
    });
    const goBack = () => {
      // route.value.back();
      window.history.back();
    };

    return {
      validaNumero,
      form,
      submitForm,
      variables_impacto,
      alert,
      actualizar,
      separator,
      cancelar,
      isButtonDisabled,
      goBack,
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
