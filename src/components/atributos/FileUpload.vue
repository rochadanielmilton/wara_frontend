<template>
  <q-file
    filled
    v-model="localFileModel"
    :accept="acceptedFileTypes"
    label="Archivo de Respaldo"
    :class="fileClasses"
    @rejected="handleRejected"
    :max-file-size="maxFileSize"

    counter
  >
    <template v-slot:prepend>
      <q-icon name="attach_file" />
    </template>
    <template v-slot:append>
      <q-btn round dense flat icon="clear" @click="clearFile" />
    </template>
  </q-file>
</template>

<script>
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "FileUpload",
  props: {
    modelValue: {
      type: [File, null],
      default: null,
    },
    acceptedFileTypes: {
      type: String,
      default: ".pdf",
    },
    maxFileSize: {
      type: Number,
      default: 5242880, // Tamaño máximo en bytes (5MB)
    },
    fileClasses: {
      type: [String, Array],
      default: () => ["col-xs-12", "col-md-6"],
    }
  },
  setup(props, { emit }) {
    const localFileModel = ref(props.modelValue);

    watch(localFileModel, (newValue) => {
      emit("update:modelValue", newValue);
    });

    function handleRejected() {
      emit("rejected");
    }

    function clearFile() {
      localFileModel.value = null;
    }

    return {
      localFileModel,
      handleRejected,
      clearFile,
    };
  },
});
</script>

<style scoped>
/* Puedes agregar estilos específicos aquí si es necesario */
</style>
