<template>
  <q-page>
    <Titulo titulo="Ficha - Seguimiento" icono="person"></Titulo>
    <!-- {{ $route.params.seguimiento_id }} -->

    <q-dialog v-model="showConfirmation">
      <q-card>
        <q-card-section>
          <div class="text-h6 text-weight-bold">Mensaje de Confirmación</div>
          <div>¿Estás seguro aceptar el informe Actual?</div>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn
            flat
            label="NO"
            color="primary"
            @click="showConfirmation = false"
          />
          <q-btn flat label="SI" color="negative" @click="cambiar_estado" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="show_rechazo">
      <q-card style="min-width: 500px; min-height: 300px">
        <q-card-section>
          <div class="text-h6 text-weight-bold">Registre las Observaciones</div>
          <q-form @submit="onSubmit" ref="myForm">
            <q-input
              v-model="observacion_estado"
              class="col-xs-12 col-md-3"
              type="textarea"
              label=""
              outlined
              maxlength="250"
              counter
              square
              :rules="[
                (val) => !!val || 'Este campo es requerido',
                (val) =>
                  (val && val.length >= 25) ||
                  'Debe tener al menos 25 caracteres',
                (val) => (val && val.length <= 250) || 'Máximo 250 caracteres',
              ]"
              ref="inputObservacion"
            />
          </q-form>
        </q-card-section>
        <q-separator />
        <q-card-actions align="center">
          <q-btn
            label="No, enviar"
            color="primary"
            @click="show_rechazo = false"
          />
          <q-btn
            label="Sí, enviar"
            color="primary"
            @click="guardar_observacion"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-card class="elegant-card">
      <q-card-section class="header-section">
        <div class="row justify-end">
          <q-btn
            @click="goBack"
            icon="arrow_back"
            label="Volver"
            color="primary"
            class="btn-back"
          />
        </div>
      </q-card-section>
      <h4 class="centered-text">{{ ficha_seguimiento.proyecto_name }}</h4>
      <q-card-section>
        <!-- Sección de Información Actual -->
        <div class="section-header bg-primary text-white text-center">
          INFORMACIÓN ACTUAL
        </div>

        <q-item class="q-mb-md">
          <q-item-section>
            <q-markup-table
              :separator="separator"
              flat
              bordered
              class="custom-table"
            >
              <thead>
                <!-- Encabezado opcional si es necesario -->
              </thead>
              <tbody>
                <tr>
                  <td class="text-left text-h6"><b>Mes:</b></td>
                  <td class="text-left">{{ ficha_seguimiento.mes }}</td>
                  <td class="text-left text-h6"><b>Año:</b></td>
                  <td class="text-left">{{ ficha_seguimiento.anio }}</td>
                </tr>
                <tr>
                  <td class="text-left text-h6">
                    <b>Acumulado Porcentaje Físico Mes:</b>
                  </td>
                  <td class="text-left">
                    {{ ficha_seguimiento.acumulado_porcentaje_fisico_mes }}
                  </td>
                  <td class="text-left text-h6">
                    <b>Acumulado Porcentaje Financiero Mes:</b>
                  </td>
                  <td class="text-left">
                    {{ ficha_seguimiento.acumulado_porcentaje_financiero_mes }}
                  </td>
                </tr>
                <tr>
                  <td class="text-left text-h6"><b>Observación:</b></td>
                  <td class="text-left">{{ ficha_seguimiento.observacion }}</td>
                  <td class="text-left text-h6">
                    <b>Saldo Programado Proyecto:</b>
                  </td>
                  <td class="text-left">
                    {{
                      formatNumber(ficha_seguimiento.saldo_programado_proyecto)
                    }}
                  </td>
                </tr>
                <tr>
                  <td class="text-left text-h6">
                    <b>Avance Financiero Mes:</b>
                  </td>
                  <td class="text-left">
                    {{ ficha_seguimiento.avance_financiero_mes }}
                  </td>
                  <td class="text-left text-h6">
                    <b>Acumulado Financiero Mes:</b>
                  </td>
                  <td class="text-left">
                    {{
                      formatNumber(ficha_seguimiento.acumulado_financiero_mes)
                    }}
                  </td>
                </tr>
                <tr>
                  <td class="text-left text-h6">
                    <b>Porcentaje Avance Financiero Mes:</b>
                  </td>
                  <td class="text-left">
                    {{ ficha_seguimiento.porcentaje_avance_financiero_mes }}
                  </td>
                  <td class="text-left text-h6">
                    <b>Porcentaje Avance Físico Mes:</b>
                  </td>
                  <td class="text-left">
                    {{ ficha_seguimiento.porcentaje_avance_fisico_mes }}
                  </td>
                </tr>
                <tr>
                  <td class="text-left text-h6">
                    <b>Porcentaje Resto Financiero Mes:</b>
                  </td>
                  <td class="text-left">
                    {{ ficha_seguimiento.porcentaje_resto_financiero_mes }}
                  </td>
                  <td class="text-left text-h6">
                    <b>Total Programado Proyecto:</b>
                  </td>
                  <td class="text-left">
                    {{
                      formatNumber(ficha_seguimiento.total_programado_proyecto)
                    }}
                  </td>
                </tr>
                <tr>
                  <td class="text-left text-h6">
                    <b>Documento de Respaldo:</b>
                  </td>
                  <td class="text-left" colspan="3">
                    <div
                      v-if="ficha_seguimiento.documento_respaldo_avance"
                      class="text-center"
                    >
                      <q-btn
                        color="primary"
                        label="Ver Archivo"
                        icon="visibility"
                        @click="
                          openImageInNewTab(
                            ficha_seguimiento.documento_respaldo_avance
                          )
                        "
                        class="btn-view"
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </q-markup-table>
          </q-item-section>
        </q-item>

        <q-separator class="q-mb-md" />

        <div
          class="section-header bg-red text-white text-center"
          v-if="observacion_estado"
        >
          OBS:<b>{{ observacion_estado }}</b>
        </div>

        <q-separator class="q-mb-md" />
        <!-- Sección de Imágenes -->
        <div class="section-header bg-primary text-white text-center">
          IMÁGENES
        </div>

        <q-item class="q-mb-md">
          <q-item-section>
            <q-markup-table
              :separator="separator"
              flat
              bordered
              class="custom-table"
            >
              <thead>
                <tr>
                  <th class="text-center">Imagen 1</th>
                  <th class="text-center">Imagen 2</th>
                  <th class="text-center">Imagen 3</th>
                  <th class="text-center">Imagen 4</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="text-center">
                    <img
                      v-if="ficha_seguimiento.fotografia_1"
                      :src="ficha_seguimiento.fotografia_1"
                      alt="Imagen 1"
                      class="table-image"
                    />
                    <img
                      v-else
                      :src="defaultImage"
                      alt="Imagen por defecto"
                      class="table-image"
                    />
                  </td>
                  <td class="text-center">
                    <img
                      v-if="ficha_seguimiento.fotografia_2"
                      :src="ficha_seguimiento.fotografia_2"
                      alt="Imagen 1"
                      class="table-image"
                    />
                    <img
                      v-else
                      :src="defaultImage"
                      alt="Imagen por defecto"
                      class="table-image"
                    />
                  </td>
                  <td class="text-center">
                    <img
                      v-if="ficha_seguimiento.fotografia_3"
                      :src="ficha_seguimiento.fotografia_3"
                      alt="Imagen 1"
                      class="table-image"
                    />
                    <img
                      v-else
                      :src="defaultImage"
                      alt="Imagen por defecto"
                      class="table-image"
                    />
                  </td>
                  <td class="text-center">
                    <img
                      v-if="ficha_seguimiento.fotografia_4"
                      :src="ficha_seguimiento.fotografia_4"
                      alt="Imagen 1"
                      class="table-image"
                    />
                    <img
                      v-else
                      :src="defaultImage"
                      alt="Imagen por defecto"
                      class="table-image"
                    />
                  </td>
                </tr>
              </tbody>
            </q-markup-table>
          </q-item-section>
        </q-item>
      </q-card-section>

      <q-card-section>
        <!-- Sección de Información Anterior -->
        <div v-if="ficha_seguimiento_anterior != null">
          <div class="section-header bg-cyan-6 text-white text-center">
            INFORMACIÓN ANTERIOR
          </div>

          <q-item class="q-mb-md">
            <q-item-section>
              <q-markup-table
                :separator="separator"
                flat
                bordered
                class="custom-table"
              >
                <thead>
                  <!-- Encabezado opcional si es necesario -->
                </thead>
                <tbody>
                  <tr>
                    <td class="text-left text-h6"><b>Mes:</b></td>
                    <td class="text-left">
                      {{ ficha_seguimiento_anterior.mes }}
                    </td>
                    <td class="text-left text-h6"><b>Año:</b></td>
                    <td class="text-left">
                      {{ ficha_seguimiento_anterior.anio }}
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left text-h6">
                      <b>Acumulado Porcentaje Físico Mes:</b>
                    </td>
                    <td class="text-left">
                      {{
                        ficha_seguimiento_anterior.acumulado_porcentaje_fisico_mes
                      }}
                    </td>
                    <td class="text-left text-h6">
                      <b>Acumulado Porcentaje Financiero Mes:</b>
                    </td>
                    <td class="text-left">
                      {{
                        ficha_seguimiento_anterior.acumulado_porcentaje_financiero_mes
                      }}
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left text-h6"><b>Observación:</b></td>
                    <td class="text-left">
                      {{ ficha_seguimiento_anterior.observacion }}
                    </td>
                    <td class="text-left text-h6">
                      <b>Saldo Programado Proyecto:</b>
                    </td>
                    <td class="text-left">
                      {{
                        formatNumber(
                          ficha_seguimiento_anterior.saldo_programado_proyecto
                        )
                      }}
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left text-h6">
                      <b>Avance Financiero Mes:</b>
                    </td>
                    <td class="text-left">
                      {{
                        formatNumber(
                          ficha_seguimiento_anterior.avance_financiero_mes
                        )
                      }}
                    </td>
                    <td class="text-left text-h6">
                      <b>Acumulado Financiero Mes:</b>
                    </td>
                    <td class="text-left">
                      {{
                        formatNumber(
                          ficha_seguimiento_anterior.acumulado_financiero_mes
                        )
                      }}
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left text-h6">
                      <b>Porcentaje Avance Financiero Mes:</b>
                    </td>
                    <td class="text-left">
                      {{
                        ficha_seguimiento_anterior.porcentaje_avance_financiero_mes
                      }}
                    </td>
                    <td class="text-left text-h6">
                      <b>Porcentaje Avance Físico Mes:</b>
                    </td>
                    <td class="text-left">
                      {{
                        ficha_seguimiento_anterior.porcentaje_avance_fisico_mes
                      }}
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left text-h6">
                      <b>Porcentaje Resto Financiero Mes:</b>
                    </td>
                    <td class="text-left">
                      {{
                        ficha_seguimiento_anterior.porcentaje_resto_financiero_mes
                      }}
                    </td>
                    <td class="text-left text-h6">
                      <b>Total Programado Proyecto:</b>
                    </td>
                    <td class="text-left">
                      {{
                        formatNumber(
                          ficha_seguimiento_anterior.total_programado_proyecto
                        )
                      }}
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left text-h6">
                      <b>Documento de Respaldo:</b>
                    </td>
                    <td class="text-left" colspan="3">
                      <div
                        v-if="
                          ficha_seguimiento_anterior.documento_respaldo_avance
                        "
                        class="text-center"
                      >
                        <q-btn
                          color="primary"
                          label="Ver Archivo"
                          icon="visibility"
                          @click="
                            openImageInNewTab_anterior(
                              ficha_seguimiento_anterior.documento_respaldo_avance
                            )
                          "
                          class="btn-view"
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </q-markup-table>
            </q-item-section>
          </q-item>

          <q-separator class="q-mb-md" />

          <!-- Sección de Imágenes -->
          <div class="section-header bg-cyan-6 text-white text-center">
            IMÁGENES
          </div>

          <q-item class="q-mb-md">
            <q-item-section>
              <q-markup-table
                :separator="separator"
                flat
                bordered
                class="custom-table"
              >
                <thead>
                  <tr>
                    <th class="text-center">Imagen 1</th>
                    <th class="text-center">Imagen 2</th>
                    <th class="text-center">Imagen 3</th>
                    <th class="text-center">Imagen 4</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="text-center">
                      <img
                        v-if="ficha_seguimiento_anterior.fotografia_1"
                        :src="ficha_seguimiento_anterior.fotografia_1"
                        alt="Imagen 1"
                        class="table-image"
                      />
                      <img
                        v-else
                        :src="defaultImage"
                        alt="Imagen por defecto"
                        class="table-image"
                      />
                    </td>
                    <td class="text-center">
                      <img
                        v-if="ficha_seguimiento_anterior.fotografia_2"
                        :src="ficha_seguimiento_anterior.fotografia_2"
                        alt="Imagen 1"
                        class="table-image"
                      />
                      <img
                        v-else
                        :src="defaultImage"
                        alt="Imagen por defecto"
                        class="table-image"
                      />
                    </td>
                    <td class="text-center">
                      <img
                        v-if="ficha_seguimiento_anterior.fotografia_3"
                        :src="ficha_seguimiento_anterior.fotografia_3"
                        alt="Imagen 1"
                        class="table-image"
                      />
                      <img
                        v-else
                        :src="defaultImage"
                        alt="Imagen por defecto"
                        class="table-image"
                      />
                    </td>
                    <td class="text-center">
                      <img
                        v-if="ficha_seguimiento_anterior.fotografia_4"
                        :src="ficha_seguimiento_anterior.fotografia_4"
                        alt="Imagen 1"
                        class="table-image"
                      />
                      <img
                        v-else
                        :src="defaultImage"
                        alt="Imagen por defecto"
                        class="table-image"
                      />
                    </td>
                  </tr>
                </tbody>
              </q-markup-table>
            </q-item-section>
          </q-item>
        </div>
        <div
          v-if="
            rol === 'ADMINISTRADOR SECTOR' || rol === 'ADMINISTRADOR MINISTERIO'
          "
          class="row justify-center"
        >
          <template v-if="estado_seguimiento != 'aprobado'">
            <div class="text-center mt-4" style="margin-right: 20px">
              <q-btn
                color="primary"
                label="Validar Seguimiento"
                @click="showConfirmation = true"
                class="btn-accept"
              />
            </div>

            <div class="text-center mt-4" style="margin-left: 20px">
              <q-btn
                color="primary"
                label="Observar Seguimiento"
                @click="show_rechazo = true"
                class="btn-accept"
              />
            </div>
          </template>
        </div>
      </q-card-section>
    </q-card>

    <br />

    <!-- <q-btn
        color="primary"
        icon="print"
        label="Descargar Archivo"
        @click="downloadFicha(ejecucion.proyecto_general.id)"
        download
      /> -->
  </q-page>
