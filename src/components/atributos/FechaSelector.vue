<template>
  <div>
    <q-input
      v-model="selectedDate"
      :label="label"
      readonly
      clearable
      @clear="clearDate"
    >
      <template v-slot:append>
        <q-icon name="event" @click="showStartDateDialog = true" />
        <!-- <q-icon name="close" class="cursor-pointer" @click="clearDate" /> -->
      </template>
    </q-input>

    <q-dialog v-model="showStartDateDialog">
      <q-card>
        <q-card-section>
          <q-date v-model="tempDate" locale="es" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancelar"
            v-close-popup
            @click="cerrarFechaModal"
          />
          <q-btn flat label="OK" @click="confirmStartDate" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref, watch, computed } from "vue";

export default {
  props: {
    value: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "Fecha",
    },
  },
  setup(props, { emit }) {
    const showStartDateDialog = ref(false);
    const tempDate = ref(props.value);

    const selectedDate = computed({
      get: () => props.value,
      set: (val) => emit("update:value", val),
    });

    const cerrarFechaModal = () => {
      showStartDateDialog.value = false;
    };

    const confirmStartDate = () => {
      // Formatear la fecha en YYYY-MM-DD
      const formattedDate = tempDate.value.split("/").join("-");
      emit("update:value", formattedDate);
      cerrarFechaModal();
    };

    const clearDate = () => {
      console.log("Fecha borrada");
      emit("update:value", "");
      tempDate.value = "";
    };

    watch(
      () => props.value,
      (newVal) => {
        tempDate.value = newVal;
      }
    );

    return {
      showStartDateDialog,
      tempDate,
      selectedDate,
      cerrarFechaModal,
      confirmStartDate,
      clearDate,
    };
  },
};
</script>
