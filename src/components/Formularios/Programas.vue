<template>
  <q-form @submit.prevent="submit">
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
    <q-dialog v-model="showConfirmation2">
      <q-card>
        <q-card-section>
          <div class="text-h6">Confirmación</div>
          <div>¿Estás seguro de que quieres guardar los Registros?</div>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn
            flat
            label="NO"
            color="primary"
            @click="showConfirmation2 = false"
          />
          <q-btn flat label="SI" color="negative" @click="$emit('quit')" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-stepper v-model="currentStep" animated>
      <q-step
        :name="1"
        done="currentStep > 1"
        icon="looks_one"
        title="PROGRAMA"
      >
        <q-form ref="form1" @submit.prevent="nextStep" greedy>
          <div class="q-gutter-md row">
            <div class="col">
              <q-input
                square
                v-model="valoresModel.programas_proyectos"
                label="NOMBRE"
                :rules="[(val) => !!val || 'Este campo es requerido']"
              />
            </div>

            <div class="col">
              <q-input
                square
                v-model="valoresModel.sigla_prog_convenio"
                label="SIGLA"
                :rules="valoresRules.sigla_prog_convenio"
              />
            </div>
          </div>
          <q-col cols="12" md="12">
            <q-input
              square
              v-model="valoresModel.detallado_descripcion"
              label="DETALLE DESCRIPCION"
              type="textarea"
            />
          </q-col>
          <br />
          <div class="q-gutter-md row">
            <div class="col">
              <q-input
                square
                v-model="valoresModel.codigo_convenio"
                label="CODIGO  CONVENIO/CONTRATO"
                :rules="[(val) => !!val || 'Este campo es requerido']"
              />
            </div>

            <div class="col">
              <SelectComponent
                v-model="valoresModel.viceministerio"
                :options="viceministerio"
                label="VICEMINISTERIO"
                :rules="[(val) => !!val || 'Este campo es requerido']"
              />

              <!-- <q-select
                square
                label="sector"
                v-model="valoresModel.sector_clasificador_name"
                :options="sector_clasificador"
                option-value="id"
                option-label="nombre"
                :rule="valoresRules.sector"
                @update:model-value="change_sector_clasificador"
              /> -->
            </div>
          </div>
          <br />
          <div class="q-gutter-md row">
            <div class="col">
              <SelectComponent
                v-model="valoresModel.entidad_ejecutora"
                :options="entidad_ejecutora"
                label="ENTIDAD EJECUTORA"
              />
            </div>

            <div class="col">
              <SelectComponent
                v-model="valoresModel.co_ejecutor"
                :options="entidad_ejecutora"
                label="CO EJECUTOR"
              />
            </div>
          </div>
        </q-form>
      </q-step>
      <q-step
        :name="2"
        done="currentStep > 2"
        icon="looks_two"
        title="FINANCIADORES"
      >
        <q-form ref="form2" @submit.prevent="nextStep" greedy>
          <div class="q-gutter-md row">
            <div class="col">
              <SelectComponent
                v-model="valoresModel.agencia_financiadora"
                :options="agencia_financiadora"
                label="AGENCIA FINANCIADORA"
              />
            </div>

            <div class="col">
              <q-input
                square
                v-model="valoresModel.descripcion_agencia_financiadora"
                label="DESCRIPCIÓN AGENCIA FINANCIADORA"
              />
            </div>
          </div>
          <br />
          <div class="q-gutter-md row">
            <div class="col">
              <SelectComponent
                v-model="valoresModel.tipo_financiamiento"
                :options="tipo_financiamiento"
                label="TIPO DE FINANCIAMIENTO"
              />
            </div>

            <div class="col">
              <SelectComponent
                v-model="valoresModel.tipo_convenio"
                :options="tipo_de_convenio"
                label="TIPO DE CONVENIO"
              />
            </div>

            <!-- <div class="col">
              <file-upload
                v-model:modelValue="valoresModel.documento_respaldo"
                :accepted-file-types="'.pdf'"
                :max-file-size="1048576"
                :file-classes="['col-xs-12', 'col-md-6']"
                @rejected="validar_rechazo"
                @uploaded="validar_aceptado"
                :hint="mensaje_archivo"
              />
            </div> -->
          </div>
        </q-form>
      </q-step>
      <q-step
        :name="3"
        done="currentStep > 3"
        icon="looks_3"
        title="AREA DE INTERVENCIÓN"
      >
        <q-form ref="form3" @submit.prevent="nextStep" greedy>
          <div class="q-gutter-md row">
            <div class="col">
              <q-select
                v-model="valoresModel.departamentos_field"
                :options="departamentos"

                label="DEPARTAMENTO"
              />
              <!-- <SelectComponent
                v-model="valoresModel.departamentos_field"
                label="DEPARTAMENTO"
                :options="departamentos"
              /> -->
            </div>

            <div class="col">
              <q-input
                square
                v-model="valoresModel.municpios"
                label="MUNICIPIOS"
                hint="ej: Nivel Nacional, el alto, warnes..."
              />
            </div>
            <div class="col">
              <q-select
                square
                v-model="valoresModel.sectores"
                label="SECTOR"
                :options="sector_ids"
                option-value="id"
                option-label="nombre"
                multiple
                use-chips
                emit-value
                map-options
              />
            </div>

            <!-- <div class="col">
              <SelectComponent
                v-model="valoresModel.sectores_model"
                label="SECTOR"
                :options="sector_ids"
                :rules="[(val) => !!val || 'Este campo es requerido']"
              />
            </div> -->

            <!-- <div class="col">
              <q-input
                square
                v-model="valoresModel.subsector"
                label="SUBSECTOR"
              />
            </div> -->
          </div>
        </q-form>
      </q-step>
      <q-step :name="4" done="currentStep > 4" icon="looks_3" title="FECHAS">
        <q-form ref="form4" @submit.prevent="nextStep" greedy>
          <div class="q-gutter-md row">
            <!-- <div class="col">
              <q-input
                v-model="valoresModel.fecha_suscripcion_convenio_contrato"
                label="FECHA SUSCRIPCION CONVENIO/ CONTRATO"
                readonly
              >
                <q-icon name="event" @click="showStartDateDialog = true" />
              </q-input>
              <q-dialog v-model="showStartDateDialog">
                <q-card>
                  <q-card-section>
                    <q-date v-model="startDate" />
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
            </div> -->

            <div class="col">
              <FechaSelector
                v-model:value="valoresModel.fecha_suscripcion_convenio_contrato"
                label="FECHA SUSCRIPCIÓN CONVENIO/CONTRATO"
              />
            </div>

            <!-- <div class="col">
              <q-input
                v-model="valoresModel.fecha_vencimiento"
                label="FECHA DE VENCIMIENTO"
                readonly
              >
                <q-icon
                  name="event"
                  @click="showfechavencimientodialog = true"
                />
              </q-input>
              <q-dialog v-model="showfechavencimientodialog">
                <q-card>
                  <q-card-section>
                    <q-date v-model="startfecha_vencimiento" />
                  </q-card-section>
                  <q-card-actions align="right">
                    <q-btn
                      flat
                      label="Cancelar"
                      v-close-popup
                      @click="cerrarfecha_vencimiento"
                    />
                    <q-btn flat label="OK" @click="confirmfecha_vencimiento" />
                  </q-card-actions>
                </q-card>
              </q-dialog>
            </div> -->

            <div class="col">
              <FechaSelector
                v-model:value="valoresModel.fecha_vencimiento"
                label="FECHA DE VENCIMIENTO"
              />
            </div>

            <!-- <div class="col">
              <q-input
                square
                v-model="valoresModel.nueva_fecha_vencimiento"
                label="NUEVA FECHA DE VENCIMIENTO"
                type="date"
              />
            </div> -->
          </div>
        </q-form>
      </q-step>
      <!-- <q-step :name="5" done="currentStep > 5" icon="looks_4" title="OBJETIVOS">
        <q-form ref="form5" @submit.prevent="$emit('guardar')" greedy>
          <div class="q-gutter-md row">
            <div class="col">
              <q-input
                square
                v-model="valoresModel.n_ptap"
                label="N° PTAP"
                mask="###,###,###,###,###,###,###,###,###,###,###,###,###"
                reverse-fill-mask
              />
            </div>
            <div class="col">
              <q-input
                square
                v-model="
                  valoresModel.n_habitantes_con_acceso_a_saneamiento_basico
                "
                label="N° DE HABITANTES CON ACCESO A SANEAMIENTO BASICO"
                mask="###,###,###,###,###,###,###,###,###,###,###,###,###"
                reverse-fill-mask
              />
            </div>
          </div>
          <br />
          <div class="q-gutter-md row">
            <div class="col">
              <q-input
                square
                v-model="valoresModel.indicadores_programa_psdi_pdes"
                label="INDICADORES DEL PROGRAMA ( PSDI - PDES)"
                mask="###,###,###,###,###,###,###,###,###,###,###,###,###"
                reverse-fill-mask
              />
            </div>
            <div class="col">
              <q-input
                square
                v-model="valoresModel.estado_situacion_programa_field"
                label="ESTADO DE SITUACION DEL PROGRAMA"
              />
            </div>
          </div>
        </q-form>
      </q-step> -->
    </q-stepper>

    <div class="text-right q-mt-md">
      <q-btn
        class="q-ml-sm"
        icon="close"
        label="Cancelar"
        @click="showConfirmation = true"
        v-if="isModal"
      />
      <q-btn
        v-if="currentStep > 1"
        class="q-ml-sm"
        icon="arrow_back"
        label="Anterior"
        @click="previousStep"
      />
      <q-btn
        v-if="currentStep < 4"
        class="q-ml-sm"
        icon="arrow_forward"
        color="primary"
        label="Siguiente"
        @click="submitStepForm"
      />
      <q-btn
        v-if="currentStep === 4"
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
import { ref, onMounted, inject, toRefs, getCurrentInstance, watch } from "vue";
import { useVModel } from "../../composables/useVModel.js";
import validaciones from "../../common/validations";
import { estados } from "src/constants/estados.js";
// import SelectComponent from "src/coSelectComponent.vue";
import SelectComponent from "src/components/atributos/SelectComponent.vue";
import FileUpload from "src/components/atributos/FileUpload.vue";
import FechaSelector from "src/components/atributos/FechaSelector.vue";
export default {
  components: {
    SelectComponent,
    FileUpload,
    FechaSelector,
  },
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
  setup(props, ctx) {
    const _message = inject("message");
    const { isMigrated } = toRefs(props);

    const { isModal } = toRefs(props);
    const _http = inject("http");
    const currentStep = ref(1);
    const valoresModel = useVModel(props, "valores");
    const valoresRules = {
      viceministerio: [validaciones.requerido],
      sigla_prog_convenio: [validaciones.requerido],
    };
    const mensaje_archivo = ref("");
    const aaaaa = ref();
    const lugares = ref([]);
    const sector_ids = ref([]);
    const agencia_financiadora = ref([]);
    const entidad_ejecutora = ref([]);
    const tipo = ref([]);
    const estado = ref(estados);
    const estado_detallado = ref([]);
    const constructora = ref([]);
    const tipo_financiamiento = ref([]);
    const ucep = ref([]);
    const programas = ref([]);
    const viceministerio = ref([]);
    const showConfirmation = ref(false);
    const showStartDateDialog = ref(false);
    const showEndDateDialog = ref(false);
    const startDate = ref("");
    const endDate = ref("");
    const co_ejecutor= ref([]);
    const departamentos = ref([]);
    const sectorOptions = ref([
      "RESIDUOS",
      "CUENCAS",
      "AGUA Y SANEAMIENTO",
      "RIEGO",
    ]);

    const tipo_de_convenio = ["CONTRATO DE PRÉSTAMO","PROYECTO","PROGRAMA-NUEVO", "PROGRAMA"];

    const showStartDateCifDialog = ref(false);
    const showEndDateCifDialog = ref(false);
    const startDateCif = ref("");
    const endDateCif = ref("");
    const showfechavencimientodialog = ref(false);
    const startfecha_vencimiento = ref("");
    const selectedValue = ref(null);

    const handleSelectChange = (value) => {
      console.log(value);
    };
    const refs = {
      form1: ref(null),
      form2: ref(null),
      form3: ref(null),
      form4: ref(null),
      form5: ref(null),
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
        const [l, s, o, e, t, c, es, u, p, v, et, tf, dep] = await Promise.all([
          _http.get("/lugares/"),
          _http.get("/sectores/"),
          _http.get("/organizaciones-financieras/"),
          _http.get("/ejecutores/"),
          _http.get("/tipos-proyecto/"),
          _http.get("/empresa-constructora/?limit=15"),
          _http.get(
            `/estados/?tipo_migrado=${isMigrated.value ? "migrado" : "nuevo"}`
          ),
          _http.get("/ucep-responsables/"),
          _http.get("/programas/"),
          _http.get("/viceministerios_select/"),
          _http.get("/estados-detallados/?estado_id=1"),
          _http.get("/tipos-financiamiento_select/"),
          _http.get("/departamentos_select/"),
        ]);
        lugares.value = l.results;
        sector_ids.value = s.results;
        agencia_financiadora.value = o.results.map((item) => item.sigla);

        entidad_ejecutora.value = e.results.map((item) => item.nombre);
        tipo.value = t.results;
        constructora.value = c.results;
        estado.value = es.results;
        sectorOptions.value = sector_ids.results;
        valoresModel.value.sectores = valoresModel.value.sectores?.map(
          (s) => s.id
        );
        sectorOptions.value = sector_ids.results;

        ucep.value = u.results;
        programas.value = p.results;
        viceministerio.value = v.results.map((item)=>item.nombre);
        estado_detallado.value = et.results;
        tipo_financiamiento.value = tf.results.map((item) => item.nombre);
        departamentos.value = dep.results.map((item) => item.nombre);

 console.log("departamentos", departamentos);
        console.log("valoresmodal", valoresModel);
        console.log("sector_ids", sector_ids.value);
      } catch (error) {
        console.error("Error loading options:", error);
      }
    };

    const clearSelection = () => {
      valoresModel.value.entidad_ejecutora = "";
    };

    const submit = () => {
      valoresModel.value.sector_ids = valoresModel.value.sectores;
      ctx.emit("guardar");
    };

    const guardar = () => {
      console.log("Saving data");
    };

    const validar_rechazo = (file) => {
      _message.error("TAMAÑO MAXIMO 5 MB o FORMATO PDF");

      if (file && file.size > 5 * 1024 * 1024) {
        // 5 MB
        mensaje_archivo.value = "TAMAÑO MAXIMO 5 MB";
        file.value = null; // Limpiar el archivo seleccionado
        _message.error("TAMAÑO MAXIMO 5 MB");
      } else {
        // mensaje_archivo.value = "ARCHIVO NO PERMITIDO";
        // _message.error("ARCHIVO NO PERMITIDO");
      }
    };

    const validar_aceptado = (file) => {
      mensaje_archivo.value = "";
    };

    const confirmStartDate = () => {
      valoresModel.value.fecha_suscripcion_convenio_contrato =
        startDate.value.replaceAll("/", "-");
      showStartDateDialog.value = false;
    };

    const confirmEndDate = () => {
      valoresModel.value.fecha_conclusion = endDate.value.replaceAll("/", "-");
      showEndDateDialog.value = false;
    };
    const confirmfecha_vencimiento = () => {
      valoresModel.value.fecha_vencimiento =
        startfecha_vencimiento.value.replaceAll("/", "-");
      showfechavencimientodialog.value = false;
    };

    const cerrarFechaModal = () => {
      showfechavencimientodialog.value = false;
      // showStartDateCifDialog.value = false;
    };

    const cerrarfecha_vencimiento = () => {
      showStartDateDialog.value = false;
      // showStartDateCifDialog.value = false;
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

    const nextStep = () => {
      if (currentStep.value < 5) {
        currentStep.value++;
      }
    };

    const previousStep = () => {
      if (currentStep.value > 1) {
        currentStep.value--;
      }
    };

    const submitStepForm = () => {
      console.log(currentStep.value);
      const form = refs[`form${currentStep.value}`].value;
      console.log(form);
      if (!form) return;
      form.validate().then((isValid) => {
        if (isValid) {
          nextStep();
        }
      });
    };

    return {
      co_ejecutor,
      validar_rechazo,
      showConfirmation,
      currentStep,
      valoresModel,
      valoresRules,
      lugares,
      programas,
      sector_ids,
      sectorOptions,
      agencia_financiadora,
      entidad_ejecutora,
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
      submit,
      isModal,
      estado_detallado,
      ...refs,
      isMigrated,
      tipo_financiamiento,
      showfechavencimientodialog,
      startfecha_vencimiento,
      cerrarfecha_vencimiento,
      confirmfecha_vencimiento,
      clearSelection,
      handleSelectChange,
      aaaaa,
      mensaje_archivo,
      validar_aceptado,
      departamentos,
      tipo_de_convenio,
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
