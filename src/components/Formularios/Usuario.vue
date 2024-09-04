<template>
  <q-form class="row q-col-gutter-md" @submit="$emit('guardar')">
    <div class="col-md-6">
      <q-input
        v-model="valoresModel.first_name"
        label="Nombre"
        filled
        :rules="valoresRules.first_name"
      />
    </div>
    <div class="col-md-6">
      <q-input
        v-model="valoresModel.last_name"
        label="Apellido Paterno"
        filled
        :rules="valoresRules.last_name"
      />
    </div>

    <div class="col-md-6">
      <q-input
        v-model="valoresModel.second_last_name"
        label="Apellido Materno"
        filled
      />
    </div>
    <div class="col-md-6">
      <q-input
        v-model="valoresModel.username"
        label="USUARIO"
        filled
        :rules="valoresRules.username"
      />
      <div v-if="usernameError" class="text-negative">
        {{ usernameError }}
      </div>
    </div>

    <div class="col-md-6">
      <q-input
        v-model="valoresModel.email"
        label="Correo"
        filled
        :rules="valoresRules.email"
      />
    </div>

    <!-- //************* */ -->
    <div v-if="visibles" class="col-md-6">
      <q-btn
        label="Actualizar Contraseña"
        color="primary"
        @click="updatePassword"
      />
    </div>

    <div v-if="showNewPasswordFields" class="col-md-6">
      <q-input
        v-model="valoresModel.password1"
        label="Contraseña Nueva"
        type="password"
        square
        filled
      />
    </div>

    <div v-if="showNewPasswordFields" class="col-md-6">
      <q-input
        v-model="valoresModel.password2"
        label="Confirmar Contraseña"
        type="password"
        :rules="password2Rules"
        square
        filled
      />
    </div>

    <!-- ******************** -->
    <div v-if="!showNewPasswordFields && !visibles" class="col-md-6">
      <q-input
        v-model="valoresModel.password"
        type="password"
        label="Contraseña"
        filled
        :rules="[
          (val) =>
            (val && val.length >= 6) ||
            'La contraseña debe tener al menos 6 caracteres',
        ]"
      />
      <div v-if="passwordError" class="text-negative">
        {{ passwordError }}
      </div>
    </div>

    <div class="col-md-6">
      <q-select
        v-model="valoresModel.tipo"
        :rules="valoresRules.tipo"
        :options="tiposOptions"
        label="Tipo"
        filled
      />
    </div>
    <div class="col-md-6">
      <q-select
        v-if="!isMinisterio"
        v-model="valoresModel.viceministerio_id"
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
        v-model="valoresModel.estructura_organizativa_id"
        :options="estructurasOrganizativas"
        :rules="valoresRules.estructura_organizativa_id"
        label="Estructura Organizativa"
        option-value="id"
        option-label="nombre"
        emit-value
        map-options
        filled
      />
    </div>

    <div class="col-md-6">
      <q-select
        v-if="!isMinisterio"
        v-model="valoresModel.sector_id"
        :rules="valoresRules.sector_id"
        :options="sectores"
        label="Sector"
        option-value="id"
        option-label="nombre"
        emit-value
        map-options
        filled
      />
    </div>
    <div class="col-md-6">
      <q-select
        v-model="valoresModel.cargo_id"
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

    <div class="col-md-6">
      <q-select
        v-model="valoresModel.group_id"
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
    <template v-if="visibles">
      <div class="col-md-12">
        <div class="text-h6 q-mb-md">PERMISOS</div>
        <q-select
          v-model="selectpermisoid"
          :options="valoresModel.permissions"
          label="permisos asignados"
          option-value="id"
          option-label="name"
        />
      </div>

      <div class="col-md-12">
        <q-select
          square
          v-model="valoresModel.permisosnuevoModel"
          :options="permisosnuevoOptions"
          label="+ Asignar Nuevo Permiso"
          option-value="id"
          option-label="name"
          multiple
          emit-value
          map-options
        >
          <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
            <q-item v-bind="itemProps">
              <q-item-section>
                <q-item-label v-html="opt.name" />
              </q-item-section>
              <q-item-section side>
                <q-toggle
                  :model-value="selected"
                  @update:model-value="toggleOption(opt)"
                />
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>

      <div class="text-h6 q-mb-md">MENU</div>
      <div class="col-md-12">
        <q-select
          v-model="selectmenuid"
          label="Menus Asignados"
          :options="valoresModel.menu"
          option-value="id"
          option-label="nombre"
        />
      </div>
      <div class="col-md-12">
        <pre>Asignar Nuevos Menus</pre>
        <q-select
          square
          v-model="valoresModel.menunuevoModel"
          :options="menunuevoOptions"
          option-value="id"
          option-label="nombre"
          multiple
          emit-value
          map-options
        >
          <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
            <q-item v-bind="itemProps">
              <q-item-section>
                <q-item-label v-html="opt.nombre" />
              </q-item-section>
              <q-item-section side>
                <q-toggle
                  :model-value="selected"
                  @update:model-value="toggleOption(opt)"
                />
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
    </template>

    <div class="col-md-6">
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
import { ref, inject, onMounted, watch, computed } from "vue";
import validaciones from "../../common/validations";
import IconListOriginal from "../../common/IconList";
import { tipos } from "src/constants/usuarios";

