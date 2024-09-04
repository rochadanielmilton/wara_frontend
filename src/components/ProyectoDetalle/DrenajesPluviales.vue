<template>
  <q-page>
    <!-- aaa -->
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
      <q-icon name="water_drop" />DRENAJES PLUVIALES
    </div>
    <!-- {{ proyecto?.id }} -->
    <q-form ref="form" @submit="submitForm" @reset="resetForm">
      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-6">
          <q-input
            mask="###.###.###.###.###.###.###.###.###.###.###.###.###"
                  reverse-fill-mask
                  unmasked-value
            square
            v-model="drenaje_pluviales.poblacion_beneficiada"
            label="pileta publica"
            :rules="[validaNumero]"
          />
        </div>

        <div class="col-12 col-md-6">
          <q-input
            mask="###.###.###.###.###.###.###.###.###.###.###.###.###"
                  reverse-fill-mask
                  unmasked-value
            square
            v-model="drenaje_pluviales.familias_beneficiadas"
            label="agua potable"
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
  name: "Drenajes Pluviales",
  setup(props) {
    const _http = inject("http");
    const _message = inject("message");
    const url = ref("/proyectos/" + props.proyecto.id + "/drenajes-pluviales/");
    const alert = ref(false);
    const isButtonDisabled = ref(false);
    const drenaje_pluviales = ref({
      agua_potable: null,
      pileta_publica: null,
    });
    const form = ref(null);

    const actualizar = async () => {
      try {
        for (const clave in drenaje_pluviales.value) {
          if (drenaje_pluviales.value[clave] === "")
            drenaje_pluviales.value[clave] = null;
        }
        await _http.put(url.value, drenaje_pluviales.value);
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
            for (const clave in drenaje_pluviales.value) {
              if (drenaje_pluviales.value[clave] === "")
                drenaje_pluviales.value[clave] = null;
            }
            await _http.put(url.value, drenaje_pluviales.value);
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
      drenaje_pluviales.value = await _http.get(url.value);
      alert.value = false;
    };

    const goBack = () => {
      window.history.back();
    };

    onMounted(async () => {
      try {
        drenaje_pluviales.value = await _http.get(url.value);
      } catch (error) {
        isButtonDisabled.value = true;
      }
    });

    return {
      form,
      submitForm,
      validaNumero,
      drenaje_pluviales,
      alert,
      actualizar,
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
