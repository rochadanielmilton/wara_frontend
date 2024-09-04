<template>
  <q-form class="row q-col-gutter-md" @submit="$emit('guardar')">
    <q-input
      square
      class="col-xs-12 col-md-6"
      label="viceministerio"
      v-model="valoresModel.viceministerio"
    />
    <q-input
      square
      class="col-xs-12 col-md-6"
      label="entidad_ejecutora"
      v-model="valoresModel.entidad_ejecutora"
    />
    <q-input
      square
      class="col-xs-12 col-md-6"
      label="co_ejecutor"
      v-model="valoresModel.co_ejecutor"
    />
    <q-input
      square
      class="col-xs-12 col-md-6"
      label="programas_proyectos"
      v-model="valoresModel.programas_proyectos"
    />
    <q-input
      square
      class="col-xs-12 col-md-6"
      label="sigla_del_prog_convenio"
      v-model="valoresModel.sigla_del_prog_convenio"
    />

    <q-input
      square
      class="col-xs-12 col-md-6"
      label="agencia_financiadora"
      v-model="valoresModel.agencia_financiadora"
    />
    <q-input
      square
      class="col-xs-12 col-md-6"
      label="descripcion_agencia_financiadora"
      v-model="valoresModel.descripcion_agencia_financiadora"
    />
    <q-input
      square
      class="col-xs-12 col-md-6"
      label="tipo_de_convenio"
      v-model="valoresModel.tipo_de_convenio"
    />
    <q-input
      square
      class="col-xs-12 col-md-6"
      label="documento_respaldo"
      v-model="valoresModel.documento_respaldo"
    />
    <q-input
      square
      class="col-xs-12 col-md-6"
      label="codigo_convenio_contrato"
      v-model="valoresModel.codigo_convenio_contrato"
    />
    <!-- <q-input
      square
      class="col-xs-12 col-md-6"
      label="tipo_de_financiamiento"
      v-model="valoresModel.tipo_de_financiamiento"
    /> -->
    <q-select
      v-model="select_tipo_de_financiamiento"
      label="tipo_de_financiamiento"
      :options="valoresModel.tipo_de_financiamiento"
      class="col-xs-12 col-md-6"
      square
    />



    <q-select
      v-model="selectsectorid"
      label="selectores"
      :options="valoresModel.sector"
      class="col-xs-12 col-md-6"
      square
    />
    <!-- <q-select v-model="model" :options="options" label="Standard" /> -->

    <!-- *****************faltan****************** -->
    <q-input
      v-model="valoresModel.fecha_suscripcion_convenio_contrato"
      square
      type="date"
      hint="fecha del contrato"
    />
    <q-input
      v-model="valoresModel.fecha_de_vencimiento"
      square
      type="date"
      hint="fecha vencimiento"
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
    const selectsectorid = ref('');
    const select_tipo_de_financiamiento = ref('');
    // const vvv = ref('asdfasdf');
    // const resp = await _http.get("/sectores/");
    // const sectoresOptions = ref([]);
    // const getpermisos = async () => {
    //   const resp = await _http.get("/sectores/");
    //   console.log(resp);
    // };

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
      filtrarOpciones,
      selectsectorid,
      select_tipo_de_financiamiento,
      // vvv,
    };
  },
};
</script>
