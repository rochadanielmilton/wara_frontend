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
    <div class="text-h4 q-mb-md"><q-icon name="group" />POBLACIONES</div>
    <q-form ref="form" @submit="submitForm" @reset="resetForm">
      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-6">
          <q-input
            square
            v-model="poblaciones.agua_potable"
            label="agua potable"
                        mask="###.###.###.###.###.###.###.###.###.###.###.###.###"
                  reverse-fill-mask
                  unmasked-value
            :rules="[validaNumero]"
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            square
            v-model="poblaciones.pileta_publica"
            label="pileta publica"
                        mask="###.###.###.###.###.###.###.###.###.###.###.###.###"
                  reverse-fill-mask
                  unmasked-value
            :rules="[validaNumero]"
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            square
            v-model="poblaciones.pozo_o_noria_con_bomba"
            label="pozo o noria con bomba"
                        mask="###.###.###.###.###.###.###.###.###.###.###.###.###"
                  reverse-fill-mask
                  unmasked-value
            :rules="[validaNumero]"
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            square
            v-model="poblaciones.pozo_o_noria_protegido"
            label="pozo o noria protegido"
                        mask="###.###.###.###.###.###.###.###.###.###.###.###.###"
                  reverse-fill-mask
                  unmasked-value
            :rules="[validaNumero]"
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            square
            v-model="poblaciones.recoleccion_de_agua_de_lluvia"
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
            v-model="poblaciones.alcantarillado"
            label="alcantarillado"
                        mask="###.###.###.###.###.###.###.###.###.###.###.###.###"
                  reverse-fill-mask
                  unmasked-value
            :rules="[validaNumero]"
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            square
            v-model="poblaciones.alcantarillado_condominial"
            label="alcantarillado condominial"
                        mask="###.###.###.###.###.###.###.###.###.###.###.###.###"
                  reverse-fill-mask
                  unmasked-value
            :rules="[validaNumero]"
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            square
            v-model="poblaciones.sistema_con_desague_a_camara_septica"
            label="sistema con desague a camara septica"
                        mask="###.###.###.###.###.###.###.###.###.###.###.###.###"
                  reverse-fill-mask
                  unmasked-value
            :rules="[validaNumero]"
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            square
            v-model="poblaciones.banos_con_arrastre_de_agua"
            label="banos con arrastre de agua"
                        mask="###.###.###.###.###.###.###.###.###.###.###.###.###"
                  reverse-fill-mask
                  unmasked-value
            :rules="[validaNumero]"
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            square
            v-model="poblaciones.banos_secos_ecologicos"
            label="baños secos ecologicos"
                        mask="###.###.###.###.###.###.###.###.###.###.###.###.###"
                  reverse-fill-mask
                  unmasked-value
            :rules="[validaNumero]"
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            square
            v-model="poblaciones.letrina_con_descarga_a_pozo_de_absorcion"
            label="letrina con descarga a pozo de absorcion"
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
  name: "poblaciones",
  setup(props) {
    const _http = inject("http");
    const _message = inject("message");
    const url = ref("/proyectos/" + props.proyecto.id + "/poblaciones/");
    const alert = ref(false);
    const separator = ref("vertical"); //'Horizontal' 'cell' 'vertical' 'none'
    const isButtonDisabled = ref(false);
    const poblaciones = ref({
      agua_potable: null,
      pileta_publica: null,
      pozo_o_noria_con_bomba: null,
      pozo_o_noria_protegido: null,
      manantial_protegido: null,
      recoleccion_de_agua_de_lluvia: null,
      alcantarillado: null,
      alcantarillado_condominial: null,
      sistema_con_desague_a_camara_septica: null,
      banos_con_arrastre_de_agua: null,
      banos_secos_ecologicos: null,
      letrina_con_descarga_a_pozo_de_absorcion: null,
    });
    const form = ref(null);

    const actualizar = async () => {
      try {
        for (const clave in poblaciones.value) {
          if (poblaciones.value[clave] === "") poblaciones.value[clave] = null;
        }
        await _http.put(url.value, poblaciones.value);
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
            for (const clave in poblaciones.value) {
              if (poblaciones.value[clave] === "")
                poblaciones.value[clave] = null;
            }
            await _http.put(url.value, poblaciones.value);
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
      poblaciones.value = await _http.get(url.value);
      alert.value = false;
    };
    const goBack = () => {
      window.history.back();
    };

    onMounted(async () => {
      try {
        poblaciones.value = await _http.get(url.value);
      } catch (error) {
        isButtonDisabled.value = true;
        // _message.error("No existe relacion (antiguo)");
      }
    });

    return {
      validaNumero,
      form,
      poblaciones,
      alert,
      actualizar,
      separator,
      cancelar,
      isButtonDisabled,
      goBack,
      submitForm,
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
