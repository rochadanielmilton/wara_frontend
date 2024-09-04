<template>
  <div>
    <q-select
      v-model="modelValue"
      :options="options"
      :label="label"
      option-value="id"
      option-label="nombre"
      clearable
      @clear="clearSelection"
      filled
      :rules="rules"
    />
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "SelectComponent",
  props: {
    modelValue: {
      type: [String, Number, Object],
      default: null,
    },
    options: {
      type: Array,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    rules: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const clearSelection = () => {
      emit("update:modelValue", "");
    };

    return {
      modelValue: computed({
        get: () => props.modelValue,
        set: (val) => emit("update:modelValue", val),
      }),
      clearSelection,
    };
  },
});
</script>
