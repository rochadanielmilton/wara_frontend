<template>
  <q-page>
    <!-- {{ proyecto?.id }} -->
    <div class="row justify-end">
      <q-btn
        @click="goBack"
        icon="arrow_back"
        label="Proyectos"
        color="primary"
        class="text-center"
      />
    </div>
    <div class="text-h4 q-mb-md">
      <q-icon name="my_library_books" />INDICADORES
    </div>
    <q-form ref="form" @submit="submitForm" @reset="resetForm">
      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-6">
          <q-input
            square
            v-model="indicadores.numero_familias_beneficiadas"
            label="Número familias directas beneficiadas"
                        mask="###.###.###.###.###.###.###.###.###.###.###.###.###"
                  reverse-fill-mask
                  unmasked-value
            :rules="[validaNumero]"
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            square
            v-model="indicadores.numero_familias_indirectas"
            label="Número familias indirectas beneficiadas"
                        mask="###.###.###.###.###.###.###.###.###.###.###.###.###"
                  reverse-fill-mask
                  unmasked-value
            :rules="[validaNumero]"
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            square
            v-model="indicadores.beneficiados_varones"
            label="Beneficiados Varones"
                        mask="###.###.###.###.###.###.###.###.###.###.###.###.###"
                  reverse-fill-mask
                  unmasked-value
            :rules="[validaNumero]"
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            square
            v-model="indicadores.beneficiados_mujeres"
            label="Beneficiados Mujeres"
                        mask="###.###.###.###.###.###.###.###.###.###.###.###.###"
                  reverse-fill-mask
                  unmasked-value
            :rules="[validaNumero]"
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            square
            v-model="indicadores.empleos_directos"
            label="Empleos Directos"
                        mask="###.###.###.###.###.###.###.###.###.###.###.###.###"
                  reverse-fill-mask
                  unmasked-value
            :rules="[validaNumero]"
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            square
            v-model="indicadores.empleos_indirectos"
            label="Empleos Indirectos"
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
        <q-btn class="q-ml-sm" icon="close" label="Cancelar" @click="cancelar" />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { ref, inject, onMounted } from "vue";
export default {
  name: "indicadores",
  setup(props) {
    const _http = inject("http");
    const _message = inject("message");
    const url = ref(
      "/actualizar-indicadores/?proyecto_id=" + props.proyecto.id
    );
    const alert = ref(false);
    const separator = ref("vertical"); //'Horizontal' 'cell' 'vertical' 'none'
    const isButtonDisabled = ref(false);
    const indicadores = ref({
      proyecto_id: props.proyecto.id,
      numero_familias_beneficiadas: props.proyecto.numero_familias_beneficiadas,
      numero_familias_indirectas: props.proyecto.numero_familias_indirectas,
      beneficiados_varones: props.proyecto.beneficiados_varones,
      beneficiados_mujeres: props.proyecto.beneficiados_mujeres,
      empleos_indirectos: props.proyecto.empleos_indirectos,
      empleos_directos: props.proyecto.empleos_directos,
    });
    const form = ref(null);

    const actualizar = async () => {
      try {
        props.proyecto.numero_familias_beneficiadas =
          indicadores.numero_familias_beneficiadas;
        for (const clave in indicadores.value) {
          if (indicadores.value[clave] === null) indicadores.value[clave] = "";
        }
        await _http.put(url.value, indicadores.value);
        _message.success("SE ACTUALIZO CORRECTAMENTE");
        alert.value = false;
      } catch (error) {
        console.log(error);
      }
    };

    const submitForm = async () => {
      if (form.value) {
        const valid = await form.value.validate();
        if (valid) {
          try {
            props.proyecto.numero_familias_beneficiadas =
              indicadores.numero_familias_beneficiadas;
            for (const clave in indicadores.value) {
              if (indicadores.value[clave] === "")
                indicadores.value[clave] = null;
            }
            await _http.put(url.value, indicadores.value);
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
      indicadores.value = await _http.get(url.value);
      alert.value = false;
    };
    const goBack = () => {
      // route.value.back();
      window.history.back();
    };

    onMounted(async () => {
      try {
        indicadores.value = await _http.get(url.value);
        console.log(indicadores.value);
        for (const clave in indicadores.value) {
          if (indicadores.value[clave] === 0) indicadores.value[clave] = null;
        }
      } catch (error) {
        isButtonDisabled.value = true;
        // _message.error("No existe relacion (antiguo)");
      }
    });

    return {
      submitForm,
      validaNumero,
      form,
      indicadores,
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

.thead {
  background-color: rgba(4, 4, 39, 0.795);
}
</style>
