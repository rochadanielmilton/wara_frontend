<template>
  <q-form @submit.prevent="$emit('guardar')">
    <q-dialog v-model="showConfirmation">
      <q-card>
        <q-card-section>
          <div class="text-h6 text-weight-bold">Mensaje de Confirmación</div>
          <div>¿Estás seguro qué desea salir?</div>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn flat label="NO" color="primary" @click="showConfirmation = false" />
          <q-btn flat label="SI" color="negative" @click="$emit('quit')" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="showConfirmation2">
      <q-card>
        <q-card-section>
          <div class="text-h6">Confirmación</div>
          <div>¿Estás seguro de que quieres guardar los Registros?</div>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn flat label="NO" color="primary" @click="showConfirmation2 = false" />
          <q-btn flat label="SI" color="negative" @click="$emit('quit')" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-stepper v-model="currentStep" animated>
      <q-step :name="1" done="currentStep > 1" icon="looks_one" title="Inf. del Proyecto">
        <q-form ref="form1" @submit.prevent="nextStep">
          <div class="q-gutter-md row">
            <div class="col">
              <q-input square label="Codigo sisin" v-model="valoresModel.codigo_sisin" :rules="[
                (val) =>
                  val.length <= 30 ||
                  'Como maximo solo debe tener  30 carácteres.',
              ]" />
            </div>
            <div class="col">
              <q-input square label="Nombre del Proyecto" v-model="valoresModel.nombre" :rules="[
                (val) =>
                  val.length <= 220 ||
                  'Como maximo solo debe tener  220 carácteres.',
              ]" required />
            </div>
          </div>
          <div class="q-gutter-md row">
            <div class="col">
              <q-col cols="6" md="12">
                <q-input square label="Descripción del proyecto" v-model="valoresModel.detalle" :rules="[
                  (val) =>
                    val.length <= 300 ||
                    'Como maximo solo debe tener  300 carácteres.',
                ]" type="textarea" />
              </q-col>
            </div>
            <div class="col">
              <q-col cols="6" md="12">
                <q-input square label="Objetivo del proyecto" v-model="valoresModel.objetivo" type="textarea" :rules="[
                  (val) =>
                    val.length <= 300 ||
                    'Como maximo solo debe tener  300 carácteres.',
                ]" />
              </q-col>
            </div>
          </div>
          <div class="q-gutter-md row">
            <div class="col">
              <q-col cols="3" md="3">
                <q-select square label="Sector del proyecto" v-model="valoresModel.sector" :options="sector"
                  option-value="id" option-label="nombre" use-chips emit-value map-options
                  :rules="valoresRules.nombre" />
              </q-col>
            </div>
            <div class="col">
              <q-col cols="3" md="3">
                <q-select square label="Programa del proyecto" v-model="valoresModel.programa" :options="programas"
                  option-value="id" option-label="sigla_prog_convenio" use-chips emit-value map-options />
              </q-col>
            </div>
            <div class="col">
              <q-col cols="3" md="3">
                <q-select square label="Viceministerio" v-model="valoresModel.viceministerio" :options="viceministerio"
                  option-value="id" option-label="nombre" use-chips emit-value map-options />
              </q-col>
            </div>

            <div class="col">
              <q-col cols="3" md="3">
                <q-select square label="Lugar del proyecto" v-model="valoresModel.lugar" :options="lugares"
                  option-value="id" option-label="nombre" use-chips emit-value map-options />
              </q-col>
            </div>
          </div>
          <div class="q-gutter-md row">
            <div class="col">
              <q-select square label="Organismo Financiador del proyecto" v-model="valoresModel.organizacion"
                :options="organizacion" option-value="id" option-label="sigla" use-chips emit-value map-options />
            </div>
            <div class="col">
              <q-select square label="Ejecutor del Proyecto" v-model="valoresModel.ejecutor" class="col-xs-12 col-md-3"
                :options="ejecutor" option-value="id" option-label="nombre" use-chips emit-value map-options
                :rules="valoresRules.nombre" />
            </div>
            <div class="col">
              <q-select square label="Tipo de proyecto" v-model="valoresModel.tipo" :options="tipo" option-value="id"
                option-label="nombre" use-chips emit-value map-options />
            </div>
          </div>
          <div class="q-gutter-md row">
            <div class="col">
              <q-select v-model="valoresModel.empresa_constructora" square :options="constructora"
                label="Empresa Constructora" option-value="id" option-label="nombre" use-chips emit-value map-options />
            </div>
            <div class="col">
              <q-select v-model="valoresModel.ucep_responsable" square class="col-xs-12 col-md-3" :options="ucep"
                label="UCEP Responsable" option-value="id" option-label="nombre" use-chips emit-value map-options />
            </div>
            <div class="col">
              <q-select square label="Estado del Proyecto" v-model="valoresModel.estado" :options="estado"
                option-value="id" option-label="nombre" use-chips emit-value map-options :rules="valoresRules.nombre" />
            </div>
            <div class="col" v-if="!isMigrated">
              <q-select square label="Estado detallado" v-model="valoresModel.estado_detallado"
                :options="estado_detallado" option-value="nombre" option-label="nombre" use-chips emit-value map-options
                :rules="valoresRules.nombre" />
            </div>

            <div class="col" v-else>
              <q-input square type="textarea" label="Estado Detallado" v-model="valoresModel.estado_detallado"
                hint="Estado Detallado" :rules="valoresRules.estado_detallado" />
            </div>
          </div>
        </q-form>
      </q-step>
      <q-step :name="2" done="currentStep > 2" icon="looks_two" title="Inf. de Fechas">
        <q-form ref="form2" @submit.prevent="nextStep">
          <div class="q-gutter-md row">
            <div class="col">
              <q-input v-model="valoresModel.fecha_inicio" label="Fecha de Inicio del proyecto" readonly>
                <q-icon name="event" @click="showStartDateDialog = true" />
              </q-input>
              <q-dialog v-model="showStartDateDialog">
                <q-card>
                  <q-card-section>
                    <q-date v-model="startDate" />
                  </q-card-section>
                  <q-card-actions align="right">
                    <q-btn flat label="Cancelar" v-close-popup @click="cerrarFechaModal" />
                    <q-btn flat label="OK" @click="confirmStartDate" />
                  </q-card-actions>
                </q-card>
              </q-dialog>
            </div>
            <div class="col">
              <q-input v-model="valoresModel.fecha_conclusion" label="Fecha de Conclusión del proyecto"
                readonly>
                <q-icon name="event" @click="showEndDateDialog = true" />
              </q-input>
              <q-dialog v-model="showEndDateDialog">
                <q-card>
                  <q-card-section>
                    <q-date v-model="endDate" />
                  </q-card-section>
                  <q-card-actions align="right">
                    <q-btn flat label="Cancelar" v-close-popup @click="cerrarFechaModal" />
                    <q-btn flat label="OK" @click="confirmEndDate" />
                  </q-card-actions>
                </q-card>
              </q-dialog>
            </div>
          </div>
          <div class="q-gutter-md row">
            <div class="col">
              <q-input v-model="valoresModel.fecha_inicio_cif" label="Fecha de Inicio del convenio"
                :rules="[validateDate]" readonly>
                <q-icon name="event" @click="showStartDateCifDialog = true" />
              </q-input>
              <q-dialog v-model="showStartDateCifDialog">
                <q-card>
                  <q-card-section>
                    <q-date v-model="startDateCif" />
                  </q-card-section>
                  <q-card-actions align="right">
                    <q-btn flat label="Cancelar" v-close-popup @click="cerrarFechaModal" />
                    <q-btn flat label="OK" @click="confirmStartDateCif" />
                  </q-card-actions>
                </q-card>
              </q-dialog>
            </div>
            <div class="col">
              <q-input v-model="valoresModel.fecha_fin_cif" label="Fecha de Finalización del convenio"
                :rules="[validateDate]" readonly>
                <q-icon name="event" @click="showEndDateCifDialog = true" />
              </q-input>
              <q-dialog v-model="showEndDateCifDialog">
                <q-card>
                  <q-card-section>
                    <q-date v-model="endDateCif" />
                  </q-card-section>
                  <q-card-actions align="right">
                    <q-btn flat label="Cancelar" v-close-popup @click="cerrarFechaModal" />
                    <q-btn flat label="OK" @click="confirmEndDateCif" />
                  </q-card-actions>
                </q-card>
              </q-dialog>
            </div>
          </div>
        </q-form>
      </q-step>

      <q-step :name="3" done="currentStep > 3" icon="looks_4" title="Inf. Efemérides">
        <q-form ref="form4" @submit.prevent="$emit('guardar')">
          <q-file v-model="valoresModel.imagen_proyecto" accept=".jpg, .jpeg, .png" label="fotografia del proyecto"
            class="col-xs-12 col-md-6" @rejected="onRejected" :max-file-size="maxFileSize" counter
            @update:model-value="onFileChange">
            <template v-slot:prepend>
              <q-icon name="cloud_upload" />
            </template>
          </q-file>

          <q-input square label="Programado para entrega por efeméride"
            v-model="valoresModel.programado_para_entrega_por_efemeride" type="text" />
          <br />

          <q-input square label="Estado reportado por sector para efeméride"
            v-model="valoresModel.estado_reportado_por_el_sector_para_efemeride" type="text" />

          <q-checkbox v-model="valoresModel.emblematico" label="Proyecto es Emblemático" />
        </q-form>
      </q-step>
    </q-stepper>

    <div class="text-right q-mt-md">
      <q-btn class="q-ml-sm" icon="close" label="Cancelar" @click="showConfirmation = true" v-if="isModal" />
      <q-btn v-if="currentStep > 1" class="q-ml-sm" icon="arrow_back" label="Anterior" @click="previousStep" />
      <q-btn v-if="currentStep < 3" class="q-ml-sm" icon="arrow_forward" color="primary" label="Siguiente"
        @click="submitStepForm" />
      <q-btn v-if="currentStep === 3" class="q-ml-sm" icon="check" color="primary" label="Guardar" type="submit" />
    </div>
  </q-form>
