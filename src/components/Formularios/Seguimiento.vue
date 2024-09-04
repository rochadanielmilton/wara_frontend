<template>
  <q-form class="row q-col-gutter-md" @submit="$emit('guardar')">
    <q-dialog v-model="showConfirmation">
      <q-card>
        <q-card-section>
          <div class="text-h6 text-weight-bold">Mensaje de Confirmación</div>
          <div>¿Estás seguro qué desea salir?</div>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn
            flat
            label="NO"
            color="primary"
            @click="showConfirmation = false"
          />
          <q-btn flat label="SI" color="negative" @click="$emit('quit')" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-select
      square
      :options="months"
      class="col-xs-12 col-md-6"
      label="MES"
      v-model="valoresModel.mes"
      :rules="[(val) => !!val || 'Campo requerido']"
      use-chips
    />

    <q-select
      square
      :options="years"
      class="col-xs-12 col-md-6"
      label="AÑO"
      v-model="valoresModel.anio"
      :rules="[(val) => !!val || 'Campo requerido']"
      use-chips
    />

    <q-input
      square
      class="col-xs-12 col-md-6"
      label="AVANCE FISICO DEL MES (%)"
      maxlength="3"
      v-model="valoresModel.porcentaje_avance_fisico_mes"
      :rules="[
        (val) =>
          (val > 0 && val <= 100 && !!val) || 'Valor debe ser entre 1 y 100',
      ]"
    />

    <q-input
      square
      v-model="valoresModel.avance_financiero_mes"
      class="col-xs-12 col-md-6"
      label="AVANCE FINANCIERO DEL MES (Bs.)"
      mask="###,###,###,###,###,###,###,###,###,###,###,###,###"
      prefix="Bs. "
      reverse-fill-mask
      :rules="[validate_8_financiero]"
    />
    <q-input
      v-model="valoresModel.detalle_seguimiento"
      square
      outlined
      class="col-xs-12 col-md-12"
      label="Escriba aquí los detalles del avance..."
      type="textarea"
      maxlength="250"
      counter
      :rules="[
        (val) => !!val || 'Este campo es requerido',
        (val) => (val && val.length >= 20) || 'Mínimo 20 caracteres',
        (val) => (val && val.length <= 250) || 'Máximo 250 caracteres',
      ]"
    />

    <q-file
      square
      v-model="valoresModel.documento_respaldo_avance"
      accept=".pdf"
      label="Archivo de Respaldo"
      class="col-xs-12 col-md-6"
      @rejected="mesaje_validacion"
      :max-file-size="maxFileSize"
      counter
    >
      <template v-slot:prepend>
        <q-icon name="picture_as_pdf" />
      </template>
    </q-file>

    <!-- <file-upload
      v-model:modelValue="valoresModel.documento_respaldo_avance"
      :accepted-file-types="'.pdf'"
      :max-file-size="5242880"
      :file-classes="['col-xs-12', 'col-md-6']"
      @rejected="validar"
      :hint="mensaje_archivo"
    /> -->

    <q-file
      square
      v-model="valoresModel.fotografia_1"
      accept=".jpg, .jpeg, .png"
      label="fotografia 1"
      class="col-xs-12 col-md-6"
      @rejected="onRejected"
      :max-file-size="maxFileSize"
      counter
    >
      <template v-slot:prepend>
        <q-icon name="cloud_upload" />
      </template>
    </q-file>

    <q-file
      square
      v-model="valoresModel.fotografia_2"
      accept=".jpg, .jpeg, .png"
      label="fotografia 2"
      class="col-xs-12 col-md-6"
      @rejected="onRejected"
      :max-file-size="maxFileSize"
      counter
    >
      <template v-slot:prepend>
        <q-icon name="cloud_upload" />
      </template>
    </q-file>

    <q-file
      square
      v-model="valoresModel.fotografia_3"
      accept=".jpg, .jpeg, .png"
      label="fotografia 3"
      class="col-xs-12 col-md-6"
      @rejected="onRejected"
      :max-file-size="maxFileSize"
      counter
    >
      <template v-slot:prepend>
        <q-icon name="cloud_upload" />
      </template>
    </q-file>

    <q-file
      square
      v-model="valoresModel.fotografia_4"
      accept=".jpg, .jpeg, .png"
      label="fotografia 4"
      class="col-xs-12 col-md-6"
      @rejected="onRejected"
      :max-file-size="maxFileSize"
      counter
    >
      <template v-slot:prepend>
        <q-icon name="cloud_upload" />
      </template>
    </q-file>

    <div class="col-xs-12 text-right">
      <q-btn
        class="q-ml-sm"
        icon="close"
        label="Cancelar"
        @click="showConfirmation = true"
      />

      <q-btn
        class="q-ml-sm"
        icon="check"
        color="primary"
        label="Guardar"
        type="submit"
      />
    </div>
  </q-form>
</template>
<script>
import { useVModel } from "../../composables/useVModel.js";
import { ref, inject, onMounted } from "vue";
import validaciones from "../../common/validations";
import IconListOriginal from "../../common/IconList";
import FileUpload from "src/components/atributos/FileUpload.vue";

