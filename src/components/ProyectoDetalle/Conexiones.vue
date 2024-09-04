<template>
  <q-page>
    <div class="row justify-end">
      <q-btn
        @click="goBack"
        icon="arrow_back"
        label="Proyectos"
        color="primary"
        class="text-center"
      />
    </div>
    <div class="text-h4 q-mb-md"><q-icon name="clean_hands" />CONEXIONES</div>
    <!-- {{ proyecto?.id }} -->
    <q-form ref="form" @submit="submitForm" @reset="resetForm">
      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-6">
          <q-input
            mask="###.###.###.###.###.###.###.###.###.###.###.###.###"
                  reverse-fill-mask
                  unmasked-value
            square
            v-model="conexiones.agua_potable"
            label="Agua Potable"
            :rules="[validaNumero]"
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            mask="###.###.###.###.###.###.###.###.###.###.###.###.###"
                  reverse-fill-mask
                  unmasked-value
            square
            v-model="conexiones.pileta_publica"
            label="Pileta Publica"
            :rules="[validaNumero]"
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            mask="###.###.###.###.###.###.###.###.###.###.###.###.###"
                  reverse-fill-mask
                  unmasked-value
            square
            v-model="conexiones.pozo_o_noria_protegido"
            label="Pozo o Noria Protegido"
            :rules="[validaNumero]"
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            mask="###.###.###.###.###.###.###.###.###.###.###.###.###"
                  reverse-fill-mask
                  unmasked-value
            square
            v-model="conexiones.manantial_protegido"
            label="Manantial Protegido"
            :rules="[validaNumero]"
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            mask="###.###.###.###.###.###.###.###.###.###.###.###.###"
                  reverse-fill-mask
                  unmasked-value
            square
            v-model="conexiones.recoleccion_de_agua_de_lluvia"
            label="Recoleccion de Agua de Lluvia"
            :rules="[validaNumero]"
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            mask="###.###.###.###.###.###.###.###.###.###.###.###.###"
                  reverse-fill-mask
                  unmasked-value
            square
            v-model="conexiones.alcantarillado"
            label="Alcantarillado"
            :rules="[validaNumero]"
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            mask="###.###.###.###.###.###.###.###.###.###.###.###.###"
                  reverse-fill-mask
                  unmasked-value
            square
            v-model="conexiones.alcantarillado_condominial"
            label="Alcantarillado Condominial"
            :rules="[validaNumero]"
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            mask="###.###.###.###.###.###.###.###.###.###.###.###.###"
                  reverse-fill-mask
                  unmasked-value
            square
            v-model="conexiones.banos_con_arrastre_de_agua"
            label="Baños con arrastre de Agua"
            :rules="[validaNumero]"
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            mask="###.###.###.###.###.###.###.###.###.###.###.###.###"
                  reverse-fill-mask
                  unmasked-value
            square
            v-model="conexiones.banos_secos_ecologicos"
            label="Baños secos Ecologicos"
            :rules="[validaNumero]"
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            mask="###.###.###.###.###.###.###.###.###.###.###.###.###"
                  reverse-fill-mask
                  unmasked-value
            square
            v-model="conexiones.letrina_con_descarga_a_pozo_de_absorcion"
            label="Letrina con descarga a pozo de absorción"
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
import CrudTable from "@components/common/CrudTable";

export default {
  name: "Conexiones",
  setup(props) {
    const _http = inject("http");
    const _message = inject("message");
    const url = ref("/proyectos/" + props.proyecto.id + "/conexiones/");
    const alert = ref(false);
    const separator = ref("cell"); //'Horizontal' 'cell' 'vertical' 'none'
    const isButtonDisabled = ref(false);
    const conexiones = ref({
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
        for (const clave in conexiones.value) {
          if (conexiones.value[clave] === "") conexiones.value[clave] = null;
        }
        await _http.put(url.value, conexiones.value);
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
            for (const clave in conexiones.value) {
              if (conexiones.value[clave] === "")
                conexiones.value[clave] = null;
            }
            await _http.put(url.value, conexiones.value);
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
      conexiones.value = await _http.get(url.value);
      alert.value = false;
    };

    onMounted(async () => {
      try {
        conexiones.value = await _http.get(url.value);
      } catch (error) {
        isButtonDisabled.value = true;
        // _message.error("No existe relacion (antiguo)");
      } finally {
        return 0;
      }
    });

    const goBack = () => {
      // route.value.back();
      window.history.back();
    };
    return {
      form,
      submitForm,
      validaNumero,
      conexiones,
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
.full-width {
  width: 100%;
}
</style>
