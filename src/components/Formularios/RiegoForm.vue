<template>
  <div class="green-background">
    <q-form @submit.prevent="$emit('guardar')">
      <h6 style="text-align: center; margin-top: 0%">RIEGO</h6>
      <!-- Modal de confirmación de éxito -->
      <q-dialog v-model="showSuccess">
        <q-card>
          <q-card-section class="row items-center">
            <q-icon name="check_circle" color="green" />
            <span class="q-ml-md"
              >El fomurario se está guardando, por favor antes de cerrar este
              mensaje espere el mensaje de confirmación que aparecerá en la
              parte superior de la derecha.</span
            >
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              icon="close"
              v-if="showButton"
              @click="confirmar"
              label="Cerrar"
              color="primary"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>

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
      <div :class="{ 'form-disabled': isDisabled }">
        <q-stepper v-model="currentStep" animated>
          <q-step
            :name="1"
            done="currentStep > 1"
            icon="looks_one"
            title="Inf. del Proyecto"
          >
            <q-form ref="form1" @submit.prevent="nextStep" greedy>
              <div class="q-gutter-md row">
                <div class="col" v-if="!isMigrated">
                  <q-input
                    square
                    label="Codigo sisin riego"
                    v-model="valoresModel.codigo_sisin"
                    :rules="valoresRules.codigo_sisin"
                  />
                </div>

                <div class="col" v-else>
                  <q-input
                    square
                    label="Codigo sisin riego"
                    v-model="valoresModel.codigo_sisin"
                  />
                </div>
                <div class="col" v-if="!isMigrated">
                  <q-input
                    square
                    label="Nombre del Proyecto"
                    v-model="valoresModel.nombre"
                    :rules="valoresRules.nombre"
                  />
                </div>
                <div class="col" v-else>
                  <q-input
                    square
                    label="Nombre del Proyecto"
                    v-model="valoresModel.nombre"
                  />
                </div>
              </div>

              <q-col cols="12" md="12">
                <q-input
                  square
                  label="Objetivo"
                  v-model="valoresModel.objetivo"
                  type="textarea"
                />
              </q-col>

              <div class="q-gutter-md row">
                <div class="col" v-if="!isMigrated">
                  <q-select
                    square
                    label="GOBIERNO"
                    v-model="valoresModel.gobierno"
                    :options="gobiernoOptions"
                    :rules="valoresRules.gobierno"
                    use-chips
                  />
                </div>
                <div class="col" v-else>
                  <q-select
                    square
                    label="GOBIERNO"
                    v-model="valoresModel.gobierno"
                    :options="gobiernoOptions"
                    use-chips
                  />
                </div>
                <div class="col" v-if="!isMigrated">
                  <q-select
                    square
                    label="sector"
                    v-model="valoresModel.sector_clasificador_name"
                    :options="sector_clasificador"
                    option-value="id"
                    option-label="nombre"
                    :rule="valoresRules.sector"
                    @update:model-value="change_sector_clasificador"
                    use-chips
                  />
                </div>

                <div class="col" v-else>
                  <q-select
                    square
                    label="sector"
                    v-model="valoresModel.sector_clasificador_name"
                    :options="sector_clasificador"
                    option-value="id"
                    option-label="nombre"
                    @update:model-value="change_sector_clasificador"
                    use-chips
                  />
                </div>
              </div>
              <br />

              <div class="q-gutter-md row">
                <div class="col" v-if="!isMigrated">
                  <q-col cols="3" md="3">
                    <q-select
                      square
                      label="Sector-clasificador"
                      v-model="valoresModel.sector"
                      :options="sector"
                      option-value="id"
                      option-label="nombre"
                      use-chips
                      emit-value
                      map-options
                      :rules="valoresRules.estado"
                    />
                  </q-col>
                </div>
                <div class="col" v-else>
                  <q-col cols="3" md="3">
                    <q-select
                      square
                      label="Sector-clasificador"
                      v-model="valoresModel.sector"
                      :options="sector"
                      option-value="id"
                      option-label="nombre"
                      use-chips
                      emit-value
                      map-options
                    />
                  </q-col>
                </div>
                <div class="col">
                  <q-col cols="3" md="3">
                    <q-select
                      square
                      label="Programa del proyecto"
                      v-model="valoresModel.programa"
                      :options="programas"
                      option-value="id"
                      option-label="sigla_prog_convenio"
                      use-chips
                      emit-value
                      map-options
                      :rules="valoresRules.programa"
                    />
                  </q-col>
                </div>
                <div class="col">
                  <q-col cols="3" md="3">
                    <q-select
                      square
                      label="Viceministerio"
                      v-model="valoresModel.viceministerio"
                      :options="viceministerio"
                      option-value="id"
                      option-label="nombre"
                      use-chips
                      emit-value
                      map-options
                      :rules="valoresRules.estado"
                    />
                  </q-col>
                </div>

                <div class="col">
                  <q-col cols="3" md="3">
                    <q-select
                      square
                      label="Lugar del proyecto"
                      v-model="valoresModel.lugar"
                      :options="lugares"
                      option-value="id"
                      option-label="nombre"
                      use-chips
                      emit-value
                      map-options
                    />
                  </q-col>
                </div>
              </div>
              <br />
              <div class="q-gutter-md row">
                <div class="col">
                  <q-select
                    square
                    label="Organismo Financiador del proyecto"
                    v-model="valoresModel.organizacion"
                    :options="organizacion"
                    option-value="id"
                    option-label="sigla"
                    use-chips
                    emit-value
                    map-options
                  />
                </div>
                <div class="col">
                  <q-select
                    square
                    label="Ejecutor del Proyecto"
                    v-model="valoresModel.ejecutor"
                    class="col-xs-12 col-md-3"
                    :options="ejecutor"
                    option-value="id"
                    option-label="nombre"
                    use-chips
                    emit-value
                    map-options
                  />
                </div>
                <div class="col">
                  <q-select
                    square
                    label="Tipo de proyecto"
                    v-model="valoresModel.tipo"
                    :options="tipo"
                    option-value="id"
                    option-label="nombre"
                    use-chips
                    emit-value
                    map-options
                  />
                </div>
              </div>
              <br />
              <div class="q-gutter-md row">
                <div class="col">
                  <q-select
                    v-model="valoresModel.ucep_responsable"
                    square
                    class="col-xs-12 col-md-3"
                    :options="ucep"
                    label="UCEP Responsable"
                    option-value="id"
                    option-label="nombre"
                    use-chips
                    emit-value
                    map-options
                  />
                </div>
                <div class="col" v-if="!isMigrated">
                  <q-select
                    square
                    label="Estado del Proyecto"
                    v-model="valoresModel.estado"
                    :options="estado"
                    option-value="id"
                    option-label="nombre"
                    use-chips
                    emit-value
                    map-options
                    :rules="valoresRules.estado"
                  />
                </div>
                <div class="col" v-else>
                  <q-select
                    square
                    label="Estado del Proyecto"
                    v-model="valoresModel.estado"
                    :options="estado"
                    option-value="id"
                    option-label="nombre"
                    use-chips
                    emit-value
                    map-options
                  />
                </div>
                <div class="col" v-if="!isMigrated">
                  <q-select
                    square
                    label="Estado detallado"
                    v-model="valoresModel.estado_detallado"
                    :options="estado_detallado"
                    option-value="nombre"
                    option-label="nombre"
                    use-chips
                    emit-value
                    map-options
                  />
                </div>

                <div class="col" v-else>
                  <q-input
                    square
                    type="textarea"
                    label="Estado Detallado"
                    v-model="valoresModel.estado_detallado"
                    hint="Estado Detallado"
                  />
                </div>
              </div>

              <div class="q-gutter-md row">
                <div class="col">
                  <q-input
                    square
                    label="LATITUD"
                    v-model="valoresModel.latitud"
                    type="number"
                    :disable="true"
                  />
                </div>
                <div class="col">
                  <q-input
                    square
                    label="LONGITUD"
                    v-model="valoresModel.longitud"
                    type="number"
                    :disable="true"
                  />
                </div>
              </div>
            </q-form>
          </q-step>
          <q-step
            :name="2"
            done="currentStep > 2"
            icon="looks_two"
            title="Beneficios"
          >
            <q-form ref="form2" @submit.prevent="nextStep">
              <div class="q-gutter-md row">
                <div class="col">
                  <FechaSelector
                    v-model:value="valoresModel.fecha_inicio"
                    label="Fecha de Inicio"
                  />
                </div>

                <div class="col">
                  <FechaSelector
                    v-model:value="valoresModel.fecha_conclusion"
                    label="Fecha de fecha conclusion"
                  />
                </div>
              </div>

              <q-col cols="12" md="12">
                <q-input
                  square
                  label="DETALLE DEL PROYECTO"
                  v-model="valoresModel.detalle"
                  type="textarea"
                />
              </q-col>
              <q-col cols="12" md="12">
                <q-input
                  square
                  label="OBSERVACIONES"
                  v-model="valoresModel.observaciones"
                  type="textarea"
                />
              </q-col>
            </q-form>
          </q-step>

          <q-step
            :name="3"
            done="currentStep > 3"
            icon="looks_4"
            title="Inf. Efemérides"
          >
            <q-form ref="form4" @submit.prevent="$emit('guardar')">
              <q-file
                v-model="valoresModel.imagen_proyecto"
                accept=".jpg, .jpeg, .png"
                label="fotografia del proyecto"
                class="col-xs-12 col-md-6"
                @rejected="onRejected"
                :max-file-size="maxFileSize"
                counter
                @update:model-value="onFileChange"
              >
                <template v-slot:prepend>
                  <q-icon name="cloud_upload" />
                </template>
              </q-file>
              <q-banner
                v-if="message"
                :class="
                  messageType === 'success'
                    ? 'bg-green-2 text-green-8'
                    : 'bg-red-2 text-red-8'
                "
                class="q-mt-md"
              >
                <q-icon
                  :name="messageType === 'success' ? 'check_circle' : 'error'"
                  class="q-mr-xs"
                />
                {{ message }}
              </q-banner>

              <img
                v-if="valoresModel.imagen_proyecto && estado_imagen == true"
                :src="valoresModel.imagen_proyecto"
                class="table-image"
              />

              <q-file
                v-model="valoresModel.documento_creacion"
                accept=".pdf"
                label="Archivo de Respaldo"
                class="col-xs-12 col-md-6"
                @rejected="mensaje_error_documento"
                :max-file-size="maxFileSize"
                counter
                @update:model-value="change_documento"
              >
                <template v-slot:prepend>
                  <q-icon name="picture_as_pdf" />
                </template>
              </q-file>

              <q-banner
                v-if="message_archivo"
                :class="
                  messageType_archivo === 'success'
                    ? 'bg-green-2 text-green-8'
                    : 'bg-red-2 text-red-8'
                "
                class="q-mt-md"
              >
                <q-icon
                  :name="
                    messageType_archivo === 'success' ? 'check_circle' : 'error'
                  "
                  class="q-mr-xs"
                />
                {{ message_archivo }}
              </q-banner>

              <template
                v-if="
                  valoresModel.documento_creacion && estado_documento == true
                "
              >
                <q-btn
                  label="VER ARCHIVO DE RESPALDO"
                  icon="download"
                  color="primary"
                  @click="downloadFile"
                  class="table-image"
                />
              </template>

              <hr />

              <q-input
                square
                label="Programado para entrega por efeméride"
                v-model="valoresModel.programado_para_entrega_por_efemeride"
                type="text"
              />
              <br />

              <!-- <q-input
                  square
                  label="Estado reportado por sector para efeméride"
                  v-model="valoresModel.estado_reportado_por_el_sector_para_efemeride"
                  type="text"
                /> -->

              <q-checkbox
                v-model="valoresModel.emblematico"
                label="Proyecto es Emblemático"
              />
            </q-form>
          </q-step>
        </q-stepper>
      </div>
      <div class="text-right q-mt-md">
        <q-btn
          class="q-ml-sm"
          icon="close"
          label="Cancelar"
          @click="showConfirmation = true"
          v-if="isModal"
          :class="{ 'form-disabled': isDisabled }"
        />
        <q-btn
          v-if="currentStep > 1"
          class="q-ml-sm"
          icon="arrow_back"
          label="Anterior"
          @click="previousStep"
        />
        <q-btn
          v-if="currentStep < 3"
          class="q-ml-sm"
          icon="arrow_forward"
          color="primary"
          label="Siguiente"
          @click="submitStepForm"
        />
        <q-btn
          v-if="currentStep === 3"
          class="q-ml-sm"
          icon="check"
          color="primary"
          label="Guardar"
          type="submit"
          @click="showSuccess = true"
          :class="{ 'form-disabled': isDisabled }"
        />
      </div>
    </q-form>
  </div>
