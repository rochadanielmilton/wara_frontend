<template>

  <q-form @submit.prevent="guardar">
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
      <q-step :name="1" done="currentStep > 1" icon="looks_one" title="PREINVERSIÓN">
        <q-form ref="form1" @submit.prevent="nextStep" greedy>
          <div class="q-gutter-md row">
            <div class="col-5">
              <q-input square v-model="valoresModel.nombre" label="NOMBRE" :error="!!errors.nombre"
                :error-message="errors.nombre && errors.nombre[0]" />
            </div>

            <div class="col-3">
              <q-input square v-model="valoresModel.codigo_sisin" label="CÓDIGO SISIN" />
            </div>

            <div class="col-3">
              <q-select square label="ESTADO  DEL PROYECTO" v-model="valoresModel.estado_id"
                :options="estado_preinversion" option-value="id" option-label="nombre" use-chips emit-value map-options
                :error="!!errors.estado_id" :error-message="errors.estado_id && errors.estado_id[0]" />
            </div>

            <div class="col-5">
              <q-input square v-model="valoresModel.codigo_convenio" label="CONVENIO" :error="!!errors.codigo_convenio"
                :error-message="errors.codigo_convenio && errors.codigo_convenio[0]" />
            </div>

            <div class="col-3">
              <q-select square multiple label="FUENTE" v-model="valoresModel.organismos_financiadores_ids"
                :options="organismos_financiadores_ids" option-value="id" option-label="sigla" use-chips emit-value
                map-options :error="!!errors.organismos_financiadores_ids"
                :error-message="errors.organismos_financiadores_ids && errors.organismos_financiadores_ids[0]" />
            </div>

            <div class="col">
                <q-select
                  square
                  v-model="valoresModel.programa_id"
                  use-input
                  hide-selected
                  fill-input
                  input-debounce="300"
                  :options="programa"
                  @filter="filterFn"
                  hint="Escriba al menos 3 caracteres para filtrar"
                  label="Programa"
                  option-value="id"
                  option-label="sigla_prog_convenio"
                  emit-value
                  map-options
                >
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        No se encontró resultados
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
            </div>


            <div class="col-5">
              <q-input square v-model="valoresModel.fecha_inicio" label="FECHA INICIO" type="date"
                :error="!!errors.fecha_inicio" :error-message="errors.fecha_inicio && errors.fecha_inicio[0]" />

            </div>
            <div class="col-6">
              <q-input square v-model="valoresModel.fecha_conclusion" label="FECHA CONCLUSIÓN" type="date"
              :error="!!errors.fecha_conclusion" :error-message="errors.fecha_conclusion && errors.fecha_conclusion[0]"
              />
            </div>

            <q-toggle v-model="valoresModel.estado"
              :label="`Estado ${valoresModel.estado == estados.ON ? estados.ON : estados.OFF}`" color="primary"
              :false-value="estados.OFF" :true-value="estados.ON" />
          </div>
        </q-form>
      </q-step>
      <q-step :name="2" done="currentStep > 2" icon="looks_two" title="LOCALIZACIÓN">
        <q-form ref="form2" @submit.prevent="nextStep" greedy>
          <div class="q-gutter-md row">
            <div class="col-3">
              <q-select square label="SECTOR" v-model="valoresModel.sector"
                :options="['AGROPECUARIO', 'RECURSOS HÍDRICOS', 'SANEAMIENTO BÁSICO']" option-value="nombre"
                option-label="nombre" use-chips emit-value map-options
                :error="!!errors.sector" :error-message="errors.sector && errors.sector[0]"/>
            </div>
            <div class="col-3">
              <q-select square label="SUB SECTOR" v-model="valoresModel.sub_sector" :options="subSectoresOptions"
                use-chips emit-value map-options
                :error="!!errors.sub_sector" :error-message="errors.sub_sector && errors.sub_sector[0]"
                />
            </div>
            <div class="col-5">
              <q-select square label="TIPO DE PROYECTO" v-model="valoresModel.tipo_proyecto" :options="tipo_proyecto"
                option-value="id" option-label="nombre" use-chips emit-value map-options
                :error="!!errors.tipo_proyecto" :error-message="errors.tipo_proyecto && errors.tipo_proyecto[0]"
                />
            </div>
            <div class="col-2">
              <q-select square label="VICEMINISTERIO" v-model="valoresModel.viceministerio" :options="viceministerio"
                option-value="id" option-label="nombre" use-chips emit-value map-options />
            </div>


            <div class="col-6">
              <q-select square label="DEPARTAMENTO" v-model="valoresModel.departamento_id"
                :options="departamento_id" option-value="id" option-label="nombre" use-chips emit-value map-options
                :error="!!errors.departamento_id" :error-message="errors.departamento_id && errors.departamento_id[0]"/>
            </div>
            <div class="col-5">
              <q-select square label="PROVINCIA" v-model="valoresModel.provincia_id" :options="provincia_id"
                option-value="id" option-label="nombre" use-chips emit-value map-options
                :error="!!errors.provincia_id" :error-message="errors.provincia_id && errors.provincia_id[0]"/>
            </div>
            <div class="col-6">
              <q-select square label="MUNICIPIO" v-model="valoresModel.municipio_id" :options="municipio_id"
                option-value="id" option-label="nombre" use-chips emit-value map-options
                :error="!!errors.municipio_id" :error-message="errors.municipio_id && errors.municipio_id[0]"/>
            </div>
            <div class="col-5">
              <q-select square multiple label="COMUNIDADES" v-model="valoresModel.comunidades_ids"
                :options="comunidades_ids" option-value="id" option-label="nombre" use-chips emit-value map-options
                :error="!!errors.comunidades_ids" :error-message="errors.comunidades_ids && errors.comunidades_ids[0]"/>
            </div>
          </div>
        </q-form>
      </q-step>
      <q-step :name="3" done="currentStep > 3" icon="looks_3" title="RESPONSABLES">
        <q-form ref="form3" @submit.prevent="nextStep" greedy>
          <div class="q-gutter-md row">
            <div class="col-6">
              <q-select square label="UCEP RESPONSABLE" v-model="valoresModel.ucep_responsable"
                :options="ucep_responsable_id" option-value="id" option-label="nombre" use-chips emit-value map-options
                :error="!!errors.ucep_responsable_id" :error-message="errors.ucep_responsable_id && errors.ucep_responsable_id[0]"/>
            </div>
            <div class="col-5">
              <q-select square label="ENTIDAD EJECUTORA" v-model="valoresModel.ejecutor_id" :options="ejecutor_id"
                option-value="id" option-label="nombre" use-chips emit-value map-options
                :error="!!errors.ejecutor_id" :error-message="errors.ejecutor_id && errors.ejecutor_id[0]"/>
            </div>
          </div>

        </q-form>
      </q-step>
      <q-step :name="4" done="currentStep > 4" icon="looks_3" title="COSTO DE LA FASE">
        <q-form ref="form4" @submit.prevent="nextStep" greedy>
          <div class="q-gutter-md row">
            <div class="col-5">
              <q-field
                square
                v-model="valoresModel.monto_comprometido_estudio"
                label="MONTO COMPROMETIDO DEL ESTUDIO (Bs.)"
              >
                <template v-slot:control="{ id, floatingLabel, modelValue, emitValue }">
                  <input :id="id" class="q-field__input text-left" :value="modelValue" @change="e => emitValue(e.target.value)" v-money="moneyOptions" v-show="floatingLabel">
                </template>
              </q-field>
            </div>
            <div class="col-5">
              <q-field
                square
                v-model="valoresModel.monto_contratado_estudio"
                label="MONTO CONTRATADO DEL ESTUDIO"
              >
                <template v-slot:control="{ id, floatingLabel, modelValue, emitValue }">
                  <input :id="id" class="q-field__input text-left" :value="modelValue" @change="e => emitValue(e.target.value)" v-money="moneyOptions" v-show="floatingLabel">
                </template>
              </q-field>
            </div>
            <div class="col-5">
              <q-field
                square
                v-model="valoresModel.monto_pagado_estudio"
                label="MONTO PAGADO DEL ESTUDI"
              >
                <template v-slot:control="{ id, floatingLabel, modelValue, emitValue }">
                  <input :id="id" class="q-field__input text-left" :value="modelValue" @change="e => emitValue(e.target.value)" v-money="moneyOptions" v-show="floatingLabel">
                </template>
              </q-field>
            </div>
            <div class="col-5">
              <q-input square v-model="valoresModel.avance_financiero" label="AVANCE FINANCIERO" mask="###,###,###,###,###,###,###,###,###,###,###,###,###"
                  reverse-fill-mask
                  unmasked-value
                :error="!!errors.avance_financiero" :error-message="errors.avance_financiero && errors.avance_financiero[0]"
              />
            </div>

          </div>

        </q-form>
      </q-step>

    </q-stepper>

    <div class="text-right q-mt-md">
      <q-btn class="q-ml-sm" icon="close" label="Cancelar" @click="showConfirmation = true" v-if="isModal" />
      <q-btn v-if="currentStep > 1" class="q-ml-sm" icon="arrow_back" label="Anterior" @click="previousStep" />
      <q-btn v-if="currentStep < 4" class="q-ml-sm" icon="arrow_forward" color="primary" label="Siguiente"
        @click="submitStepForm" />
      <q-btn v-if="currentStep === 4" class="q-ml-sm" icon="check" color="primary" label="Guardar" type="submit" />
    </div>
  </q-form>
