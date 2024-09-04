<template>
  <q-form class="row q-col-gutter-md" @submit="$emit('guardar')">
    <!-- <q-btn label="prueba" @click="getgroups" /> -->

    <!-- <q-select v-model="model" :options="groupsOptions" label="Standard" /> -->
    <pre>Roles asignados:</pre>
    <q-select
      class="col-xs-12 col-md-12"
      v-model="selectgroups"
      :options="groupsOptions"
      @input="handleSelectChange"
      @update:model-value="handleSelectChange"
      label="Groups"
      option-value="id"
      option-label="name"
    />
    <pre>Menus Asignados:</pre>
    <q-select
      filled
      v-model="selectmenuid"
      :options="menuOptions"
      option-value="id"
      option-label="nombre"
      hint="Seleccionados"
      label="Menus"
      multiple
      emit-value
      map-options
      class="col-xs-12 col-md-12"
    >
      <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
        <q-item v-bind="itemProps">
          <q-item-section>
            <q-item-label v-html="opt.nombre" />
          </q-item-section>
          <q-item-section side>
            <q-toggle
              :model-value="selected"
              @update:model-value="toggleOption(opt)"
            />
          </q-item-section>
        </q-item>
      </template>
    </q-select>

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
import { ref, onMounted, inject } from "vue";
import validaciones from "../../common/validations";
import IconListOriginal from "../../common/IconList";

const valoresRules = {
  nombre: [validaciones.requerido],
  ruta: [validaciones.requerido],
  icono: [validaciones.requerido],
  orden: [validaciones.requerido],
  grupo: [validaciones.requerido],
};

export default {
  props: {
    valores: {
      type: Object,
      default: () => ({}),
    },
  },

  setup(props) {
    const _http = inject("http");
    const valoresModel = useVModel(props, "valores");

    const IconList = ref(IconListOriginal);
    const selectgroups = ref(null);
    const groupsOptions = ref([]);
    const menuOptions = ref([]);
    const selectmenuid = ref([]);
    const vectormenus = [ref([])];

    const getgroups = async () => {
      const aux = await _http.get("/groups/");
      console.log(aux.results);
      selectgroups.value = "Sin Rol";
      groupsOptions.value = aux.results;
    };

    const handleSelectChange = async (value) => { //value = valor de id seleccionado
      console.log(value.id);
      const aux = await _http.get(`/menu-group/`);
      console.log(aux.results);
      const vector = [];
      for (let i = 0; i < aux.results.length; i++) {
        if (value.id == aux.results[i].group_id)
          vector.push(aux.results[i].menu_id);
      }

      console.log("---", vector);
      selectmenuid.value = vector; // mostramos los valores ya asignados
      menuOptions.value = (await _http.get(`/menu/`)).results; //llenamos todos los menus
      console.log("****", selectmenuid);
      valoresModel.value.group_id = value.id;
      valoresModel.value.menu_id = selectmenuid;

      // valoresModel.value.menu_id = vector;

      // console.log(response);
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

    onMounted(() => {
      getgroups();
    });

    return {
      IconList,
      IconListOriginal,
      valoresModel,
      valoresRules,
      filtrarOpciones,
      getgroups,
      selectgroups,
      groupsOptions,
      handleSelectChange,
      menuOptions,
      selectmenuid,
      vectormenus,
    };
  },
};
</script>