</template>

<script>
import { ref, onMounted, inject, toRefs, getCurrentInstance, watch } from "vue";
import { useVModel } from "../../composables/useVModel.js";
import validaciones from "../../common/validations";
import { estados } from "src/constants/estados.js";
import FechaSelector from "src/components/atributos/FechaSelector.vue";

export default {
  components: {
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
    proyecto: {
      type: Object,
      required: true,
    },
    denominativoEjecutivo: {
      type: String,
      default: null,
    },
    denoVicemin: {
      type: String,
      default: null,
    },
    sectorClasificador: {
      type: String,
      default: null,
    },
    programaId: {
      type: String,
      default: null,
    },
    datos_actualizados: {
      type: Object,
      default: "",
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    datos_actualizados(newVal) {
      Object.assign(this.valoresModel, newVal); //copia el objeto recibido al local
      this.estado_documento = true; //para visualizar el boton de descarga
      this.estado_imagen = true; //para visualizar la imagen
      this.message = "";
      this.message_archivo = "";
    },
  },

  setup(props) {
    const _message = inject("message");
    const message = ref("");
    const { isMigrated } = toRefs(props);
    const maxFileSize = 5 * 1024 * 1024; // 2 MB  // 2 * 1024 * 1024
    const { isModal } = toRefs(props);
    const file = ref(null);
    const _http = inject("http");
    const currentStep = ref(1);
    const valoresModel = useVModel(props, "valores");
    const gobiernoOptions = ref(["LUIS ARCE", "EVO MORALES", "OTRO"]);
    const messageType = ref("");
    const message_archivo = ref("");
    const messageType_archivo = ref("");
    const estado_documento = ref(true);
    const estado_imagen = ref(true);
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
    const showSuccess = ref(false);
    const showButton = ref(false);

    const showStartDateCifDialog = ref(false);
    const preinversion = ref([]);
    const sector_clasificador = ref([]);
    const sub_sector_clasificador = ref([]);

    const mensaje_error_documento = () => {
      message_archivo.value =
        "Error al cargar el archivo. Maximo 5 Mb, formato aceptado .PDF";
      messageType_archivo.value = "error";
      valoresModel.value.documento_creacion = "";
    };

    const change_documento = () => {
      if (valoresModel.value.documento_creacion) {
        message_archivo.value = "Archivo cargado correctamente.";
        messageType_archivo.value = "success";
        estado_documento.value = false;
      }
    };
    const onFileChange = () => {
      if (valoresModel.value.imagen_proyecto) {
        message.value = "Archivo cargado correctamente.";
        messageType.value = "success";
        estado_imagen.value = false;
      }
    };

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

    const refs = {
      form1: ref(null),
      form2: ref(null),
      form3: ref(null),
      form4: ref(null),
    };

    onMounted(async () => {
      try {
        fetchOptions();
        console.log("al abrir riego", valoresModel.value);
        if (valoresModel.value.sector != undefined) {
          const response = await _http.get(
            `/sector-detallado/${valoresModel.value.sector}/`
          );
          lugares.value = response.lugares;
          ejecutor.value = response.ejecutores;
          programas.value = response.programas;
        }

        if (valoresModel.value.estado) {
          estado_detallado.value = [];
          estado_detallado.value = (
            await _http.get(
              `/estados-detallados/?estado_id=${valoresModel.value.estado}`
            )
          ).results;
        }
      } catch (error) {
        console.log(error);
      }
    });

    watch(
      () => valoresModel.value.estado,
      async (newEstado) => {
        if (!newEstado) {
          return;
        }
        valoresModel.value.estado_detallado = null;
        estado_detallado.value = [];
        estado_detallado.value = (
          await _http.get(`/estados-detallados/?estado_id=${newEstado}`)
        ).results;
      }
    );

    if (props.programaId) {
      watch(
        () => valoresModel.value.sector,
        async (newSector) => {
          if (!newSector) {
            lugares.value = [];
            ejecutor.value = [];
            valoresModel.value.lugar = null;
            valoresModel.value.ejecutor = null;
            return;
          }
          const response = await _http.get(`/sector-detallado/${newSector}/`);
          lugares.value = response.lugares;
          ejecutor.value = response.ejecutores;
          console.log("por trueeee");
        }
      );
    } else {
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
    }

    const change_sector_clasificador = () => {
      //activar la secuencia con sub_sector_clasificador
      valoresModel.value.sector_clasificador =
        valoresModel.value.sector_clasificador_name.id;
    };

    const change_sub_sector_clasificador = () => {
      //activar la lista siguiente...
      valoresModel.value.sub_sector_clasificador =
        valoresModel.value.sub_sector_clasificador_name.id;
    };

    const fetchOptions = async () => {
      try {
        const [l, s, o, e, t, c, es, u, p, v, et, sec, sec_cla, prei] =
          await Promise.all([
            _http.get("/lugares_select/"),
            _http.get("/sectores_select/"),
            _http.get("/organizaciones-financieras_select/"),
            _http.get("/ejecutores_select/"),
            _http.get("/tipos-proyecto_select/"),
            _http.get("/empresa-constructora_select/"),
            _http.get(
              `/estados_select/?tipo_migrado=${
                isMigrated.value ? "migrado" : "nuevo"
              }`
            ),
            _http.get("/ucep-responsables_select/"),
            _http.get("/programas_select/"),
            _http.get("/viceministerios_select/"),
            _http.get("/estados-detallados_select/?estado_id=1"),
            _http.get("/sector-clasificador/"),
            _http.get("/sub-sector-clasificador/"),
            _http.get("/proyectos-preinversion_select/"),
            //ADICIONAR SECTORRRRR
          ]);
        lugares.value = l.results;
        sector.value = s.results;
        if (props.denominativoEjecutivo)
          sector.value = s.results.filter(
            (s) => s.nombre == props.denominativoEjecutivo
          );
        organizacion.value = o.results;
        ejecutor.value = e.results;
        tipo.value = t.results;
        constructora.value = c.results;
        estado.value = es.results;
        ucep.value = u.results;
        programas.value = p.results;
        if (props.programaId)
          programas.value = p.results.filter((v) => v.id == props.programaId);
        viceministerio.value = v.results;
        if (props.denoVicemin)
          viceministerio.value = v.results.filter(
            (v) => v.nombre == props.denoVicemin
          );
        // estado_detallado.value = et.results;
        sector_clasificador.value = sec.results;
        if (props.sectorClasificador)
          sector_clasificador.value = sec.results.filter(
            (v) => v.nombre == props.sectorClasificador
          );
        sub_sector_clasificador.value = sec_cla.results;
        preinversion.value = prei.results;
      } catch (error) {
        console.error("Error loading options:", error);
      }
    };

    const checkFileSize = (files) => {
      console.log(files.filter((file) => file.size < 2048));
    };

    const submitForm = async () => {
      console.log("guardarrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
      const response = await this.sendFormData(this.formData);
      console.log("Form submitted successfully:", response.data);
    };

    const onSubmit = () => {
      console.log("aaaaaa:", file.value);
    };

    const onRejected = () => {
      message.value =
        "Error al cargar el archivo. Maximo 5 Mb, formato aceptado .PNG .JPG . JPEG";
      messageType.value = "error";
      valoresModel.value.imagen_proyecto = "";
    };
    const mesaje_validacion = () => {
      _message.error("Tamaño imagen maximo: 5 MB");
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
    const confirmar = () => {
      currentStep.value = 1;
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

    const goBack = () => {
      // route.value.back();
      window.history.back();
    };

    const submitStepForm = () => {
      const form = refs[`form${currentStep.value}`].value;
      console.log(
        "guardarrrrrrrrrrrrrrrrrrrrrrrrrrrrr$$$$$",
        currentStep.value
      );
      if (!form) return;
      form.validate().then((isValid) => {
        if (isValid) {
          nextStep();
        }
      });
    };

    const downloadFile = () => {
      window.open(valoresModel.value.documento_creacion, "_blank");
    };

    return {
      showButton,
      showSuccess,
      confirmar,
      downloadFile,
      preinversion,
      goBack,
      file,
      onSubmit,
      onFileChange,
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
      showStartDateCifDialog,
      nextStep,
      previousStep,
      submitStepForm,
      isModal,
      estado_detallado,
      ...refs,
      isMigrated,
      gobiernoOptions,
      sector_clasificador,
      sub_sector_clasificador,
      change_sector_clasificador,
      change_sub_sector_clasificador,
      message,
      messageType,
      change_documento,
      message_archivo,
      messageType_archivo,
      estado_documento,
      estado_imagen,
    };
  },
  mounted() {
    // Usamos setTimeout para cambiar la variable showButton después de 3 segundos
    setTimeout(() => {
      this.showButton = true;
    }, 5000); // 3000 milisegundos = 3 segundos
  },
};
</script>

<style scoped>
.green-background {
  background-color: #d1ebd6; /* color verde claro */
  padding: 20px; /* añade padding si lo deseas */
  border-radius: 5px; /* opcional: bordes redondeados */
}

.q-stepper {
  margin-bottom: 10px;
}

.q-stepper .q-select {
  width: auto;
}

.input-nomal .q-input {
  width: 500;
}

.table-image {
  display: block;
  margin: 0 auto;
  width: 50%;
  max-width: 250px;
  height: auto; /* Maintains the aspect ratio */
  /* Optional: Adjust the vertical alignment if needed */
}
.form-disabled {
  pointer-events: none;
  /* opacity: 0.5; */
}
</style>
