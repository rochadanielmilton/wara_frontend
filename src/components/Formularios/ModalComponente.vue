<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn
      color="secondary"
      icon="person_add"
      label="Adicion Usuario"
      @click="alert = true"
    />

    <q-dialog v-model="alert" persistent>
      <q-card style="min-width: 50vw; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">
            <q-icon name="person_add" /> ADICIONAR USUARIO
          </div>
        </q-card-section>

        <q-form @submit="guardar" @reset="onReset" greedy>
          <q-card-section class="q-pt-none">
            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-6">
                <q-input
                  v-model="usuario.first_name"
                  :rules="valoresRules.first_name"
                  label="Nombre"
                  filled
                />
              </div>
              <div class="col-12 col-md-6">
                <q-input
                  v-model="usuario.last_name"
                  :rules="valoresRules.last_name"
                  label="Apellido Paterno"
                  filled
                />
              </div>
            </div>

            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-6">
                <q-input
                  v-model="usuario.second_last_name"
                  label="Apellido Materno"
                  filled
                />
              </div>
              <div class="col-12 col-md-6">
                <q-input
                  v-model="usuario.username"
                  :rules="valoresRules.username"
                  label="USUARIO"
                  filled
                />
              </div>
            </div>

            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-6">
                <q-input
                  v-model="usuario.email"
                  :rules="valoresRules.email"
                  label="Correo"
                  filled
                />
              </div>
              <div class="col-12 col-md-6">
                <q-input
                  v-model="usuario.password"
                  :rules="valoresRules.password"
                  type="password"
                  label="Contraseña"
                  filled
                />
              </div>
            </div>
            <div >
              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-12">
                  <q-select
                    v-model="usuario.tipo"
                    :rules="valoresRules.tipo"
                    :options="tiposOptions"
                    label="Tipo"
                    filled
                  />
                </div>
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-6">
                  <q-select
                    v-if="!isMinisterio"
                    v-model="usuario.viceministerio_id"
                    :options="viceministeriosOptions"
                    :rules="valoresRules.viceministerio_id"
                    label="Viceministerio"
                    option-value="id"
                    option-label="nombre"
                    emit-value
                    map-options
                    filled
                  />
                  <q-select
                    v-if="isMinisterio"
                    v-model="usuario.estructura_organizativa_id"
                    :rules="valoresRules.estructura_organizativa_id"
                    :options="estructurasOrganizativas"
                    label="Estructura Organizativa"
                    option-value="id"
                    option-label="nombre"
                    emit-value
                    map-options
                    filled
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-select
                    v-if="!isMinisterio"
                    v-model="usuario.sector_id"
                    :rules="valoresRules.sector_id"
                    :options="sectores"
                    label="Sector"
                    option-value="id"
                    option-label="nombre"
                    emit-value
                    map-options
                    filled
                  />
                  <q-select
                    v-model="usuario.cargo_id"
                    :rules="valoresRules.cargo_id"
                    :options="cargosOptions"
                    label="Cargo"
                    option-value="id"
                    option-label="nombre"
                    emit-value
                    map-options
                    filled
                  />
                </div>
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-6">
                  <q-select
                    v-model="usuario.group_id"
                    :rules="valoresRules.group_id"
                    :options="groups"
                    label="Rol"
                    option-value="id"
                    option-label="name"
                    emit-value
                    map-options
                    filled
                  />
                </div>
              </div>

              <div v-for="(messages, field) in errors" :key="field">
                <q-alert
                  v-for="(message, index) in messages"
                  :key="index"
                  color="red"
                  icon="warning"
                >
                  <div style="color: red">{{ message }}</div>
                </q-alert>
              </div>
            </div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn type="submit" icon="check" color="primary" label="Guardar" />
            <q-btn
              type="reset"
              class="q-ml-sm"
              icon="close"
              label="Cancelar"
              @click="alert = false"
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref, inject, onMounted, watch, computed } from "vue";
import validaciones from "../../common/validations";
import { tipos } from "src/constants/usuarios";

