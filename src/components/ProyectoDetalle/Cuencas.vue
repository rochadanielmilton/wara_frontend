<template>
  <q-page>
    <div class="row justify-end">
      <q-btn
        @click="goBack"
        icon="arrow_back"
        label="Volver"
        color="primary"
        class="text-center"
      />
    </div>
    <div class="text-h4 q-mb-md">Información Generalss</div>
    <div>
      <q-form @submit.prevent="$emit('guardar')">
        <!-- <q-form @submit.prevent="guardar()"> -->

        <q-stepper v-model="currentStep" animated class="pagina-con-fondo">
          <q-step
            :name="1"
            done="currentStep > 1"
            icon="looks_one"
            title="Inf. del Proyecto"
          >
            <q-form ref="form1" @submit.prevent="nextStep" greedy>
              <div class="q-gutter-md row">
                <!-- <div class="col">
                                <q-select square label="Codigo Convenio" v-model="Convenio"
                                    :options="preinversion" option-value="id" option-label="codigo_convenio" />
                            </div> -->

                <div class="col" v-if="!isMigrated">
                  <q-input
                    square
                    label="Codigo sisin riego"
                    v-model="valores.codigo_sisin"
                    :rules="valoresRules.codigo_sisin"
                  />
                </div>

                <div class="col" v-else>
                  <q-input
                    square
                    label="Codigo sisin riego"
                    v-model="valores.codigo_sisin"
                  />
                </div>
                <div class="col" v-if="!isMigrated">
                  <q-input
                    square
                    label="Nombre del Proyecto"
                    v-model="valores.nombre"
                    :rules="valoresRules.nombre"
                  />
                </div>
                <div class="col" v-else>
                  <q-input
                    square
                    label="Nombre del Proyecto"
                    v-model="valores.nombre"
                  />
                </div>
              </div>

              <br />

              <q-col cols="12" md="12">
                <q-input
                  square
                  label="OBSERVACIONES"
                  v-model="valores.observaciones"
                  type="textarea"
                />
              </q-col>
              <br />
              <div class="q-gutter-md row">
                <div class="col">
                  <q-select
                    square
                    label="GOBIERNO"
                    v-model="valores.gobierno"
                    :options="gobiernoOptions"
                  />
                </div>

                <div class="col">
                  <!-- adicionar lista anidada -->
                  <q-select
                    square
                    label="sector"
                    v-model="valores.sector_clasificador_name"
                    :options="sector_clasificador"
                    option-value="id"
                    option-label="nombre"
                    @update:model-value="change_sector_clasificador"
                  />
                </div>
                <!-- <div class="col">
                <q-select square label="sub_sector" v-model="valores.sub_sector_clasificador_name"
                  :options="sub_sector_clasificador" option-value="id" option-label="nombre"/>
              </div> -->
              </div>
              <br />

              <div class="q-gutter-md row">
                <div class="col">
                  <q-col cols="3" md="3">
                    <q-select
                      square
                      label="Sector-clasificador"
                      v-model="valores.sector"
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
                      v-model="valores.programa"
                      :options="programas"
                      option-value="id"
                      option-label="sigla_prog_convenio"
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
                      label="Viceministerio"
                      v-model="valores.viceministerio"
                      :options="viceministerio"
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
                      label="Lugar del proyecto"
                      v-model="valores.lugar"
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
              <div class="q-gutter-md row">
                <div class="col">
                  <q-select
                    square
                    label="Organismo Financiador del proyecto"
                    v-model="valores.organizacion"
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
                    v-model="valores.ejecutor"
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
                    v-model="valores.tipo"
                    :options="tipo"
                    option-value="id"
                    option-label="nombre"
                    use-chips
                    emit-value
                    map-options
                  />
                </div>
              </div>
              <div class="q-gutter-md row">
                <div class="col">
                  <q-select
                    square
                    label="Estado del Proyecto"
                    v-model="valores.estado"
                    :options="estado"
                    option-value="id"
                    option-label="nombre"
                    use-chips
                    emit-value
                    map-options
                    :rules="valoresRules.nombre"
                  />
                </div>
                <div class="col" v-if="!isMigrated">
                  <q-select
                    square
                    label="Estado detallado"
                    v-model="valores.estado_detallado"
                    :options="estado_detallado"
                    option-value="nombre"
                    option-label="nombre"
                    use-chips
                    emit-value
                    map-options
                    :rules="valoresRules.nombre"
                  />
                </div>

                <div class="col" v-else>
                  <q-input
                    square
                    type="textarea"
                    label="Estado Detallado"
                    v-model="valores.estado_detallado"
                    hint="Estado Detallado"
                    :rules="valoresRules.estado_detallado"
                  />
                </div>
              </div>
              <div class="q-gutter-md row">
                <div class="col">
                  <q-input
                    square
                    label="LATITUD"
                    v-model="valores.latitud"
                    type="number"
                    :disable="true"
                  />
                </div>
                <div class="col">
                  <q-input
                    square
                    label="LONGITUD"
                    v-model="valores.longitud"
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
            title="fechas/indicadores"
          >
            <q-form ref="form2" @submit.prevent="nextStep">
              <!-- FECHAS -->
              <p><b>FECHAS</b></p>
              <div class="q-gutter-md row">
                <div class="col">
                  <q-input
                    v-model="valores.fecha_inicio"
                    label="Fecha de Inicio"
                    readonly
                    @click="showStartDateDialog = true"
                  >
                    <template v-slot:append>
                      <q-icon
                        name="event"
                        @click="showEndDateCifDialog = true"
                        size="20px"
                      />
                    </template>
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
                </div>
                <div class="col">
                  <q-input
                    v-model="valores.fecha_conclusion"
                    label="Fecha de Conclusión"
                    readonly
                    @click="showStartDateDialog = true"
                  >
                    <template v-slot:append>
                      <q-icon
                        name="event"
                        @click="showEndDateCifDialog = true"
                        size="20px"
                      />
                    </template>
                  </q-input>
                  <q-dialog v-model="showEndDateDialog">
                    <q-card>
                      <q-card-section>
                        <q-date v-model="endDate" />
                      </q-card-section>
                      <q-card-actions align="right">
                        <q-btn
                          flat
                          label="Cancelar"
                          v-close-popup
                          @click="cerrarFechaModal"
                        />
                        <q-btn flat label="OK" @click="confirmEndDate" />
                      </q-card-actions>
                    </q-card>
                  </q-dialog>
                </div>
                <div class="col">
                  <q-input
                    v-model="valores.fecha_inicio_cif"
                    label="Fecha de Inicio del convenio"
                    readonly
                    @click="showEndDateCifDialog = true"
                  >
                    <template v-slot:append>
                      <q-icon
                        name="event"
                        @click="showEndDateCifDialog = true"
                        size="20px"
                      />
                    </template>
                  </q-input>
                  <q-dialog v-model="showStartDateCifDialog">
                    <q-card>
                      <q-card-section>
                        <q-date v-model="startDateCif" />
                      </q-card-section>
                      <q-card-actions align="right">
                        <q-btn
                          flat
                          label="Cancelar"
                          v-close-popup
                          @click="cerrarFechaModal"
                        />
                        <q-btn flat label="OK" @click="confirmStartDateCif" />
                      </q-card-actions>
                    </q-card>
                  </q-dialog>
                </div>
                <div class="col">
                  <q-input
                    v-model="valores.fecha_fin_cif"
                    label="Fecha de Finalización del convenio"
                    readonly
                    @click="showEndDateCifDialog = true"
                  >
                    <template v-slot:append>
                      <q-icon
                        name="event"
                        @click="showEndDateCifDialog = true"
                        size="20px"
                      />
                    </template>
                  </q-input>

                  <q-dialog v-model="showEndDateCifDialog">
                    <q-card>
                      <q-card-section>
                        <q-date v-model="endDateCif" />
                      </q-card-section>
                      <q-card-actions align="right">
                        <q-btn
                          flat
                          label="Cancelar"
                          v-close-popup
                          @click="cerrarFechaModal"
                        />
                        <q-btn flat label="OK" @click="confirmEndDateCif" />
                      </q-card-actions>
                    </q-card>
                  </q-dialog>
                </div>
              </div>
              <br />
              <p><b>INDICADORES</b></p>
              <!-- END FECHAS -->

              <div class="q-gutter-md row">
                <div class="col">
                  <q-input
                    square
                    label="NUMERO DE FAMILIAS BENEFICIADAS"
                    v-model="valores.numero_familias_beneficiadas"
                    type="number"
                  />
                </div>
                <div class="col">
                  <q-input
                    square
                    label="NUMERO DE FAMILIAS INDIRECTAS"
                    v-model="valores.numero_familias_indirectas"
                    type="number"
                  />
                </div>
                <!-- <div class="col">
                  <q-input
                    square
                    label="poblacion_beneficiaria_cuencas"
                    v-model="valores.poblacion_beneficiaria_cuencas"
                    type="number"
                  />
                </div> -->

                <div class="col">
                  <q-input
                    square
                    label="BENEFICIADOS VARONES"
                    v-model="valores.beneficiados_varones"
                    type="number"
                  />
                </div>
                <div class="col">
                  <q-input
                    square
                    label="BENEFICIADOS MUJERES"
                    v-model="valores.beneficiados_mujeres"
                    type="number"
                  />
                </div>
              </div>
              <div class="q-gutter-md row">
                <div class="col">
                  <q-input
                    square
                    label="Empleos Directos"
                    v-model="valores.empleos_directos"
                    type="number"
                  />
                </div>
                <div class="col">
                  <q-input
                    square
                    label="Empleos Indirectos"
                    v-model="valores.empleos_indirectos"
                    type="number"
                  />
                </div>
              </div>
              <br />
              <p><b>OTROS DATOS</b></p>
              <div class="q-gutter-md row">
                <div class="col">
                  <q-input
                    square
                    label="FORESTACION HECTARIA"
                    v-model="valores.forestacion_ha"
                    type="number"
                  />
                </div>

                <div class="col">
                  <q-input
                    square
                    label="superficie_plantada"
                    v-model="valores.superficie_plantada"
                    type="number"
                  />
                </div>

                <div class="col">
                  <q-input
                    square
                    label="viveros"
                    v-model="valores.viveros"
                    type="number"
                  />
                </div>
              </div>

              <div class="q-gutter-md row">
                <div class="col">
                  <q-input
                    square
                    label="numero_plantines"
                    v-model="valores.numero_plantines"
                    type="number"
                  />
                </div>

                <div class="col">
                  <q-input
                    square
                    label="reforestacion_ha"
                    v-model="valores.reforestacion_ha"
                    type="number"
                  />
                </div>
              </div>

              <div class="q-gutter-md row">
                <div class="col">
                  <q-col cols="12" md="12">
                    <q-input
                      square
                      label="Detalle tecnico"
                      v-model="valores.detalle"
                      type="textarea"
                    />
                  </q-col>
                </div>
                <div class="col">
                  <q-input
                    square
                    label="Programado para Entrega por Efeméride"
                    v-model="valores.programado_para_entrega_por_efemeride"
                    type="text"
                    style="margin-top: 10px"
                  />
                  <q-checkbox
                    v-model="valores.emblematico"
                    label="Proyecto es Emblemático"
                    style="margin-top: 20px"
                  />
                </div>
              </div>
            </q-form>
          </q-step>

          <q-step :name="3" done="currentStep > 3" icon="looks_4" title="Otros">
            <q-form ref="form4" @submit.prevent="$emit('guardar')">
              <div style="display: flex; flex-wrap: wrap; gap: 20px">
                <!-- Primera columna -->
                <div style="flex: 1; min-width: 300px">
                  <q-file
                    v-model="valores.imagen_proyecto"
                    accept=".jpg, .jpeg, .png"
                    label="Fotografía del Proyecto"
                    @rejected="onRejected"
                    :max-file-size="maxFileSize"
                    counter
                    @update:model-value="onFileChange"
                  >
                    <template v-slot:prepend>
                      <q-icon name="cloud_upload" />
                    </template>
                  </q-file>
                  <q-banner v-if="errorMessage" color="negative">{{
                    errorMessage
                  }}</q-banner>

                  <img
                    v-if="valores.imagen_proyecto"
                    :src="valores.imagen_proyecto"
                    alt="Fotografía del Proyecto"
                    style="
                      margin-top: 10px;
                      width: 70%;
                      display: block;
                      margin: 10px auto;
                    "
                  />
                </div>

                <!-- Segunda columna -->
                <div style="flex: 1; min-width: 300px">
                  <q-file
                    v-model="valores.documento_creacion"
                    accept=".pdf"
                    label="Archivo de Respaldo"
                    @rejected="mesaje_validacion"
                    :max-file-size="maxFileSize"
                    counter
                  >
                    <template v-slot:prepend>
                      <q-icon name="picture_as_pdf" />
                    </template>
                  </q-file>

                  <div
                    v-if="valores.documento_creacion"
                    style="margin-top: 10px"
                  >
                    <q-btn
                      color="primary"
                      icon="download"
                      label="Descargar Documento"
                      @click="descargarDocumento"
                    />
                  </div>
                </div>
              </div>
            </q-form>
          </q-step>
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
            @click="guardar"
          />
        </div>
      </q-form>
    </div>
  </q-page>
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
    proyecto: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const _message = inject("message");
    const { isMigrated } = toRefs(props);
    const imageUrl = ref(null);
    const maxFileSize = 5 * 1024 * 1024; // 2 MB  // 2 * 1024 * 1024
    const { isModal } = toRefs(props);
    const url = ref("/cuencas/proyectos/" + props.proyecto.id + "/");
    const file = ref(null);
    const _http = inject("http");
    const currentStep = ref(1);
    const valoresModel = useVModel(props, "valores");
    const gobiernoOptions = ref(["LUIS ARCE", "EVO MORALES", "OTRO"]);
    const preinversion = ref([]);
    const Convenio = ref("");
    const valores = ref({
      id: null,
      codigo_sisin: null,
      lugar: null,
      lugar_name: null,
      sector: null,
      sector_name: null,
      nombre: null,
      organizacion: null,
      organizacion_name: null,
      ejecutor: null,
      ejecutor_name: null,
      tipo: null,
      tipo_name: null,
      detalle: null,
      estado_detallado: null,
      fecha_inicio: null,
      fecha_conclusion: null,
      programa: null,
      programa_sigla: null,
      numero_familias_beneficiadas: null,
      numero_familias_indirectas: null,
      poblacion_beneficiaria_cuencas: null,
      numero_plantines: null,
      forestacion_ha: null,
      reforestacion_ha: null,
      superficie_plantada: null,
      viveros: null,
      empleos_directos: null,
      empleos_indirectos: null,
      observaciones: null,
      gobierno: null,
      beneficiados_varones: null,
      beneficiados_mujeres: null,
      programado_para_entrega_por_efemeride: null,
      viceministerio: null,
      viceministerio_name: null,
      fecha_inicio_cif: null,
      fecha_fin_cif: null,
      estado: null,
      estado_name: null,
      latitud: null,
      longitud: null,
      is_deleted: null,
      documento_creacion: null,
      emblematico: null,
      imagen_proyecto: null,
      sector_clasificador: null,
      sector_clasificador_name: null,
      sub_sector_clasificador: null,
      sub_sector_clasificador_name: null,
    });

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
    const isButtonDisabled = ref(false);
    const showStartDateCifDialog = ref(false);
    const showEndDateCifDialog = ref(false);
    const startDateCif = ref("");
    const endDateCif = ref("");

    const sector_clasificador = ref([]);
    const sub_sector_clasificador = ref([]);

    const refs = {
      form1: ref(null),
      form2: ref(null),
      form3: ref(null),
      form4: ref(null),
    };

    onMounted(async () => {
      try {
        //   valores.value = await _http.get(
        //   "/residuos/proyectos/" + props.proyecto.id + "/"
        // );
        Convenio.value = props.proyecto.codigo_convenio;
        valores.value = await _http.get(url.value);

        delete valores.value.sub_sector_clasificador;
        delete valores.value.preinversion;

        const campos = [
          "beneficiados_mujeres",
          "beneficiados_varones",
          "empleos_indirectos",
          "forestacion_ha",
          "numero_plantines",
          "reforestacion_ha",
          "superficie_plantada",
          "viveros",
          "numero_familias_beneficiadas",
          "numero_familias_indirectas",
          "poblacion_beneficiaria_cuencas",
        ];
        campos.forEach((campo) => {
          if (valores.value[campo] == 0 || valores.value[campo] === null) {
            valores.value[campo] = 0;
          }
        });

        const fechas = [
          "fecha_conclusion",
          "fecha_inicio",
          "fecha_fin_cif",
          "fecha_inicio_cif",
        ];
        fechas.forEach((fecha) => {
          if (valores.value[fecha] == 0 || valores.value[fecha] === null) {
            valores.value[fecha] = null;
          }
        });

        console.log("valores cuencas****", valores.value);
        console.log("observaciones:", valores.value.observaciones);
        console.log("forestacion_ha:", typeof valores.value.forestacion_ha);
        console.log(
          "beneficiarios_ varones:",
          typeof valores.value.beneficiados_varones
        );

        if (valores.value.documento_creacion != null) {
          isButtonDisabled.value = true;
        }

        console.log("al abrir:", valores.value);
      } catch (error) {
        console.log(error);
      }

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

    const change_sector_clasificador = async () => {
      const id_sector_clasificador = parseInt(
        valores.value.sector_clasificador_name.id
      );
      const response = await _http.get(
        "/sector-clasificador/" + id_sector_clasificador + "/"
      );
      console.log("ssssssss", response.sub_sectores);
      sub_sector_clasificador.value = response.sub_sectores;
      valores.value.sub_sector_clasificador_name = "";
    };

    const change_sub_sector_clasificador = () => {
      //activar la lista siguiente...
      valores.value.sub_sector_clasificador =
        valores.value.sub_sector_clasificador_name.id;
      // console.log(valores.value.sub_sector_clasificador);
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
            _http.get("/empresa-constructora_select/?limit=15"),
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
        organizacion.value = o.results;
        ejecutor.value = e.results;
        tipo.value = t.results;
        constructora.value = c.results;
        estado.value = es.results;
        ucep.value = u.results;
        programas.value = p.results;
        viceministerio.value = v.results;
        estado_detallado.value = et.results;
        sector_clasificador.value = sec.results;
        sub_sector_clasificador.value = sec_cla.results;
        preinversion.value = prei.results;
      } catch (error) {
        console.error("Error loading options:", error);
      }
    };

    const checkFileSize = (files) => {
      console.log(files.filter((file) => file.size < 2048));
    };

    const descargarDocumento = () => {
      const documento = valores.value.documento_creacion;

      if (!documento) {
        _message.error("No hay documento para descargar.");
        return;
      }

      let link = document.createElement("a");
      if (documento instanceof File) {
        link.href = URL.createObjectURL(documento);
        link.download = documento.name;
        link.click();
        URL.revokeObjectURL(link.href);
      } else if (typeof documento === "string") {
        link.href = documento;
        link.download = documento.split("/").pop();
        link.click();
      } else {
        _message.error("Formato de documento no soportado.");
      }
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

    const isValidDate = (date) => {
      const parsedDate = new Date(date);
      return parsedDate instanceof Date && !isNaN(parsedDate);
    };

    const guardar = async () => {
      try {
        console.log("para guardar (valores)****", valores.value);

        // if (!(valores.value.imagen_proyecto instanceof File)) {
        //   console.log("esto no es un archivo fileeeeee");
        //   if (valores.value.imagen_proyecto != null) {
        //     console.log("elimina la imagen");
        //     delete valores.value.imagen_proyecto;
        //   } else {
        //     _message.info("DEBE INGRESAR UNA IMAGEN");
        //     return;
        //   }
        // }

        // if (!(valores.value.documento_creacion instanceof File)) {
        //   console.log("esto no es un archivo fileeeeee");
        //   if (valores.value.documento_creacion != null) {
        //     delete valores.value.documento_creacion;
        //   } else {
        //     _message.info("DEBE INGRESAR UN DOCUMENTO FORMATO PDF");
        //     return;
        //   }
        // }

        //REVISAR SUB_SECTOR_CLASIFICADOR

        const fechas = [
          "fecha_conclusion",
          "fecha_inicio",
          "fecha_fin_cif",
          "fecha_inicio_cif",
        ];
        fechas.forEach((fechaKey) => {
          if (valores.value[fechaKey] === null) {
            delete valores.value[fechaKey];
          }
        });

        if (
          valores.value.sub_sector_clasificador == 0 ||
          valores.value.sub_sector_clasificador === null
        ) {
          valores.value.sub_sector_clasificador = 2;
        }

        // REVISAR PREINVERSION
        if (
          valores.value.preinversion == 0 ||
          valores.value.preinversion === null
        ) {
          valores.value.preinversion = 1;
        }

        if (
          valores.value.imagen_proyecto == null ||
          typeof valores.value.imagen_proyecto == "string"
        ) {
          console.log("o es null o es string(tiene dato anterior)");
          delete valores.value.imagen_proyecto;
        }

        if (
          valores.value.documento_creacion == null ||
          typeof valores.value.documento_creacion == "string"
        ) {
          console.log("o es null o es string(tiene dato anterior)");
          delete valores.value.documento_creacion;
        }

        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const formData = new FormData();
        for (const [key, value] of Object.entries(valores.value)) {
          formData.append(key, value);
        }

        if (valores.value.id) {
          console.log("para guardar PUT::: ", valores.value);
          await _http.put(
            "/cuencas/proyectos/" + props.proyecto.id + "/",
            formData,
            config
          );
          _message.success("SE GUARDO CORRECTAMENTE");
        } else {
          console.log("para guardar POST::: ");
          await _http.post("/cuencas/proyectos/", formData, config);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const confirmStartDate = () => {
      valores.value.fecha_inicio = startDate.value.replaceAll("/", "-");
      showStartDateDialog.value = false;
    };

    const confirmEndDate = () => {
      valores.value.fecha_conclusion = endDate.value.replaceAll("/", "-");
      showEndDateDialog.value = false;
    };

    const cerrarFechaModal = () => {
      showStartDateCifDialog.value = false;
    };

    const confirmStartDateCif = () => {
      valores.value.fecha_inicio_cif = startDateCif.value.replaceAll("/", "-");
      showStartDateCifDialog.value = false;
    };

    const confirmEndDateCif = () => {
      valores.value.fecha_fin_cif = endDateCif.value.replaceAll("/", "-");
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

    const goBack = () => {
      // route.value.back();
      window.history.back();
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
      isValidDate,

      Convenio,
      //preinversion,
      goBack,
      valores,
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
      isButtonDisabled,
      gobiernoOptions,
      url,
      sector_clasificador,
      sub_sector_clasificador,
      change_sector_clasificador,
      change_sub_sector_clasificador,
      descargarDocumento,
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
.pagina-con-fondo {
  background-color: #e9e8e8;
  padding: 20px;
}
</style>
