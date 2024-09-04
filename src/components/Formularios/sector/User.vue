<template>
  <q-form class="row q-col-gutter-md" @submit="$emit('guardar')" greedy>
    <q-input
      square
      class="col-xs-12 col-md-6"
      label="Nombre"
      v-model="valoresModel.first_name"
      :rules="valoresRules.first_name"
    />

    <q-input
      square
      class="col-xs-12 col-md-6"
      label="Apellido Paterno"
      v-model="valoresModel.last_name"
      :rules="valoresRules.last_name"
    />
    <q-input
      square
      class="col-xs-12 col-md-6"
      label="Apellido Materno"
      v-model="valoresModel.second_last_name"
      :rules="valoresRules.second_last_name"
    />
    <q-input
      square
      class="col-xs-12 col-md-6"
      label="Usuario"
      v-model="valoresModel.username"
      :rules="valoresRules.username"
    />
    <q-input
      square
      class="col-xs-12 col-md-6"
      label="email"
      v-model="valoresModel.email"
      :rules="valoresRules.email"
    />

    <q-input
      square
      class="col-xs-12 col-md-6"
      label="Contraseña"
      v-model="valoresModel.password"
      :rules="valoresRules.password"
      type="password"
    />

    <div v-for="(messages, field) in errors" :key="field">
      <q-alert
        v-for="(message, index) in messages"
        :key="index"
        color="red"
        icon="warning"
      >
        <div style="color: red">{{ message }}</div>
      </q-alert>
    </div>

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
import { useVModel } from "../../../composables/useVModel.js";
import { ref, toRef, computed } from "vue";
import validaciones from "../../../common/validations.js";
import IconListOriginal from "../../../common/IconList.js";
import { estados } from "src/constants/estados.js";

export default {
  props: {
    valores: {
      type: Object,
      default: () => ({}),
    },
    errors: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const errors = toRef(props, "errors");
    const valoresModel = useVModel(props, "valores");
    const menus = ref([]);
    const IconList = ref(IconListOriginal);

    const valoresRules = computed(() => {
      const rules = {
        first_name: [validaciones.requerido],
        last_name: [validaciones.requerido],
        second_last_name: [],
        username: [validaciones.requerido, validaciones.minimoOcho],
        email: [validaciones.requerido, validaciones.email],
        password: [validaciones.requerido, validaciones.contrasena],
      };

      if (valoresModel.value.id) {
        rules.password = [];
      }

      return rules;
    });

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
      errors,
      IconList,
      IconListOriginal,
      valoresModel,
      valoresRules,
      menus,
      filtrarOpciones,
      estados,
    };
  },
};
</script>