export default {
  setup(props, ctx) {
    const _http = inject("http");
    const _message = inject("message");

    const usuario = ref({
      username: null,
      email: null,
      first_name: null,
      last_name: null,
      second_last_name: null,
      group_id: null,
      menus_ids: [],
      permissions_ids: [],
      cargo_id: null,
      viceministerio_id: null,
      descentralizada_id: null,
      tipo: tipos.MINISTERIO,
    });

    const errors = ref({});

    const alert = ref(false);
    const cargosOptions = ref([]);
    const viceministeriosOptions = ref([]);
    const tiposOptions = ref([tipos.MINISTERIO, tipos.SECTOR]);
    const estructurasOrganizativas = ref([]);
    const groups = ref([]);
    const sectores = ref([]);

    watch(
      () => usuario.value.tipo,
      async (newTipo) => {
        cargosOptions.value = [];
        groups.value = [];
        groups.value = (await _http.get(`/roles/?tipo=${newTipo}`)).results;
        usuario.value.estructura_organizativa_id = null;
        usuario.value.cargo_id = null;
        usuario.group_id = null;
      }
    );

    watch(
      () => usuario.value.estructura_organizativa_id,
      async (newEstructuraOrganizativaId) => {
        if (!newEstructuraOrganizativaId) return;
        usuario.value.cargo_id = null;
        cargosOptions.value = [];
        cargosOptions.value = (
          await _http.get(
            `/cargos/?estructura_organizativa_id=${newEstructuraOrganizativaId}`
          )
        ).results;
      }
    );

    watch(
      () => usuario.value.viceministerio_id,
      async (newViceministerioId) => {
        if (!newViceministerioId) return;

        usuario.value.sector_id = null;
        sectores.value = [];
        sectores.value = (
          await _http.get(`/sectores/?viceministerio_id=${newViceministerioId}`)
        ).results;
      }
    );

    watch(
      () => usuario.value.sector_id,
      async (newSectorId) => {
        if (!newSectorId) return;

        usuario.value.cargo_id = null;
        const sector = sectores.value.find((s) => s.id == newSectorId);
        cargosOptions.value = [];
        cargosOptions.value = (
          await _http.get(`/cargos/?sector=${sector.nombre}`)
        ).results;
      }
    );

    const isMinisterio = computed(() => {
      return usuario.value.tipo === tipos.MINISTERIO;
    });

    const valoresRules = computed(() => {
      const rules = {
        password: [validaciones.requerido],
        username: [validaciones.requerido],
        first_name: [validaciones.requerido],
        last_name: [validaciones.requerido],
        email: [validaciones.requerido, validaciones.correo],
        second_last_name: [validaciones.requerido],
        tipo: [validaciones.requerido],
        cargo_id: [validaciones.requerido],
        group_id: [validaciones.requerido],
        estructura_organizativa_id: [],
      };

      if (isMinisterio.value) {
        rules.estructura_organizativa_id = [validaciones.requerido];
      }

      if (!isMinisterio.value) {
        rules.sector_id = [validaciones.requerido];
        rules.viceministerio_id = [validaciones.requerido];
      }

      return rules;
    });

    onMounted(async () => {
      llenar_selects();
    });

    const guardar = async () => {
      errors.value = {};
      try {
        await _http.post("/users/", usuario.value);
        _message.success("INSERTADO CORRECTAMENTE , actualizar tabla");
        alert.value = false;
        usuario.value = {
          username: null,
          email: null,
          first_name: null,
          last_name: null,
          second_last_name: null,
          group_id: null,
          menus_ids: [],
          permissions_ids: [],
          cargo_id: null,
          viceministerio_id: null,
          descentralizada_id: null,
          tipo: tipos.MINISTERIO,
        };
        ctx.emit("reload");
      } catch (error) {
        if (error.response.status == 400) {
          errors.value = error.response.data;
        }
      }
    };

    const onReset = () => {};

    const llenar_selects = async () => {
      viceministeriosOptions.value = (
        await _http.get("/viceministerios/")
      ).results;
      estructurasOrganizativas.value = (
        await _http.get("/estructuras-organizativas/?area_id=2")
      ).results;
      groups.value = (
        await _http.get(`/roles/?tipo=${tipos.MINISTERIO}`)
      ).results;
    };

    return {
      alert,
      errors,
      guardar,
      valoresRules,
      usuario,
      cargosOptions,
      estructurasOrganizativas,
      groups,
      viceministeriosOptions,
      tiposOptions,
      isMinisterio,
      sectores,
      onReset,
    };
  },
};
</script>

<style scoped>
.row {
  margin-bottom: 5px;
}
.border-green {
  border: 2px solid rgb(93, 99, 38);
  border-radius: 4px; /* Opcional: para bordes redondeados */
  padding: 10px; /* Opcional: para agregar espacio alrededor del input */
}

.border-green .q-input__control {
  border: none; /* Evita duplicar el borde del q-input */
}
</style>
