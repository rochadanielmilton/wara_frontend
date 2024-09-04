<template>
  <q-form
    class="row q-col-gutter-md"
    @submit="$emit('guardar')"
    ref="myForm"
    greedy
  >
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

    <q-stepper
      v-model="step"
      ref="stepper"
      color="primary"
      style="width: 100%"
      animated
    >
      <q-step
        :name="1"
        title="Seccion 1"
        caption="Ubicación"
        icon="assignment"
        :done="step > 1"
      >
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-4">
            <q-select
              v-model="valores.departamentos_model"
              :options="departamentosOptions"
              square
              multiple
              label="Departamentos"
              option-value="id"
              option-label="nombre"
              @update:model-value="changedepartamentos"
            />
          </div>

          <div class="col-12 col-md-4">
            <q-select
              v-model="valores.provincia_model"
              :options="provinciasOptions"
              label="Provincia"
              square
              multiple
              option-value="id"
              option-label="nombre"
              @update:model-value="changeprovincia"
            />
          </div>

          <div class="col-12 col-md-4">
            <q-select
              v-model="valores.municipio_model"
              square
              multiple
              label="Municipio"
              option-value="id"
              option-label="nombre"
              :options="municipioOptions"
            />
          </div>
        </div>
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-4">
            <q-select
              square
              :options="['PTAR Y ALCANTARILLADO', 'SIN PTAR', 'SOLO PTAR']"
              label="Proyecto con Ptar"
              v-model="valores.proyecto_cuenta_con_ptar"
            />
          </div>
          <div class="col-12 col-md-4">
            <q-select
              square
              :options="lugarOptions"
              label="Lugar"
              option-value="id"
              option-label="nombre"
              v-model="valores.lugar_model"
            />
          </div>
        </div>
      </q-step>

      <q-step
        :name="2"
        title="Seccion 2"
        caption="Económico"
        icon="assignment"
        :done="step > 2"
      >
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-4">
            <q-field
              square
              v-model="valores.total_inversion"
              label="Total Inversion (Bs.)"
            >
              <template v-slot:control="{ id, floatingLabel, modelValue, emitValue }">
                <input :id="id" class="q-field__input text-left" :value="modelValue" @change="e => emitValue(e.target.value)" v-money="moneyOptions" v-show="floatingLabel">
              </template>
            </q-field>

          </div>

          <!-- Segunda Columna -->
          <div class="col-12 col-md-4">
            <q-input
              square
              label="Avance Fisico %"
              maxlength="3"
              suffix="%"
              v-model="valores.avance_fisico"
              :rules="[
                (val) =>
                  (val >= 0 && val <= 100) ||
                  'Valor debe ser entre 0 y 100',
              ]"
            />
          </div>

          <!-- Tercera Columna -->
          <div class="col-12 col-md-4">
            <q-field
              square
              v-model="valores.financiamiento_externo"
              label="Financiamiento Externo (Bs.)"
            >
              <template v-slot:control="{ id, floatingLabel, modelValue, emitValue }">
                <input :id="id" class="q-field__input text-left" :value="modelValue" @change="e => emitValue(e.target.value)" v-money="moneyOptions" v-show="floatingLabel">
              </template>
            </q-field>
          </div>
        </div>

        <div class="q-gutter-md row">
          <div class="col">
            <q-field
              square
              v-model="valores.bol"
              label="BOL (Bs.)"
            >
              <template v-slot:control="{ id, floatingLabel, modelValue, emitValue }">
                <input :id="id" class="q-field__input text-left" :value="modelValue" @change="e => emitValue(e.target.value)" v-money="moneyOptions" v-show="floatingLabel">
              </template>
            </q-field>
          </div>
          <div class="col">
            <!-- <q-input
              square
              label="PPCR (Bs.)"
              prefix="Bs. "
              mask="###,###,###,###,###,###,###,###,###,###,###,###,###"
              reverse-fill-mask
              v-model="valores.ppcr"
            /> -->
            <q-field
              square
              v-model="valores.ppcr"
              label="PPCR (Bs.)"
            >
              <template v-slot:control="{ id, floatingLabel, modelValue, emitValue }">
                <input :id="id" class="q-field__input text-left" :value="modelValue" @change="e => emitValue(e.target.value)" v-money="moneyOptions" v-show="floatingLabel">
              </template>
            </q-field>
          </div>
          <div class="col">
            <!-- <q-input
              square
              label="Financiamiento PNC (Bs.)"
              prefix="Bs. "
              mask="###,###,###,###,###,###,###,###,###,###,###,###,###"
              reverse-fill-mask
              v-model="valores.financiamiento_pnc"
            /> -->
            <q-field
              square
              v-model="valores.financiamiento_pnc"
              label="Financiamiento PNC (Bs.)"
            >
              <template v-slot:control="{ id, floatingLabel, modelValue, emitValue }">
                <input :id="id" class="q-field__input text-left" :value="modelValue" @change="e => emitValue(e.target.value)" v-money="moneyOptions" v-show="floatingLabel">
              </template>
            </q-field>
          </div>
        </div>
        <!-- {{valores.presupuesto_vapsb}} -->
        <div class="col-12 col-md-4">
          <!-- <q-input
            square
            label="Presupuesto Vapsb (Bs.)"
            prefix="Bs. "
            reverse-fill-mask
            v-model="valores.presupuesto_vapsb"
          /> -->
          <q-field
              square
              v-model="valores.presupuesto_vapsb"
              label="Presupuesto Vapsb (Bs.)"
            >
              <template v-slot:control="{ id, floatingLabel, modelValue, emitValue }">
                <input :id="id" class="q-field__input text-left" :value="modelValue" @change="e => emitValue(e.target.value)" v-money="moneyOptions" v-show="floatingLabel">
              </template>
            </q-field>
        </div>

        <div class="col-xs-12 text-right">
          <q-btn
            class="q-ml-sm"
            icon="check"
            color="primary"
            label="actualizar"
            @click="guardar"
          />
        </div>
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn
            @click="boton_validacion"
            icon="arrow_forward"
            color="primary"
            v-if="!isContinueHidden"
            :label="step === 2 ? '' : 'Siguiente'"
          />
          <q-btn
            v-if="step > 1"
            color="primary"
            icon="arrow_back"
            @click="goToPreviousStep"
            label="Atras"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </q-form>