</template>

<script>
import { ref, onMounted, inject, toRefs, getCurrentInstance, watch } from "vue";
import { useVModel } from "../../composables/useVModel.js";
import validaciones from "../../common/validations";
import { estados } from "src/constants/estados.js";

export default {
  props: {
    valores: {
      type: Object,
      default: () => ({}),
    },
    isModal: {
      type: Boolean,
      default: false,
    },
    isMigrated: {
      type: Boolean,
    },
  },
  setup(props) {
    const { isMigrated } = toRefs(props);
    const imageUrl = ref(null);
    const maxFileSize = 5 * 1024 * 1024; // 2 MB  // 2 * 1024 * 1024
    const { isModal } = toRefs(props);
    const file = ref(null);
    const _http = inject("http");
    const currentStep = ref(1);
    const valoresModel = useVModel(props, "valores");
    const valoresRules = {
      codigo_sisin: [validaciones.requerido],
      nombre: [validaciones.requerido],
      detalle: [validaciones.requerido],
      objetivo: [validaciones.requerido],
      programa: [validaciones.requerido],
      lugar: [validaciones.requerido],
      sector: [validaciones.requerido],

      ejecutor: [validaciones.requerido],
      tipo: [validaciones.requerido],
      estado: [validaciones.requerido],

      fecha_inicio: [validaciones.requerido],
      // step 3
      //total_inversion: [validaciones.requerido],
      //bol: [validaciones.requerido],
      //ppcr: [validaciones.requerido],
      //financiamiento_pncol: [validaciones.requerido],
      // step 4
    };

    const lugares = ref([]);
    const sector = ref([]);
    const organizacion = ref([]);
    const ejecutor = ref([]);
    const tipo = ref([]);
    const estado = ref(estados);
    const estado_detallado = ref([]);
    const constructora = ref([]);
    const ucep = ref([]);
    const programas = ref([]);
    const viceministerio = ref([]);
    const showConfirmation = ref(false);
    const showStartDateDialog = ref(false);
    const showEndDateDialog = ref(false);
    const startDate = ref("");
    const endDate = ref("");

    const showStartDateCifDialog = ref(false);
    const showEndDateCifDialog = ref(false);
    const startDateCif = ref("");
    const endDateCif = ref("");

    const refs = {
      form1: ref(null),
      form2: ref(null),
      form3: ref(null),
      form4: ref(null),
    };

    onMounted(async () => {
      fetchOptions();
    });

    watch(
      () => valoresModel.value.estado,
      async (newEstado) => {
        if (!newEstado) {
          estado_detallado.value = [];
          valoresModel.value.estado_detallado = null;
          return;
        }
        const response = await _http.get(
          `/estados-detallados/?estado_id=${newEstado}`
        );
        estado_detallado.value = response.results;
      }
    );

    watch(
      () => valoresModel.value.sector,
      async (newSector) => {
        if (!newSector) {
          lugares.value = [];
          ejecutor.value = [];
          programas.value = [];
          valoresModel.value.lugar = null;
          valoresModel.value.ejecutor = null;
          valoresModel.value.programa = null;
          return;
        }
        const response = await _http.get(`/sector-detallado/${newSector}/`);
        lugares.value = response.lugares;
        ejecutor.value = response.ejecutores;
        programas.value = response.programas;
      }
    );

    const fetchOptions = async () => {
      try {
        const [l, s, o, e, t, c, es, u, p, v, et] = await Promise.all([
          _http.get("/lugares_select/"),
          _http.get("/sectores_select/"),
          _http.get("/organizaciones-financieras_select/"),
          _http.get("/ejecutores_select/"),
          _http.get("/tipos-proyecto_select/"),
          _http.get("/empresa-constructora_select/?limit=15"),
          _http.get(`/estados_select/?tipo_migrado=${isMigrated.value ? 'migrado' : 'nuevo'}`),
          _http.get("/ucep-responsables_select/"),
          _http.get("/programas_select/"),
          _http.get("/viceministerios_select/"),
          _http.get("/estados-detallados_select/?estado_id=1")
        ]);
        lugares.value = l.results;
        sector.value = s.results;
        organizacion.value = o.results;
        ejecutor.value = e.results;
        tipo.value = t.results;
        constructora.value = c.results;
        estado.value = es.results;
        ucep.value = u.results;
        programas.value = p.results;
        viceministerio.value = v.results;
        estado_detallado.value = et.results;
      } catch (error) {
        console.error("Error loading options:", error);
      }
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

    const guardar = () => {
      console.log("Saving data");
    };

    const confirmStartDate = () => {
      valoresModel.value.fecha_inicio = startDate.value.replaceAll("/", "-");
      showStartDateDialog.value = false;
    };

    const confirmEndDate = () => {
      valoresModel.value.fecha_conclusion = endDate.value.replaceAll("/", "-");
      showEndDateDialog.value = false;
    };

    const cerrarFechaModal = () => {
      showStartDateCifDialog.value = false;
    };

    const confirmStartDateCif = () => {
      valoresModel.value.fecha_inicio_cif = startDateCif.value.replaceAll(
        "/",
        "-"
      );
      showStartDateCifDialog.value = false;
    };

    const confirmEndDateCif = () => {
      valoresModel.value.fecha_fin_cif = endDateCif.value.replaceAll("/", "-");
      showEndDateCifDialog.value = false;
    };

    const validateDate = (val) => {
      if (!val) {
        return true;
      }
      const date = new Date(val);
      if (isNaN(date)) {
        return "Fecha inválida";
      }
      const today = new Date();
      const oneMonthBefore = new Date(today);
      const oneMonthAfter = new Date(today);
      oneMonthBefore.setMonth(today.getMonth() - 1);
      oneMonthAfter.setMonth(today.getMonth() + 1);
      console.log(oneMonthBefore);
      if (date < oneMonthBefore || date > oneMonthAfter) {
        return `La fecha debe estar entre ${oneMonthBefore
          .toISOString()
          .substring(0, 10)} y ${oneMonthAfter.toISOString().substring(0, 10)}`;
      }
      return true;
    };

    const validafechacorrecta = (val) => {
      const date = new Date(val);
      if (isNaN(date)) {
        return "Fecha inválida";
      }
    };

    const nextStep = () => {
      if (currentStep.value < 4) {
        currentStep.value++;
      }
    };

    const previousStep = () => {
      if (currentStep.value > 1) {
        currentStep.value--;
      }
    };

    const submitStepForm = () => {
      const form = refs[`form${currentStep.value}`].value;
      // console.log('fffff',form);
      if (!form) return;
      form.validate().then((isValid) => {
        if (isValid) {
          nextStep();
        }
      });
    };

    return {
      file,
      imageUrl,
      onSubmit,
      // onFileChange,
      submitForm,
      onRejected,
      checkFileSize,
      maxFileSize,
      mesaje_validacion,
      validateDate,
      validafechacorrecta,
      showConfirmation,
      currentStep,
      valoresModel,
      valoresRules,
      lugares,
      programas,
      sector,
      organizacion,
      ejecutor,
      tipo,
      estado,
      constructora,
      ucep,
      viceministerio,
      showStartDateDialog,
      showEndDateDialog,
      startDate,
      endDate,
      cerrarFechaModal,
      showStartDateCifDialog,
      showEndDateCifDialog,
      startDateCif,
      endDateCif,
      guardar,
      confirmStartDate,
      confirmEndDate,
      confirmStartDateCif,
      confirmEndDateCif,
      nextStep,
      previousStep,
      submitStepForm,
      isModal,
      estado_detallado,
      ...refs,
      isMigrated,
    };
  },
};
</script>

<style scoped>
.q-stepper {
  margin-bottom: 10px;
}

.q-stepper .q-select {
  width: auto;
}

.input-nomal .q-input {
  width: 500;
}
</style>