</template>

<script>
import { ref, inject, onMounted } from "vue";
import CrudTable from "@components/common/CrudTable";
import Seguimiento from "components/Formularios/Seguimiento.vue";
import { useQuasar } from "quasar";
import { useRoute } from "vue-router";
import defaultImage from "../assets/header-4.png";
// import MapView2 from "@components/common/MapView2.vue";

export default {
  components: { CrudTable, Seguimiento },
  name: "FichaSeguimiento",
  setup() {
    const rol = ref("");
    const route = useRoute();
    const _storage = inject("storage");
    const formRef = ref(null);
    const seguimiento_id = ref(route.params.seguimiento_id);
    const _http = inject("http");
    const _message = inject("message");
    const separator = ref("cell"); //'Horizontal' 'cell' 'vertical' 'none'
    const ejecucion = ref(null);
    const showConfirmation = ref(false);
    const ficha_seguimiento_anterior = ref({});
    const observacion_estado = ref("");
    const inputObservacion = ref(null);
    const myForm = ref(null);
    const estado_seguimiento = ref("");

    const cambiar_estado = () => {
      _http.put(
        "/aprobacion-seguimiento/?seguimiento_id=" + seguimiento_id.value
      );
      showConfirmation.value = false;
      window.history.back();
      _message.success("SE CAMBIO EL ESTADO DEL REGISTRO , ACTUALIZE LA TABLA");
    };

    const onSubmit = () => {
      form.value.validate().then((success) => {
        if (success) {
          console.log("Form is valid, submitting...");
          // Handle form submission (e.g., send data to a server)
        } else {
          console.log("Form is invalid, please correct the errors.");
        }
      });
    };

    const show_rechazo = ref(false);
    const goBack = () => {
      window.history.back();
    };

    // const url_seguimientos = ref("/seguimientos/");

    const ficha_seguimiento = ref({
      mes: null,
      anio: null,
      avance_financiero_mes: null,
      porcentaje_avance_fisico_mes: null,
      // realizacion: realizacionId.value,
      observacion: null,
      fotografia_1: null,
      fotografia_2: null,
      fotografia_3: null,
      fotografia_4: null,
      documento_respaldo_avance: null,
      estado_proyecto: 2,
      file: null,
    });

    const resetForm = () => {
      ficha_seguimiento.value = {
        mes: null,
        anio: null,
        avance_financiero_mes: null,
        porcentaje_avance_fisico_mes: null,
        // realizacion: realizacionId.value,
        observacion: null,
        fotografia_1: null,
        fotografia_2: null,
        fotografia_3: null,
        fotografia_4: null,
        documento_respaldo_avance: null,
        estado_proyecto: 2,
        file: null,
      };
    };

    const formatNumber = (value) => {
      if (value || value === 0) {
        // Convertir a cadena para asegurar que todos los números sean tratados correctamente
        let [integerPart, decimalPart] = value.toString().split(".");

        // Formatear la parte entera con puntos como separadores de miles
        integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        // Si existe una parte decimal, agregarla con una coma
        if (decimalPart) {
          return `${integerPart},${decimalPart}`;
        }

        return integerPart;
      } else {
        return value;
      }
    };

    const openModal = async (open, id) => {
      resetForm();
      if (id) {
        Seguimiento.value = await _http.get(`${url_realizacion.value}${id}/`);
      }
      open();
    };

    const closeModal = (close) => {
      resetForm();
      close();
    };

    const guardar = async (update, close) => {
      const mensaje = !Seguimiento.value.id
        ? "Menu creado de manera exitosa."
        : "Menu actualizado de manera exitosa.";
      if (Seguimiento.value.id) {
        await _http.put(
          `${url.value}${Seguimiento.value.id}/`,
          Seguimiento.value
        );
      } else {
      }
      _message.success(mensaje);
      await update();
      closeModal(close);
    };

    const guardar_observacion = async () => {
      try {
        const success = await myForm.value.validate();
        if (success) {
          await _http.put(
            "/rechazar-seguimiento/?observacion=" +
              observacion_estado.value +
              "&seguimiento_id=" +
              seguimiento_id.value
          );
          show_rechazo.value = false;
          _message.success("Observación guardada de manera exitosa.");

          const response = await _http.get(
            "/seguimientos/" + seguimiento_id.value + "/"
          );
          Seguimiento.value = response;
          // Cerrar el diálogo después de guardar
          show_rechazo.value = false;
          window.history.back();
        }
      } catch (error) {
        console.error("Error al guardar la observación:", error);
        _message.error("Error al guardar la observación.");
      }
    };

    onMounted(async () => {
      const usuario = _storage.get("usuario");
      rol.value = usuario.rol;

      const response = await _http.get(
        "/revision-seguimiento/" + route.params.seguimiento_id + "/"
      );

      ficha_seguimiento.value = response.actual;
      ficha_seguimiento_anterior.value = response.anterior;
      console.log('ficha_seguimiento.value',ficha_seguimiento.value);
      observacion_estado.value = ficha_seguimiento.value.observacion_estado;

      estado_seguimiento.value = ficha_seguimiento.value.estado_seguimiento;
    });

    const openImageInNewTab = (val) => {
      console.log("valllll", val);
      const imageUrl = val;
      window.open(imageUrl, "_blank");
    };

    const openImageInNewTab_anterior = (val) => {
      const imageUrl = val;
      window.open(imageUrl, "_blank");
    };

    return {
      seguimiento_id,
      Seguimiento,
      closeModal,
      openModal,
      guardar,
      ficha_seguimiento,
      ejecucion,
      goBack,
      separator,
      cambiar_estado,
      showConfirmation,
      ficha_seguimiento_anterior,
      defaultImage,
      show_rechazo,
      guardar_observacion,
      observacion_estado,
      rol,
      inputObservacion,
      formatNumber,
      onSubmit,
      myForm,
      openImageInNewTab,
      openImageInNewTab_anterior,
      estado_seguimiento,
    };
  },
};
</script>

<style>
.elegant-card {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.centered-text {
  text-align: center;
}

.header-section {
  background-color: #f5f5f5;
}

.section-header {
  padding: 12px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 1.2em;
}

.custom-table {
  margin-top: 10px;
}

.table-image {
  max-width: 100px;
  height: auto;
}

.btn-back {
  margin-top: 10px;
}

.btn-download,
.btn-accept {
  margin-top: 10px;
}

.table-icon {
  font-size: 35px;
  /* Ajusta el tamaño del ícono según sea necesario */
  color: grey;
  /* Ajusta el color del ícono si lo deseas */
}
</style>