</template>

<script>
import { useVModel } from "../../composables/useVModel.js";
import { ref, onMounted, inject } from "vue";
import validaciones from "../../common/validations";
import message from "../../boot/message";
// import { VMoney } from "v-money3";
import { VMoney3 } from 'v-money3';

const valoresRules = {
  aaaa: [validaciones.requerido],
  inversion_presupuestada: [validaciones.requerido],
  contraparte_local_no_financiera: [validaciones.requerido],
  contratado: [validaciones.requerido],
  total_inversion: [validaciones.requerido],
  total_inversion_mill: [validaciones.requerido],
  proyecto_cuenta_con_ptar: [validaciones.requerido],
  ejecutor_model: [validaciones.requerido],
  lugar_model: [validaciones.requerido],
  codigo_sisin: [validaciones.requerido],
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
    const _message = inject("message");
    const valoresModel = useVModel(props, "valores");
    const url = ref("/realizaciones/?proyecto_id=" + valoresModel.value.id);

    const ejecutorOptions = ref([]);
    const lugarOptions = ref([]);
    const provinciaOptions = ref([]);
    const municipioOptions = ref([]);
    const myForm = ref(null);
    const refs = {};
    const endDate = ref("");
    const currentStep = ref(1);
    const step = ref(1);
    const showConfirmation = ref(false);
    const departamentosOptions = ref([]);
    const provinciasOptions = ref([]);
    const municipiosOptions = ref([]);
    const isContinueHidden = ref(false);
    const stepper = ref(null);
    const valores = ref({
      id: "", //888888888888888888888888888888
      proyecto: valoresModel.value.id,
      fecha_inicio: "",
      fecha_conclusion: "",
      fecha_concl_obra: null,
      conclusion_concl_proy: null,
      fecha_inicio_concl_proy: "",
      fecha_concl_proy: "",
      fecha_concl_proy_obra: "",
      fecha_concl_proy_obra_obra: "",
      avance_fisico: 0,
      financiamiento_externo: "", //revisarrrrrrrrrrrr
      bol: 0, //revisarrrrrrrrrrrr
      ppcr: 0, //revisarrrrrrrrrrrr
      financiamiento_pnc: 0, //revisarrrrrrrrrrrr
      // departamentos_model: "",
      lugar_model: "",
      observacion: "",
      descripcion_conflicto: "",
      avance_financiamiento: 0,
      contraparte_local: null,
      contraparte_local_no_financiera: null,
      contratado: null,
      departamento: "",
      departamento_name: "",
      departamentos: [],
      departamentos_ids: [],
      departamentos_model: [],
      descripcion_conflicto: "",
      empleos_directos: null,
      empleos_indirectos: null,
      gad: null,
      gad_no_financiero: null,
      lugar: "",
      municipio_model: [],
      municipios: [],
      municipios_ids: [],
      municipio_name: "",
      org_financ: "",
      observacion: "",
      ppcr: null,
      presupuesto_vapsb: 0,
      programa: "", //8888888888888888888888888
      provincia: "",
      provincia_model: [],
      provincia_name: "",
      provincias: [],
      provincias_ids: [],
      proyecto_cuenta_con_ptar: "",
      responsable_contraparte: "",
      tipo_conflicto: "",
      tipo_de_proyecto: "",
      tipo_proyecto_detallado: "",
      total_inversion: 0,
      total_inversion_mill: 0,
    });

    const moneyOptions = {
      decimal: ",",
      thousands: ".",
      prefix: "Bs. ",
      suffix: "",
      precision: 2,
      masked: true,
    };

    let numeric={};

    let auxit = 0;

    const presupuestoVapsb = ref(valores.value.presupuesto_vapsb);
    const goToPreviousStep = () => {
      stepper.value.previous();
      isContinueHidden.value = false;
      console.log();
    };
    const restrictDates = (date) => {
      const today = new Date();
      const oneMonthBefore = new Date(today);
      const oneMonthAfter = new Date(today);
      oneMonthBefore.setMonth(today.getMonth() - 2);
      oneMonthAfter.setMonth(today.getMonth() + 2);
      return date >= oneMonthBefore && date <= oneMonthAfter;
    };

    const changedepartamentos = async () => {
      valores.value.provincia_model = [];
      valores.value.municipio_model = [];
      const response = await _http.get(
        "/provincias/?departamento_id=" +
          valores.value.departamentos_model.map((d) => d.id).join(",") +
          `&ordering=departamento__nombre`
      );
      provinciasOptions.value = response.results.map((r) => ({
        ...r,
        nombre: `${r.departamento.nombre} - ${r.nombre}`,
      }));
    };

    const changeprovincia = async () => {
      // console.log(valores.value.provincia_model);
      valores.value.municipio_model = [];
      const response = await _http.get(
        "/municipios/?provincia_id=" +
          valores.value.provincia_model.map((d) => d.id).join(",") +
          `&ordering=provincia__departamento__nombre,provincia__nombre`
      );
      municipioOptions.value = response.results.map((r) => ({
        ...r,
        nombre: `${r.provincia.departamento.nombre} - ${r.provincia.nombre} - ${r.nombre} `,
      }));
    };

    const boton_validacion = () => {
      myForm.value.validate().then((success) => {
        if (success) {
          step.value++;
          isContinueHidden.value = true;
        }
      });
    };

    const cargar_nuevo = async () => {
      const departamentos = await _http.get("/departamentos/");
      departamentosOptions.value = departamentos.results;
      const lugares = await _http.get("/lugares/");
      lugarOptions.value = lugares.results;
    };

    async function cargadatos_modal() {
      console.log("valores:::", valores.value);

      const lugares = await _http.get("/lugares/");
      lugarOptions.value = lugares.results;
      if (valores.value.lugar != null) {
        const bbb = await _http.get("/lugares/" + valores.value.lugar + "/"); //NOMBRE DEL LUGARES
        valores.value.lugar_model = bbb.nombre;
      }
      const departamentos = await _http.get("/departamentos/");
      departamentosOptions.value = departamentos.results;

      valores.value.departamentos_model = valores.value.departamentos;

      const response = await _http.get(
        "/provincias/?departamento_id=" +
          valores.value.departamentos_model.map((d) => d.id).join(",") +
          `&ordering=departamento__nombre`
      );
      provinciasOptions.value = response.results.map((r) => ({
        ...r,
        nombre: `${r.departamento.nombre} - ${r.nombre}`,
      }));
      valores.value.provincia_model = valores.value.provincias;

      const r = await _http.get(
        "/municipios/?provincia_id=" +
          valores.value.provincia_model.map((d) => d.id).join(",") +
          `&ordering=provincia__departamento__nombre,provincia__nombre`
      );
      municipioOptions.value = r.results.map((r) => ({
        ...r,
        nombre: `${r.provincia.departamento.nombre} - ${r.provincia.nombre} - ${r.nombre} `,
      }));
      valores.value.municipio_model = valores.value.municipios;
    }

    onMounted(async () => {
      const response = await _http.get(url.value);

      if (response.results[0] === undefined) {
        // _message.success("Nuevo");
        cargar_nuevo();
      } else {
        valores.value = response.results[0];
        // const num = Math.floor(Number(response.results[0].presupuesto_vapsb));
        // console.log("presupuesto_vapsb ANTES", num);
        // valores.value.presupuesto_vapsb = Math.floor(
        //   Number(response.results[0].presupuesto_vapsb)
        // );
        // console.log("presupuesto_vapsb DESPUES", num);

        cargadatos_modal();
      }
    });

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

    const validaFecha = (val) => {
      const date = new Date(val);
      if (isNaN(date)) {
        return "Fecha inválida";
      }
    };

    const validafechacorrecta = (val) => {
      const date = new Date(val);
      if (isNaN(date)) {
        return "Fecha inválida";
      }
      if (!val) {
        return "La fecha es obligatoria";
      }
    };

    const validateNumber = (val) => {
      if (!val) {
        return "El campo es requerido";
      }
      if (val.toString().length > 249) {
        return "no puede tener más de 250 caracteres";
      }
      return true;
    };

    function parseCurrency(currencyString) {
      console.log(currencyString);
      const sanitizedString = `${currencyString}`
          .replace(/Bs\.\s*/, '')
          .replace(/\./g, '')
          .replace(',', '.')
          .trim();

      return parseFloat(sanitizedString) || 0;
    }

    const guardar = async () => {
      numeric = {}
      const success = await myForm.value.validate();
      if (success) {
        valores.value.lugar = valores.value.lugar_model.id;
        if (valores.value.total_inversion != null) {
          numeric["total_inversion"] = parseCurrency(valores.value.total_inversion)
        }


        if (valores.value.financiamiento_externo != null) {
          numeric["financiamiento_externo"] = parseCurrency(valores.value.financiamiento_externo)
        }

        valores.value.avance_fisico = parseInt(valores.value.avance_fisico);

        if (valores.value.bol != null) {
          numeric["bol"] = parseCurrency(valores.value.bol)
        }

        if (valores.value.ppcr != null) {
          numeric["ppcr"] = parseCurrency(valores.value.ppcr)
        }

        if (valores.value.financiamiento_pnc != null) {
          numeric["financiamiento_pnc"] = parseCurrency(valores.value.financiamiento_pnc)
        }

        if (valores.value.presupuesto_vapsb != null) {
          numeric["presupuesto_vapsb"] = parseCurrency(valores.value.presupuesto_vapsb)
        }

        //DEPARTAMENTOS, PROVINCIAS, MUNICIPIOS
        if (valores.value.departamentos_model != []) {
          valores.value.departamentos_ids =
            valores.value.departamentos_model.map((i) => i.id);
        } else {
          valores.value.departamentos_ids = [];
        }

        if (valores.value.provincia_model != []) {
          valores.value.provincias_ids = valores.value.provincia_model.map(
            (i) => i.id
          );
        } else {
          valores.value.provincias = [];
        }

        if (valores.value.municipio_model != []) {
          valores.value.municipios_ids = valores.value.municipio_model.map(
            (i) => i.id
          );
        } else {
          valores.value.municipios = [];
        }

        console.log("para guardarrrrr:", valores.value);

        if (valores.value.id === "") {
          // GUARDAR NUEVO  REGISTRO
          console.log("es un registrio nuevo");
          await _http.post("/realizaciones/", {...valores.value, ...numeric});
          _message.success("SE REGISTRO CORRECTAMENTE");
        } else {
          await _http.put(
            "/realizaciones/" + valores.value.id + "/",
            {...valores.value, ...numeric}
          );
          _message.success("SE ACTUALIZO CORRECTAMENTE");
        }
      } else {
        _message.error("COMPLETAR TODOS LOS CAMPOS REQUERIDOS");
      }
    };

    return {
      cargar_nuevo,
      url,
      validafechacorrecta,
      validateNumber,
      validaFecha,
      validateDate,
      showConfirmation,
      valoresModel,
      valoresRules,
      cargadatos_modal,
      ejecutorOptions,
      lugarOptions,
      currentStep,
      step,
      departamentosOptions,
      provinciasOptions,
      municipiosOptions,
      provinciaOptions,
      municipioOptions,
      boton_validacion,
      refs,
      myForm,
      endDate,
      changedepartamentos,
      changeprovincia,
      isContinueHidden,
      goToPreviousStep,
      stepper,
      restrictDates,
      valores,
      guardar,
      moneyOptions,
      presupuestoVapsb,
      // money
    };
  },
  watch: {
    // Watch for changes in presupuestoVapsb and update the valores prop accordingly
    presupuestoVapsb(newValue) {
      this.valores.presupuesto_vapsb = newValue;
    },
  },
};
</script>

<style scoped>
/* .q-stepper {
  margin-bottom: 20px;
}
.q-stepper {
  width: 530px;
}
.input-nomal .q-input {
  width: 300px;
}
.q-select {
  width: 290px;
} */

.row {
  margin-bottom: 5px;
}
</style>
