<template>
  <q-form class="row q-col-gutter-md" @submit="$emit('guardar')">
    <q-input
      square
      class="col-xs-12 col-md-3"
      label="Codigo sisin"
      hint="ej: 2233445500000"
      v-model="valoresModel.codigo_sisin"
      :rules="valoresRules.codigo_sisin"
    />
    <q-input
      square
      class="col-xs-12 col-md-3"
      label="Estado Detallado"
      v-model="valoresModel.estado_detallado"
      :rules="valoresRules.estado_detallado"
    />
    <q-input
      square
      class="col-xs-12 col-md-3"
      hint="Fecha Inicio"
      type="date"
      v-model="valoresModel.fecha_inicio"
      :rules="valoresRules.fecha_inicio"
    />
    <q-input
      square
      class="col-xs-12 col-md-3"
      hint="Fecha Conclusion"
      type="date"
      v-model="valoresModel.fecha_conclusion"
      :rules="valoresRules.fecha_conclusion"
    />
    <q-input
      square
      class="col-xs-12 col-md-3"
      hint="Fecha Conclusion de Obra"
      type="date"
      v-model="valoresModel.fecha_concl_obra"
      :rules="valoresRules.fecha_concl_obra"
    />

    <q-input
      square
      class="col-xs-12 col-md-3"
      label="Total Inversion"
      type="number"
      v-model="valoresModel.total_inversion"
      :rules="valoresRules.total_inversion"
    />
    <q-input
      square
      class="col-xs-12 col-md-3"
      label="Avance Fisico"
      hint="ej: 10, 50, 80, 100"
      type="number"
      maxlength="3"
      suffix="%"
      v-model="valoresModel.avance_fisico"
      :rules="[
        (val) => (val > 0 && val <= 100) || 'Valor debe ser entre 1 y 100',
      ]"
    />

    <q-input
      square
      class="col-xs-12 col-md-3"
      suffix="%"
      label="Avance Financiamiento"
      hint="ej: 10, 50, 80, 100"
      type="number"
      v-model="valoresModel.avance_financiamiento"
      :rules="[
        (val) => (val > 0 && val <= 100) || 'Valor debe ser entre 1 y 100',
      ]"
    />
    <q-input
      square
      class="col-xs-12 col-md-3"
      label="Inversion Presupuestada"
      type="number"
      v-model="valoresModel.inversion_presupuestada"
      :rules="valoresRules.inversion_presupuestada"
    />
    <q-input
      square
      class="col-xs-12 col-md-3"
      label="Saldo Presupuesto"
      type="number"
      v-model="valoresModel.saldo_presupuesto"
      :rules="valoresRules.saldo_presupuesto"
    />
    <q-input
      square
      class="col-xs-12 col-md-3"
      label="Conclusion Proyecto"
      type="date"
      v-model="valoresModel.conclusion_concl_proy"
      :rules="valoresRules.conclusion_concl_proy"
    />
    <q-input
      square
      class="col-xs-12 col-md-3"
      label="Contraparte Local"
      type="number"
      v-model="valoresModel.contraparte_local"
      :rules="valoresRules.contraparte_local"
    />
    <q-input
      square
      class="col-xs-12 col-md-3"
      label="Contraparte No Financiera"
      type="number"
      v-model="valoresModel.contraparte_local_no_financiera"
      :rules="valoresRules.contraparte_local_no_financiera"
    />
    <q-input
      square
      class="col-xs-12 col-md-3"
      label="Contratado"
      type="number"
      v-model="valoresModel.contratado"
      :rules="valoresRules.contratado"
    />

    <q-select
      :options="['PTAR Y ALCANTARILLADO', 'SIN PTAR', 'SOLO PTAR']"
      class="col-xs-12 col-md-3"
      label="Proyecto con Ptar"
      v-model="valoresModel.proyecto_cuenta_con_ptar"
    />

    <q-input
      square
      class="col-xs-12 col-md-3"
      label="Empleos Directos"
      type="number"
      v-model="valoresModel.empleos_directos"
      :rules="valoresRules.empleos_directos"
    />
    <q-input
      square
      class="col-xs-12 col-md-3"
      label="Empleos Indirectos"
      type="number"
      v-model="valoresModel.empleos_indirectos"
      :rules="valoresRules.empleos_indirectos"
    />
    <q-input
      square
      class="col-xs-12 col-md-3"
      label="Financiamiento Externo"
      type="number"
      v-model="valoresModel.financiamiento_externo"
      :rules="valoresRules.financiamiento_externo"
    />
    <q-input
      square
      class="col-xs-12 col-md-3"
      type="number"
      label="Nro. Familias Beneficiadas"
      v-model="valoresModel.nro_fam_benef"
      :rules="valoresRules.nro_fam_benef"
    />
    <q-input
      square
      class="col-xs-12 col-md-3"
      type="number"
      label="Nro. Familias Beneficiadas Indirectas"
      v-model="valoresModel.nro_fam_benef_indirectas"
      :rules="valoresRules.nro_fam_benef_indirectas"
    />
    <q-input
      square
      class="col-xs-12 col-md-3"
      label="Observacion"
      v-model="valoresModel.observacion"
      :rules="valoresRules.observacion"
    />
    <q-input
      square
      class="col-xs-12 col-md-3"
      label="Presupuesto Vapsb"
      type="number"
      v-model="valoresModel.presupuesto_vapsb"
      :rules="valoresRules.presupuesto_vapsb"
    />
    <q-input
      square
      class="col-xs-12 col-md-3"
      label="Superficie Riego Hectaria"
      type="number"
      v-model="valoresModel.sup_riego_ha"
      :rules="valoresRules.sup_riego_ha"
    />

    <q-input
      square
      class="col-xs-12 col-md-3"
      type="textarea"
      label="Tipo Proyecto Detallado"
      v-model="valoresModel.tipo_proyecto_detallado"
      :rules="valoresRules.tipo_proyecto_detallado"
    />

    <q-input
      square
      class="col-xs-12 col-md-3"
      label="Total Inversion Mil"
      type="number"
      v-model="valoresModel.total_inversion_mill"
      :rules="valoresRules.total_inversion_mill"
    />
    <q-input
      square
      class="col-xs-12 col-md-3"
      label="Tipo Conflicto"
      v-model="valoresModel.tipo_conflicto"
      :rules="valoresRules.tipo_conflicto"
    />
    <q-input
      square
      class="col-xs-12 col-md-3"
      label="Descripcion Conflicto"
      type="textarea"
      v-model="valoresModel.descripcion_conflicto"
      :rules="valoresRules.descripcion_conflicto"
    />
    <q-select
      :options="ejecutorOptions"
      class="col-xs-12 col-md-3"
      label="Ejecutor"
      option-value="id"
      option-label="nombre"
      v-model="valoresModel.ejecutor_model"
    />
    <q-select
      :options="lugarOptions"
      class="col-xs-12 col-md-3"
      label="Lugar"
      option-value="id"
      option-label="nombre"
      v-model="valoresModel.lugar_model"
    />

     <!-- <q-select
      :options="lugarOptions"
      class="col-xs-12 col-md-3"
      label="Lugar"
      option-value="id"
      option-label="nombre"
      v-model="valoresModel.lugar_model"
      :rules="[(val) => !!val || 'Elejir una opcion']"
    /> -->


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

const valoresRules = {
  aaaa: [validaciones.requerido],
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
    const ejecutorOptions = ref([]);
    const lugarOptions = ref([]);
    // console.log(valoresModel);

    async function getEjecutores() {
      const ejecutores = await _http.get("/ejecutores/");
      ejecutorOptions.value = ejecutores.results;

      // console.log("*******************", valoresModel.value);
      if (valoresModel.value.ejecutor != null) {
        const aaa = await _http.get("/ejecutores/" + valoresModel.value.ejecutor + "/"); //NOMBRE DEL EJECUTOR
        valoresModel.value.ejecutor_model = aaa.nombre;
      }

      const lugares = await _http.get("/lugares/");
      lugarOptions.value = lugares.results;

      if (valoresModel.value.ejecutor != null) {
        const bbb = await _http.get("/lugares/" + valoresModel.value.lugar + "/"); //NOMBRE DEL LUGARES
        valoresModel.value.lugar_model = bbb.nombre;
      }

    }

    onMounted(() => {
      getEjecutores();
    });

    return {
      valoresModel,
      valoresRules,
      getEjecutores,
      ejecutorOptions,
      lugarOptions,
    };
  },
};
</script>
