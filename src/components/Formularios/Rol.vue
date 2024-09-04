<template>
  <q-form class="row q-col-gutter-md" @submit="$emit('guardar')">
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Nombre"
      v-model="valoresModel.name"
      :rules="[validateNumber]"
    />
    <div class="col-xs-12 text-right">
      <q-btn
        class="q-ml-sm"
        icon="close"
        label="Cancelar"
        @click="$emit('cancelar')"
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
import { ref, onMounted } from "vue";
import validaciones from "../../common/validations";
import IconListOriginal from "../../common/IconList";

const valoresRules = {
  // name: [validaciones.requerido],
  // name222:[validaciones.maximo50],
};

export default {
  props: {
    valores: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    // const _http = inject('http')
    const valoresModel = useVModel(props, "valores");
    const IconList = ref(IconListOriginal);

    onMounted(async () => {});

    const validateNumber = (val) => {
      if (!val) {
        return "El campo es requerido";
      }
      if (val.toString().length > 49) {
        return "no puede tener más de 50 caracteres";
      }
      return true;
    };

    const filtrarOpciones = (val, update) => {
      if (val === "") {
        update(() => {
          IconList.value = IconListOriginal;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        IconList.value = IconListOriginal.filter((v) =>
          v.toLowerCase().includes(needle)
        );
      });
    };

    return {
      IconList,
      IconListOriginal,
      valoresModel,
      valoresRules,
      filtrarOpciones,
      validateNumber,

    };
  },
};
</script>
