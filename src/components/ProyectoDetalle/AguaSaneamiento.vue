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
    <div class="text-h4 q-mb-md"><q-icon name="clean_hands" />INFORMACION GENERAL</div>
    <div>
      <q-form @submit.prevent="$emit('guardar')">
        <!-- <q-form @submit.prevent="guardar()"> -->

        <q-stepper v-model="currentStep" animated>
          <q-step
            :name="1"
            done="currentStep > 1"
            icon="looks_one"
            title="Inf. del Proyecto"
          >
            <q-form ref="form1" @submit.prevent="nextStep">
              <div class="q-gutter-md row">
                <!-- <div class="col">
                                <q-select square label="Codigo Convenio" v-model="Convenio"
                                    :options="preinversion" option-value="id" option-label="codigo_convenio" />
                            </div> -->

                <div class="col" v-if="!isMigrated">
                  <q-input
                    square
                    label="Codigo sisin agua"
                    v-model="valores.codigo_sisin"
                    :rules="valoresRules.codigo_sisin"
                  />
                </div>

                <div class="col" v-else>
                  <q-input
                    square
                    label="Codigo sisin agua"
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
                    label="Sector"
                    v-model="valores.sector_clasificador_name"
                    :options="sector_clasificador"
                    option-value="id"
                    option-label="nombre"
                    @update:model-value="change_sector_clasificador"
                  />
                </div>
                <!-- <div class="col">
                <q-select
                  square
                  label="sub_sector_clasificador"
                  v-model="valores.sub_sector_clasificador_name"
                  :options="sub_sector_clasificador"
                  option-value="id"
                  option-label="nombre"
                  @update:model-value="change_sub_sector_clasificador"
                />
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
                      :rules="valoresRules.nombre"
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
                    :rules="valoresRules.nombre"
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
            title="Beneficios"
          >
            <q-form ref="form2" @submit.prevent="nextStep">
              <!-- FECHAS -->
              <div class="q-gutter-md row">
                <div class="col">
                  <q-input
                    v-model="valores.fecha_inicio"
                    label="Fecha de Inicio"
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
                </div>
                <div class="col">
                  <q-input
                    v-model="valores.fecha_conclusion"
                    label="Fecha de Conclusión"
                    readonly
                  >
                    <q-icon name="event" @click="showEndDateDialog = true" />
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
              </div>
              <div class="q-gutter-md row"></div>
              <br /><br />
              <div class="q-gutter-md row">
                <div class="col">
                  <q-input
                    square
                    label="NUMERO DE FAMILIAS BENEFICIADAS"
                    v-model="valores.numero_familias_beneficiadas"
                    mask="###,###,###,###,###,###,###,###,###,###,###,###,###" reverse-fill-mask
                unmasked-value
                    min="0"
                  />
                </div>
                <div class="col">
                  <q-input
                    square
                    label="NUMERO DE FAMILIAS INDIRECTAS"
                    v-model="valores.numero_familias_indirectas"
                    mask="###,###,###,###,###,###,###,###,###,###,###,###,###" reverse-fill-mask
                unmasked-value
                  />
                </div>
              </div>
              <div class="q-gutter-md row">
                <div class="col">
                  <q-input
                    square
                    label="BENEFICIADOS VARONES"
                    v-model="valores.beneficiados_varones"
                    mask="###,###,###,###,###,###,###,###,###,###,###,###,###" reverse-fill-mask
                unmasked-value
                  />
                </div>
                <div class="col">
                  <q-input
                    square
                    label="BENEFICIADOS MUJERES"
                    v-model="valores.beneficiados_mujeres"
                    mask="###,###,###,###,###,###,###,###,###,###,###,###,###" reverse-fill-mask
                unmasked-value
                  />
                </div>
              </div>
              <div class="q-gutter-md row">
                <div class="col">
                  <q-input
                    square
                    label="Empleos Directos"
                    v-model="valores.empleos_directos"
                    mask="###,###,###,###,###,###,###,###,###,###,###,###,###" reverse-fill-mask
                unmasked-value
                  />
                </div>
                <div class="col">
                  <q-input
                    square
                    label="Empleos Indirectos"
                    v-model="valores.empleos_indirectos"
                    mask="###,###,###,###,###,###,###,###,###,###,###,###,###" reverse-fill-mask
                unmasked-value
                  />
                </div>
              </div>

              <q-col cols="12" md="12">
                <q-input
                  square
                  label="Detalle"
                  v-model="valores.detalle"
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
                v-model="valores.imagen_proyecto"
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

              <q-file
                v-model="valores.documento_creacion"
                accept=".pdf"
                label="Archivo de Respaldo"
                class="col-xs-12 col-md-6"
                @rejected="mesaje_validacion"
                :max-file-size="maxFileSize"
                counter
              >
                <template v-slot:prepend>
                  <q-icon name="picture_as_pdf" />
                </template>
              </q-file>

              <q-input
                square
                label="Programado para entrega por efeméride"
                v-model="valores.programado_para_entrega_por_efemeride"
                type="text"
              />
              <br />

              <!-- <q-input
              square
              label="Estado reportado por sector para efeméride"
              v-model="valores.estado_reportado_por_el_sector_para_efemeride"
              type="text"
            /> -->

              <q-checkbox
                v-model="valores.emblematico"
                true-value="true"
                label="Proyecto es Emblemático"
              />
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
    const url = ref("/agua-saneamiento/proyectos/" + props.proyecto.id + "/");
    const file = ref(null);
    const _http = inject("http");
    const currentStep = ref(1);
    const valoresModel = useVModel(props, "valores");
    const gobiernoOptions = ref(["LUIS ARCE", "EVO MORALES", "OTRO"]);
    const preinversion = ref([]);
    const Convenio = ref("");
    const valores = ref({
      id: props.proyecto.id,
      codigo_sisin: null,
      lugar: null,
      sector: null,
      nombre: null,
      organizacion: null,
      ejecutor: null,
      tipo: null,
      detalle: null,
      estado_detallado: null,
      fecha_inicio: null,
      fecha_conclusion: null,
      programa: null,
      numero_familias_beneficiadas: null,
      numero_familias_indirectas: null,
      numero_plantines: null,
      forestacion_ha: null,
      toneladas_residuos_dispuestos_anio: null,
      toneladas_residuos_aprovechamiento_anio: null,
      empleos_directos: null,
      empleos_indirectos: null,
      //empresa_constructora: null,
      //empresa_constructora_name: null,
      ucep_responsable: null,
      observaciones: null,
      gobierno: null,
      beneficiados_varones: null,
      beneficiados_mujeres: null,
      objetivo: null,
      programado_para_entrega_por_efemeride: null,
      viceministerio: null,
      emblematico: null,
      estado: null,
      latitud: null,
      longitud: null,
      is_deleted: false,
      documento_creacion: null,
      imagen_proyecto: null,
      sector_clasificador: null,
      sub_sector_clasificador: null,
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
        Convenio.value = props.proyecto.codigo_convenio;
        //   valores.value = await _http.get(
        //   "/residuos/proyectos/" + props.proyecto.id + "/"
        // );
        console.log("url.valueeeeeeeeee****", url);
        valores.value = await _http.get(url.value);
        console.log("valores agua saneamiento", valores.value);

        delete valores.value.sub_sector_clasificador;
        delete valores.value.preinversion;
        delete valores.value.estado_detallado_nuevo;
        delete valores.value.tipo;

        const campos = [
          "numero_familias_beneficiadas",
          "numero_familias_indirectas",
          "beneficiados_varones",
          "beneficiados_mujeres",
          "numero_plantines",
          "forestacion_ha",
          "toneladas_residuos_dispuestos_anio",
          "toneladas_residuos_aprovechamiento_anio",
          "empleos_indirectos",
          "empleos_directos",
        ];
        campos.forEach((campo) => {
          if (valores.value[campo] == 0 || valores.value[campo] === null) {
            valores.value[campo] = 0;
          }
        });

        //REVISAR SUB_SECTOR_CLASIFICADOR
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

        console.log("al abrir:", valores.value);
      } catch (error) {
        console.log(error);

        // isButtonDisabled.value = true;
        // _message.error("No existe relacion (antiguo)");
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

    const guardar = async () => {
      try {
        console.log("para guardar (valoressssssss)****", valores.value);
        delete valores.value.estado_detallado_nuevo;

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


        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const formData = new FormData();
        for (const [key, value] of Object.entries(valores.value)) {
          // console.log(`${key}: ${value}`);
          formData.append(key, value);
        }

        if (valores.value.id) {
          console.log("para guardar PUT::: ", valores.value);

          await _http.put(
            "/proyectos/" + props.proyecto.id + "/",
            formData,
            config
          );
          _message.success("SE GUARDO CORRECTAMENTE");
        } else {
          console.log("POST");
          await _http.post("/agua-saneamiento/proyectos/", formData, config);
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
      change_sector_clasificador,
      sector_clasificador,
      sub_sector_clasificador,
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