</template>

<script>
import { ref, onMounted, inject, toRefs, getCurrentInstance, watch, computed } from "vue";
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
      type: Boolean
    }
  },
  setup(props,{emit}) {
    const { isMigrated } = toRefs(props);

    const { isModal } = toRefs(props);
    const _http = inject("http");
    const currentStep = ref(1);
    const valoresModel = useVModel(props, "valores");
    valoresModel.value.estado = valoresModel.value.estado_texto??estados.ON
    valoresModel.value.estado_id = valoresModel.value.estado_preinversion;
    valoresModel.value.programa_id = valoresModel.value.programa?.id;
    valoresModel.value.organismos_financiadores_ids = valoresModel.value.organismos_financiadores?.map(of=>of.id)
    valoresModel.value.comunidades_ids = valoresModel.value.comunidades?.map(of=>of.id)

    const valoresRules = {
      viceministerio: [validaciones.requerido],
      sigla_prog_convenio: [validaciones.requerido],
    };

    const lugares = ref([]);
    const sector = ref([]);
    const sub_sector = ref([]);
    const departamento_id = ref([]);
    const provincia_id = ref([]);
    const municipio_id = ref([]);
    const comunidades_ids = ref([]);
    const organismos_financiadores_ids = ref([]);
    const ejecutor_id = ref([]);
    const tipo_proyecto = ref([]);
    const estado_detallado = ref([]);
    const constructora = ref([]);
    const tipo_financiamiento = ref([]);
    const ucep_responsable_id = ref([]);
    const programa = ref([]);
    const viceministerio = ref([]);
    const estado_preinversion = ref([]);
    const showConfirmation = ref(false);
    const showStartDateDialog = ref(false);
    const showEndDateDialog = ref(false);
    const startDate = ref("");
    const endDate = ref("");
    const sectorOptions = ref([]);
    const showStartDateCifDialog = ref(false);
    const showEndDateCifDialog = ref(false);
    const startDateCif = ref("");
    const endDateCif = ref("");
    const errors = ref({})
        let numeric={};
    const moneyOptions = {
      decimal: ",",
      thousands: ".",
      prefix: "Bs. ",
      suffix: "",
      precision: 2,
      masked: true,
    };
    const subSectoresOptions = computed(() => {
      if (!valoresModel.value.sector || valoresModel.value.sector === "") {
        return [];
      }
      switch (valoresModel.value.sector) {
        case "AGROPECUARIO":
          return ["RIEGO"];
        case "RECURSOS HÍDRICOS":
          return ["MANEJO INTEGRAL DE CUENCAS"];
        case "SANEAMIENTO BÁSICO":
          return ["AGUA POTABLE Y ALCANTARILLADO", "RESÍDUOS SÓLIDOS"];
        default:
          return [];
      }
    });

    function parseCurrency(currencyString) {
      console.log(currencyString);
      const sanitizedString = `${currencyString}`
          .replace(/Bs\.\s*/, '')
          .replace(/\./g, '')
          .replace(',', '.')
          .trim();

      return parseFloat(sanitizedString) || 0;
    }

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
      () => valoresModel.value.departamento_id,
      async (newDeparatemento) => {
          console.log("+++++++++++++++++++++++++++++++++++++++++++++++++", valoresModel.value.provincia);
        if (!newDeparatemento) {
          provincia_id.value = [];
          valoresModel.value.provincia_id = null;
          return;
        };
        const response = await _http.get(`/provincias/?page=1&limit=10&departamento_id=${newDeparatemento}`)
        provincia_id.value = response.results;
      },
    );

    watch(
      () => valoresModel.value.provincia_id,
      async (newProvincia) => {
        if (!newProvincia) {
          municipio_id.value = [];
          valoresModel.value.municipio_id = null;
          return;
        };
        const response = await _http.get(`/municipios/?page=1&limit=10&provincia_id=${newProvincia}`)
        console.log("******************************************", response, newProvincia);
        municipio_id.value = response.results;
      },
    );

    watch(
      () => valoresModel.value.municipio_id,
      async (newMunicipio) => {
        if (!newMunicipio) {
          comunidades_ids.value = [];
          valoresModel.value.comunidades_ids = null;
          return;
        };
        const response = await _http.get(`/comunidades/?municipio_id=${newMunicipio}`)
        console.log("******************************************", response, newMunicipio);
        comunidades_ids.value = response.results;
      },
    );

    /*   watch(
           () => valoresModel.value.estado,
           async (newEstado) => {
               if (!newEstado) {
                   estado_detallado.value = [];
                   valoresModel.value.estado_detallado = null;
                   return;
               };
               const response = await _http.get(`/estados-detallados/?estado_id=${newEstado}`)
               estado_detallado.value = response.results;
           },
       );*/

   /* watch(
        () => valoresModel.value.sector,
        () => {
           valoresModel.value.sub_sector=null;
        }
    );*/

    const fetchOptions = async () => {
      try {
        const [l, o, e, t, c, u, p, v, et, tf, ep, dep, pro, mun,] = await Promise.all([
          _http.get("/lugares/", true),
          // _http.get("/sectores/", true),
          _http.get("/organizaciones-financieras_select/", true),
          _http.get("/ejecutores/", true),
          _http.get("/tipos-proyecto-preinversion/", true),
          _http.get("/empresa-constructora/", true),
          // _http.get(`/estados/?tipo_migrado=${isMigrated.value ? 'migrado' : 'nuevo'}`, true),
          _http.get("/ucep-responsables/", true),
          _http.get("/programas_select/", true),
          _http.get("/viceministerios_select/", true),
          _http.get("/estados-detallados/?estado_id=1", true),
          _http.get("/tipos-financiamiento/", true),
          _http.get("/estados-preinversion/", true),
          _http.get("/departamentos/", true),
          _http.get("/ucep-responsables/")
        ]);

        if(valoresModel.value.departamento_id!=null){
          const response = await _http.get(
            "/provincias/?departamento_id="+valoresModel.value.departamento_id+`&ordering=departamento__nombre`
          );

          provincia_id.value = response.results.map((r) => ({
            ...r,
            nombre: `${r.departamento.nombre} - ${r.nombre}`,
          }));
        }

        if(valoresModel.value.provincia_id!=null){
          const response = await _http.get(
            "/municipios/?provincia_id=" +
              valoresModel.value.provincia_id+
              `&ordering=provincia__departamento__nombre,provincia__nombre`
          );
          municipio_id.value = response.results.map((r) => ({
            ...r,
            nombre: `${r.provincia.departamento.nombre} - ${r.provincia.nombre} - ${r.nombre} `,
          }));
        }

        if(valoresModel.value.municipio_id!=null){
          const response = await _http.get(
            "/comunidades/?municipio_id=" +
              valoresModel.value.municipio_id+
              `&ordering=nombre`
          );
          comunidades_ids.value = response.results.map((r) => ({
            ...r,
            nombre: `${r.nombre} `,
          }));
        }

        lugares.value = l.results;
        // sector.value = s.results;
        organismos_financiadores_ids.value = o.results;
        ejecutor_id.value = e.results;
        tipo_proyecto.value = t.results;
        constructora.value = c.results;
        //estado.value = es.results;
        sectorOptions.value = sector.results;
        valoresModel.value.sectores_model = valoresModel.value.sector;
        ucep_responsable_id.value = u.results;
        programa.value = [valoresModel.value.programa];
        viceministerio.value = v.results;
        estado_detallado.value = et.results;
        tipo_financiamiento.value = tf.results;
        estado_preinversion.value = ep.results;
        departamento_id.value = dep.results;


      } catch (error) {
        console.error("Error loading options:", error);
      }
    };



    const guardar = () => {

      submitStepForm()
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
/*  */
    const submitStepForm = async () => {
      console.log(currentStep.value)
      errors.value = {};
            numeric = {};
      try {

        const data = {...valoresModel.value}
        if(data.monto_comprometido_estudio) data["monto_comprometido_estudio"] = parseCurrency(data.monto_comprometido_estudio)
        if(data.monto_contratado_estudio) data["monto_contratado_estudio"] = parseCurrency(data.monto_contratado_estudio)
        if(data.monto_pagado_estudio) data["monto_pagado_estudio"] = parseCurrency(data.monto_pagado_estudio)
        if(!data.comunidades_ids) data["comunidades_ids"] = []
        if(data.fecha_conclusion=="") delete data["fecha_conclusion"]

        if (valoresModel.value.id) {
          await _http.put(`/proyectos-preinversion/${valoresModel.value.id}/?paso=${currentStep.value}`,data);
        } else {
          await _http.post(`/proyectos-preinversion/?paso=${currentStep.value}`, data);
        }

        const mensaje = !valoresModel.value.id
        ? "PreInversión creada de manera exitosa."
        : "PreInversión actualizada de manera exitosa.";

        if(currentStep.value<4)
          return nextStep();
        if(currentStep.value==4)
          emit('close-success',mensaje)
      } catch (error) {
        console.log(error)
        if (error.response.status == 400) {
          errors.value = error.response.data;
          const fieldsToCheck = [
            'nombre',
            'estado_id',
            'codigo_convenio',
            'organismos_financiadores_ids',
            'programa_id',
            'fecha_inicio',
          ];

          const hasSpecificErrors = fieldsToCheck.some(field => errors.value[field]);

          if (hasSpecificErrors) {
            currentStep.value = 1;
          }

        }
      }
    };

    const filterFn = (val, update, abort) => {
      console.log(val)
      if (val.length < 3) {
        abort()
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        _http.get(`/programas_select/?search=${needle}`).then(r=>{
          programa.value = r.results;
        });
      })
    }


    return {
      filterFn,
      errors,
      departamento_id,
      provincia_id,
      municipio_id,
      comunidades_ids,
      sub_sector,
      estado_preinversion,
      showConfirmation,
      currentStep,
      valoresModel,
      valoresRules,
      lugares,
      programa,
      sector,
      sectorOptions,
      organismos_financiadores_ids,
      ejecutor_id,
      tipo_proyecto,
      estados,
      constructora,
      ucep_responsable_id,
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
      tipo_financiamiento,
      subSectoresOptions,
      moneyOptions
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