const valoresRules = {
  porcentaje_avance_fisico_mes: [validaciones.requerido],
  avance_financiero_mes: [validaciones.requerido],

  fotografia_1: [validaciones.requerido],
  fotografia_2: [validaciones.requerido],
  fotografia_3: [validaciones.requerido],
  fotografia_4: [validaciones.requerido],
  documento_respaldo_avance: [validaciones.requerido],
  // porcentaje_avance_fisico_mes: [validaciones.requerido],
  // porcentaje_avance_fisico_mes: [validaciones.requerido],

  // ruta: [validaciones.requerido],
  // icono: [validaciones.requerido],
  // orden: [validaciones.requerido],
  // grupo: [validaciones.requerido],
};

export default {
  components: {
    FileUpload,
  },

  props: {
    valores: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const _message = inject("message");
    const valoresModel = useVModel(props, "valores");
    // console.log("propssss*****", props.proyecto);

    const menus = ref([]);
    const IconList = ref(IconListOriginal);
    const file = ref(null);
    const imageUrl = ref(null);
    const maxFileSize = 5 * 1024 * 1024; // 2 MB  // 2 * 1024 * 1024
    const showConfirmation = ref(false);
    const months = ref([]);
    const years = ref([]);
    const selectedYear = ref();
    const mensaje_archivo = ref("");

    const validar = (file) => {
      if (file && file.size > 5 * 1024 * 1024) {
        // 5 MB
        mensaje_archivo.value = "TAMAÑO MAXIMO 5 MB";
        file.value = null; // Limpiar el archivo seleccionado
        _message.error("AMAÑO MAXIMO 5 MB");
      } else {
        mensaje_archivo.value = "ARCHIVO NO PERMITIDO";
        _message.error("ARCHIVO NO PERMITIDO");
      }
    };

    const setYears = () => {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      years.value = [
        `${currentYear - 1}`,
        `${currentYear}`,
        `${currentYear + 1}`,
      ];

      // selectedYear.value = currentYear; // Set current year as default selected
    };

    const setMonths = () => {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth(); // 0-11, where 0 is January and 11 is December

      const monthsArray = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ];

      const previousMonth = (currentMonth + 11) % 12;
      const nextMonth = (currentMonth + 1) % 12;

      // months.value = [
      //   { label: monthsArray[previousMonth], value: previousMonth + 1 },
      //   { label: monthsArray[currentMonth], value: currentMonth + 1 },
      //   { label: monthsArray[nextMonth], value: nextMonth + 1 },
      // ];

      months.value = [
        monthsArray[previousMonth],
        monthsArray[currentMonth],
        monthsArray[nextMonth],
      ];

      // console.log(currentMonth);
      // valoresModel.value.mes = currentMonth + 1;
      // selectedMonth.value = currentMonth + 1; // Set current month as default selected
    };

    onMounted(async () => {
      // menus.value = await getMenus()
      // console.log('asdfasdf');
      // valoresModel
      setMonths();
      setYears();
    });

    const handleFileUpload = () => {
      // Obtener la URL de la imagen cargada
      imageUrl.value = URL.createObjectURL(files[0]);
    };

    const checkFileSize = (files) => {
      console.log(files.filter((file) => file.size < 2048));
    };

    const submitForm = async () => {
      const response = await this.sendFormData(this.formData);
      console.log("Form submitted successfully:", response.data);
    };

    const onSubmit = () => {
      console.log("aaaaaa:", file.value);
    };

    const onRejected = () => {
      _message.error("Tamaño imagen maximo: 5 MB y Formato: PNG , JPG , JPEG");
    };
    const mesaje_validacion = () => {
      _message.error("Tamaño imagen maximo: 5 MB");
    };

    const validateNumber = (val) => {
      if (!val) {
        return "El campo es requerido";
      }
      if (val.toString().length > 249) {
        return "no puede tener más de 250 caracteres";
      }
      return true;
    };

    const valido_250_max = (val) => {
      if (val.toString().length >= 250) {
        return "no puede tener más de 250 caracteres";
      }
      return true;
    };

    const validate_8_financiero = (val) => {
      if (!val) {
        return "El campo es requerido";
      }
      if (val.toString().length > 13) {
        return "no puede tener más de 8 caracteres";
      }
      return true;
    };

    return {
      setYears,
      years,
      setMonths,
      months,
      valido_250_max,
      validate_8_financiero,
      IconList,
      IconListOriginal,
      valoresModel,
      valoresRules,
      menus,
      file,
      imageUrl,
      onSubmit,
      submitForm,
      onRejected,
      checkFileSize,
      maxFileSize,
      mesaje_validacion,
      showConfirmation,
      validateNumber,
      validar,
      mensaje_archivo,
    };
  },
};
</script>

<style scoped>
.error-message {
  color: red;
  margin-top: 10px; /* Espaciado opcional */
}
.hint-error {
  color: red;
}
</style>