// const valoresRules = {
//   password: [validaciones.requerido],
//   username: [validaciones.requerido],
//   first_name: [validaciones.requerido],
//   last_name: [validaciones.requerido],
//   email: [validaciones.requerido, validaciones.correo],
//   second_last_name: [validaciones.requerido],
//   tipo: [validaciones.requerido],
//   cargo_id: [validaciones.requerido],
//   group_id: [validaciones.requerido],
//   estructura_organizativa_id: [],
// };

export default {
  props: {
    valores: {
      type: Object,
      default: () => ({}),
    },
    visibles: {
      type: Boolean,
      default: () => ({}),
    },
    passwordError: {
      type: Text,
      default: () => "",
    },
    usernameError: {
      type: Text,
      default: () => "",
    },
  },
  setup(props) {
    const valoresModel = useVModel(props, "valores");
    const menus = ref([]);
    const IconList = ref(IconListOriginal);
    const _http = inject("http");
    const errors = ref({});
    const alert = ref(false);
    const cargosOptions = ref([]);
    const viceministeriosOptions = ref([]);
    const tiposOptions = ref([tipos.MINISTERIO, tipos.SECTOR]);
    const estructurasOrganizativas = ref([]);
    const groups = ref([]);
    const sectores = ref([]);
    const selectmenuid = ref();
    const selectpermisoid = ref("");
    const permisosnuevoModel = ref([]);
    const permisosnuevoOptions = ref([]);
    const menunuevoModel = ref([]);
    const menunuevoOptions = ref([]);
    const showNewPasswordFields = ref(false);

    const valoresRules = computed(() => {
      const rules = {
        password: [validaciones.contrasena],
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
        // rules.estructura_organizativa_id = [validaciones.requerido];
      }

      if (!isMinisterio.value) {
        rules.sector_id = [validaciones.requerido];
        rules.viceministerio_id = [validaciones.requerido];
      }

      return rules;
    });

    // Regla condicional para password2
    const password2Rules = computed(() => {
      const rules = [];
      if (valoresModel.value.password1) {
        rules.push((val) => !!val || "Confirmar la contraseña es obligatorio");
        rules.push(
          (val) =>
            val === valoresModel.value.password1 ||
            "Las contraseñas no coinciden"
        );
      }
      return rules;
    });

    watch(
      () => valoresModel.value.tipo,
      async (newTipo) => {
        cargosOptions.value = [];
        groups.value = [];
        groups.value = (await _http.get(`/roles/?tipo=${newTipo}`)).results;
        valoresModel.value.estructura_organizativa_id = null;
        valoresModel.value.cargo_id = null;
        valoresModel.value.group_id = null;
        valoresModel.value.sector_id = null;
      }
    );

    watch(
      () => valoresModel.value.estructura_organizativa_id,
      async (newEstructuraOrganizativaId) => {
        if (!newEstructuraOrganizativaId) return;
        valoresModel.value.cargo_id = null;
        cargosOptions.value = [];
        cargosOptions.value = (
          await _http.get(
            `/cargos/?estructura_organizativa_id=${newEstructuraOrganizativaId}`
          )
        ).results;
      }
    );

    watch(
      () => valoresModel.value.viceministerio_id,
      async (newViceministerioId) => {
        if (!newViceministerioId) return;
        valoresModel.value.group_id = null;
        valoresModel.value.cargo_id = null;
        if (valoresModel.value.tipo == "SECTOR") {
          groups.value = (await _http.get(`/roles/?tipo=${"SECTOR"}`)).results;
        } else {
          groups.value = (
            await _http.get(`/roles/?tipo=${"MINISTERIO"}`)
          ).results;
        }

        valoresModel.value.sector_id = null;
        sectores.value = [];
        sectores.value = (
          await _http.get(`/sectores/?viceministerio_id=${newViceministerioId}`)
        ).results;
      }
    );

    watch(
      () => valoresModel.value.sector_id,
      async (newSectorId) => {
        if (!newSectorId) return;
        valoresModel.value.group_id = null;
        if (valoresModel.value.tipo == "SECTOR") {
          groups.value = (await _http.get(`/roles/?tipo=${"SECTOR"}`)).results;
        } else {
          groups.value = (
            await _http.get(`/roles/?tipo=${"MINISTERIO"}`)
          ).results;
        }
        valoresModel.value.cargo_id = null;
        const sector = sectores.value.find((s) => s.id == newSectorId);
        cargosOptions.value = [];
        cargosOptions.value = (
          await _http.get(`/cargos/?sector=${sector.nombre}`)
        ).results;
      }
    );

    watch(
      () => valoresModel.value.cargo_id,
      async (newCargoid) => {
        if (!newCargoid) return;
        valoresModel.value.group_id = null;
        if (valoresModel.value.tipo == "SECTOR") {
          groups.value = (await _http.get(`/roles/?tipo=${"SECTOR"}`)).results;
        } else {
          groups.value = (
            await _http.get(`/roles/?tipo=${"MINISTERIO"}`)
          ).results;
        }
      }
    );

    const isMinisterio = computed(() => {
      return valoresModel.value.tipo === tipos.MINISTERIO;
    });

    onMounted(async () => {
      llenar_selects();

      console.log("valoresModel.value", valoresModel.value);
      // permisosnuevoModel.value = valoresModel.value.permissions.map((obj) => obj.id);
      valoresModel.value.permisosnuevoModel = valoresModel.value.permissions;
      valoresModel.value.menunuevoModel = valoresModel.value.menu;
    });

    const filtrarOpciones = (val, update) => {
      if (val === "") {
        update(() => {
          IconList.value = IconListOriginal;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        IconList.value = IconListOriginal.filter((v) =>
          v.toLowerCase().includes(needle)
        );
      });
    };

    const llenar_selects = async () => {
      viceministeriosOptions.value = (
        await _http.get("/viceministerios/")
      ).results;
      estructurasOrganizativas.value = (
        await _http.get("/estructuras-organizativas/?area_id=2")
      ).results;

      if (valoresModel.value.viceministerio_id != undefined) {
        sectores.value = [];
        sectores.value = (
          await _http.get(
            `/sectores/?viceministerio_id=${valoresModel.value.viceministerio_id.id}`
          )
        ).results;
      }
      if (valoresModel.value.sector_id != undefined) {
        cargosOptions.value = [];
        cargosOptions.value = (
          await _http.get(
            `/cargos/?sector=${valoresModel.value.sector_id.nombre}`
          )
        ).results;
      }

      if (valoresModel.value.tipo === "MINISTERIO") {
        cargosOptions.value = [];
        cargosOptions.value = (
          await _http.get(
            `/cargos/?estructura_organizativa_id=${valoresModel.value.cargo.estructura_organizativa}`
          )
        ).results;

        groups.value = (
          await _http.get(`/roles/?tipo=${"MINISTERIO"}`)
        ).results;

      }

      menunuevoOptions.value = (await _http.get("/menu/")).results;
      permisosnuevoOptions.value = (await _http.get("/permissions/")).results;
    };

    const updatePassword = () => {
      showNewPasswordFields.value = true;
    };

    return {
      updatePassword,
      showNewPasswordFields,
      IconList,
      IconListOriginal,
      valoresModel,
      valoresRules,
      menus,
      filtrarOpciones,
      alert,
      errors,
      cargosOptions,
      estructurasOrganizativas,
      groups,
      viceministeriosOptions,
      tiposOptions,
      isMinisterio,
      sectores,
      llenar_selects,
      selectmenuid,
      selectpermisoid,
      permisosnuevoModel,
      permisosnuevoOptions,
      menunuevoModel,
      menunuevoOptions,
      password2Rules,
    };
  },
};
</script>

<style scoped>
.border-green {
  border: 2px solid rgb(93, 99, 38);
  border-radius: 4px; /* Opcional: para bordes redondeados */
  padding: 10px; /* Opcional: para agregar espacio alrededor del input */
}

.border-green .q-input__control {
  border: none; /* Evita duplicar el borde del q-input */
}
</style>
