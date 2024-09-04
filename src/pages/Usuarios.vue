<template>
  <q-page>
    <Titulo titulo="USUARIOS" icono="person"></Titulo>
    <!-- <ModalComponente @reload="crudTable.updateList()" /> -->

    <q-dialog v-model="mostrar_dialog">
      <q-card style="width: 900px; max-width: 80vw">
        <q-card-section>
          <div class="text-h5">USUARIO</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-splitter v-model="splitterModel" style="height: 350px">
            <template v-slot:before>
              <q-tabs v-model="tab" vertical class="text-indigo-10">
                <q-tab name="tab_usuario" label="USUARIO" />
                <!-- <q-tab name="roles" label="ROLES" /> -->
                <q-tab name="permisos" label="PERMISOS" />
                <q-tab name="menu" label="menu" />
                <q-tab name="tipo" label="tipo" />

                <!-- <q-tab name="viceministerios" label="viceministerios" /> -->
                <!-- <q-tab name="desentralizadas" label="desentralizadas" /> -->
                <!-- <q-tab name="cargo" label="cargo" /> -->
              </q-tabs>
            </template>

            <template v-slot:after>
              <q-tab-panels
                v-model="tab"
                animated
                swipeable
                vertical
                transition-prev="jump-up"
                transition-next="jump-up"
              >
                <q-tab-panel name="tab_usuario">
                  <div class="text-h5 q-mb-md">USUARIO</div>

                  <q-card-section class="q-pt-none">
                    <div class="row">
                      <div class="col-sm">
                        <q-input
                          square
                          v-model="val_usuario.first_name"
                          label="Nombre"
                        >
                          <template v-slot:prepend>
                            <q-icon name="person" />
                          </template>
                        </q-input>
                      </div>
                      <div class="col-sm">
                        <q-input
                          square
                          v-model="val_usuario.last_name"
                          label="Apellido Paterno:"
                        >
                          <template v-slot:prepend>
                            <q-icon name="person" />
                          </template>
                        </q-input>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm">
                        <q-input
                          square
                          v-model="val_usuario.second_last_name"
                          label=" Apellido Materno:"
                        >
                          <template v-slot:prepend>
                            <q-icon name="person" />
                          </template>
                        </q-input>
                      </div>
                      <div class="col-sm">
                        <q-input
                          square
                          v-model="val_usuario.username"
                          label="Usuario:"
                        >
                          <template v-slot:prepend>
                            <q-icon name="person" />
                          </template>
                        </q-input>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-6">
                        <q-input
                          square
                          v-model="val_usuario.email"
                          label=" Email:"
                        >
                          <template v-slot:prepend>
                            <q-icon name="person" />
                          </template>
                        </q-input>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-6">
                        <q-input
                          v-model="password1"
                          label="Contraseña Nueva"
                          type="password"
                          square
                        >
                          <template v-slot:prepend>
                            <q-icon name="person" />
                          </template>
                        </q-input>
                      </div>

                      <div class="col-6">
                        <q-input
                          v-model="password2"
                          label="Confirmar Contraseña"
                          type="password"
                          square
                        >
                          <template v-slot:prepend>
                            <q-icon name="person" />
                          </template>
                        </q-input>
                      </div>
                    </div>
                  </q-card-section>
                </q-tab-panel>

                <q-tab-panel name="permisos">
                  <div class="text-h5 q-mb-md text-center">PERMISOS</div>
                  <pre>Permisos asignados:</pre>
                  <q-select
                    v-model="selectpermisoid"
                    :options="val_usuario.permissions"
                    label="permisos asignados"
                    option-value="id"
                    option-label="name"
                  />
                  <pre>Asignar Nuevos Permisos:</pre>
                  <q-select
                    square
                    v-model="permisosnuevoModel"
                    :options="permisosnuevoOptions"
                    option-value="id"
                    option-label="name"
                    multiple
                    emit-value
                    map-options
                  >
                    <template
                      v-slot:option="{ itemProps, opt, selected, toggleOption }"
                    >
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
                </q-tab-panel>

                <q-tab-panel name="menu">
                  <div class="text-h4 q-mb-md">MENU</div>
                  <pre>Menus asignados</pre>
                  <q-select
                    v-model="selectmenuid"
                    label="Menus Asignados"
                    :options="usuario.menu"
                    option-value="id"
                    option-label="nombre"
                  />

                  <pre>Asignar Nuevos Menus</pre>
                  <q-select
                    square
                    v-model="menunuevoModel"
                    :options="menunuevoOptions"
                    option-value="id"
                    option-label="nombre"
                    multiple
                    emit-value
                    map-options
                  >
                    <template
                      v-slot:option="{ itemProps, opt, selected, toggleOption }"
                    >
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
                </q-tab-panel>

                <q-tab-panel name="tipo">
                  <pre>TIPO:{{ val_usuario.tipo }}</pre>
                  <pre>ROL:{{ val_usuario.group_id }}</pre>
                  <pre v-if="val_usuario.cargo != null">
CARGO:{{ val_usuario.cargo.nombre }}</pre
                  >
                  <pre v-if="val_usuario.sector != null">
SECTOR:{{ val_usuario.sector.nombre }}</pre
                  >
                  <hr />
                  <pre>EDITAR:</pre>
                  <div class="col-12 col-md-12">
                    <q-select
                      v-model="val_usuario.tipo"
                      :options="tiposOptions"
                      label="Tipo"
                      filled
                    />
                  </div>
                  <div class="col-12 col-md-6">
                    <q-select
                      v-model="val_usuario.group_id"
                      :options="groups"
                      label="Rol"
                      option-value="id"
                      option-label="name"
                      emit-value
                      map-options
                      filled
                    />
                  </div>

                  <div class="col-12 col-md-6">
                    <q-select
                      v-if="!isMinisterio"
                      v-model="val_usuario.viceministerio_id"
                      :options="viceministeriosOptions"
                      label="Viceministerio"
                      option-value="id"
                      option-label="nombre"
                      emit-value
                      map-options
                      filled
                    />
                    <q-select
                      v-if="isMinisterio"
                      v-model="val_usuario.estructura_organizativa_id"
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
                      v-model="val_usuario.sector_id"
                      :options="sectores"
                      label="Sector"
                      option-value="id"
                      option-label="nombre"
                      emit-value
                      map-options
                      filled
                    />
                    <q-select
                      v-model="val_usuario.cargo_id"
                      :options="cargosOptions"
                      label="Cargo"
                      option-value="id"
                      option-label="nombre"
                      emit-value
                      map-options
                      filled
                    />
                  </div>
                </q-tab-panel>

                <!-- <q-tab-panel name="viceministerios">
                  <div class="text-h4 q-mb-md">VICEMINISTERIOS</div>
                  <pre>Viceministerio Asignado: <b>{{ val_usuario.viceministerio.nombre }}</b></pre>

                  <pre>Modificar a:</pre>
                  <q-select
                    v-model="viceministeriosModel"
                    :options="viceministeriosOptions"
                    label="viceministerios"
                    option-value="id"
                    option-label="nombre"
                  />
                </q-tab-panel> -->
                <!--
                <q-tab-panel name="desentralizadas">
                  <div class="text-h4 q-mb-md">DESENTRALIZADAS</div>
                  <pre>Desentralizado Asignado: <b>{{ val_usuario.descentralizada.nombre }}</b></pre>
                  <pre>Modificar a:</pre>
                  <q-select
                    v-model="desentralizadaModel"
                    label="DESENTRALIZADA"
                    :options="desentralizadaOptions"
                    option-value="id"
                    option-label="nombre"
                  />
                </q-tab-panel> -->

                <!-- <q-tab-panel name="cargo">
                  <div class="text-h4 q-mb-md">CARGO</div>
                  <pre>Cargo Asignado: <b>{{ val_usuario.cargo.nombre }}</b></pre>
                  <pre>Modificar a:</pre>
                  <q-select
                    v-model="cargosModel"
                    label="Cargos"
                    :options="cargosOptions"
                    option-value="id"
                    option-label="nombre"
                  />
                </q-tab-panel> -->
              </q-tab-panels>
            </template>
          </q-splitter>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            @click="guardar_cambios"
            class="q-ml-sm"
            icon="check"
            color="primary"
            label="Guardar"
          />
          <q-btn
            @click="mostrar_dialog = false"
            color="primary"
            class="q-ml-sm"
            icon="close"
            label="Cancelar"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <CrudTable
      :filters="filters"
      :columns="columns"
      :url="url"
      :order="'createdAt'"
      ref="crudTable"
    >
      <template v-slot:buttons="{ open }">
        <q-btn
          icon="add"
          color="primary"
          @click="openModal(open)"
          label="Nuevo usuario"
        />
      </template>

      <template v-slot:form="{ close, update }">
        <q-card style="width: 700px; max-width: 90vw">
          <q-toolbar class="q-pa-md">
            <q-icon name="settings" size="md" />
            <q-toolbar-title>
              {{ usuario.id ? "Editar" : "Agregar" }} usuario
            </q-toolbar-title>
            <q-space />
            <q-btn flat round icon="close" @click="closeModal(close)" />
          </q-toolbar>
          <q-card-section>
            <Usuario
              :valores="usuario"
              :visibles="visibles"
              @guardar="guardar(update, close)"
              @cancelar="closeModal(close)"
              :passwordError="passwordError"
              :usernameError="usernameError"
            ></Usuario>
          </q-card-section>
        </q-card>
      </template>

      <template v-slot:row="{ row, open, eliminar }">
        <q-tr>
          <q-td>{{ row.first_name }}</q-td>
          <q-td>{{ row.last_name }}</q-td>
          <q-td>{{ row.second_last_name }}</q-td>
          <q-td>{{ row.username }}</q-td>
          <q-td>{{ row.email }}</q-td>
          <q-td>{{ row.groups[0] }}</q-td>
          <q-td>
            <q-btn
              class="q-pa-xs"
              flat
              round
              icon="edit"
              @click="openModal(open, row.id)"
            />
            <!-- <q-btn
              class="q-pa-xs"
              flat
              round
              color="blue"
              icon="edit"
              @click="mostrar_modal(row.id)"
            /> -->
            <q-btn
              class="q-pa-xs"
              flat
              round
              color="negative"
              icon="delete"
              @click="eliminar({ url: `${url}${row.id}/` })"
            />

            <!-- <q-btn
              class="q-pa-xs"
              flat
              round
              color="green"
              icon="facebook"
              @click="eliminar_usuario(row.id)"
            /> -->
          </q-td>
        </q-tr>
      </template>
    </CrudTable>
  </q-page>
</template>

<script>
import { ref, inject, watch, onMounted, computed } from "vue";
import CrudTable from "@components/common/CrudTable";
import Usuario from "components/Formularios/Usuario";
import ModalComponente from "components/Formularios/ModalComponente.vue";
import { tipos } from "src/constants/usuarios";

const filters = [
  {
    label: "buscar",
    field: "search",
    type: "input",
  },
];

const columns = [
  // {
  //   name: "id",
  //   label: "id",
  //   sortable: true,
  // },
  {
    name: "first_name",
    label: "Primer Nombre",
    sortable: false,
  },
  {
    name: "last_name",
    label: "Apellido Paterno",
    sortable: false,
  },
  {
    name: "second_last_name",
    label: "Apellido Materno",
    sortable: false,
  },
  {
    name: "username",
    label: "Usuario",
    sortable: false,
  },

  {
    name: "email",
    label: "Correo Electronico",
    sortable: true,
  },
  {
    name: "rol",
    label: "rol",
    sortable: true,
  },
  {
    name: "acciones",
    label: "Acciones",
    sortable: false,
  },
];

export default {
  components: { CrudTable, Usuario, ModalComponente },
  name: "Usuarios",
  setup() {
    const selectrolid = ref("");
    const selectpermisoid = ref("");
    const _http = inject("http");
    const _message = inject("message");
    const url = ref("/users/");
    const tab = ref("tab_usuario");
    const splitterModel = ref(20);
    const mostrar_dialog = ref(false);
    const rolesOptions = ref([]);
    const selectpermisonuevoid = ref();
    const selectmenuid = ref();
    const permisosnuevoOptions = ref([]);
    const menuOptions = ref([]);
    const menunuevoOptions = ref([]);
    const id_usuario = ref("");
    const selected = ref("");
    const menunuevoModel = ref([]);
    const permisosnuevoModel = ref([]);
    const val_cargo_id = ref("");
    const viceministeriosOptions = ref([]);
    const viceministeriosModel = ref("");
    const desentralizadaOptions = ref([]);
    const desentralizadaModel = ref("");
    const cargosOptions = ref([]);
    const cargosModel = ref("");
    const crudTable = ref(null);
    const tiposOptions = ref([tipos.MINISTERIO, tipos.SECTOR]);
    const password1 = ref(null);
    const password2 = ref(null);
    const groups = ref([]);
    const estructurasOrganizativas = ref([]);
    const sectores = ref([]);
    const visibles = ref(false);
    const passwordError = ref("");
    const usernameError = ref("");

    const usuario = ref({
      id: null,
      first_name: null,
      last_name: null,
      second_last_name: null,
      username: null,
      email: null,
      viceministerio_id: null,
      descentralizada_id: null,
    });

    const resetForm = () => {
      visibles.value = false;
      passwordError.value = "";
      usernameError.value = "";
      usuario.value = {
        // id: null,
        // first_name: null,
        // last_name: null,
        // second_last_name: null,
        // username: null,
        // email: null,
        // cargo_id: 1,
        // descentralizada_id: 2,
        // viceministerio_id: 1,
      };
    };

    const val_usuario = ref({
      //todos los valores son reemplazados (ES EL FORMATO DE ENTRADA)
      // username: null,
      // email: null,
      // first_name: null,
      // last_name: null,
      // second_last_name: null,
      // group_id: 0,
      // group_menus_idsid: [],
      // permissions_ids: [],
      // cargo_id: null,
      // viceministerio_id: null,
      // descentralizada_id: null,
    });

    const guardar_cambios = async () => {
      try {
        const users = await _http.get("/users/" + id_usuario.value + "/"); //VALIDAR ID_USUARIO.VALUE

        //VALIDAMOS LOS ROLES , LOS DE ENTRADA Y SI SELECCIONA OTRO
        const valor_group_id = ref("");
        if (selectrolid.value.id == undefined) {
          valor_group_id.value = users.groups.map((obj) => obj.id)[0];
        } else {
          valor_group_id.value = selectrolid.value.id;
        }

        //Agregamos nuevo campo al objeto val_usuario
        Object.assign(val_usuario.value, { group_id: valor_group_id.value });
        //PERMISOS- elejido o quitaos por el usuario
        val_usuario.value.permissions = permisosnuevoModel.value;
        //MENUS- elejido o quitaos por el usuario
        val_usuario.value.menu = menunuevoModel.value;

        //*********************** */
        //MENUSIDS
        Object.assign(val_usuario.value, { menus_ids: val_usuario.value.menu }); //elejido por el usuario
        //PERMISOSIDS
        Object.assign(val_usuario.value, {
          permissions_ids: val_usuario.value.permissions,
        });

        //validamos sector
        if (val_usuario._rawValue.sector === null) {
          Object.assign(val_usuario.value, { tipo: "MINISTERIO" });
        } else {
          Object.assign(val_usuario.value, { tipo: "SECTOR" });
        }

        console.log("password111", password1.value);
        if (password1.value === "" || password2.value === "") {
          console.log("No hacer nada");
        } else if (password1.value !== password2.value) {
          _message.error("LA CONTRASEÑA NO ES IGUAL");
          return;
        } else {
          // Si las contraseñas coinciden, asignarlas
          Object.assign(val_usuario.value, { password: password1.value });
        }

        console.log("para guardarrr**", val_usuario._rawValue);
        await _http.put(
          "/users/" + id_usuario.value + "/",
          val_usuario._rawValue
        );
        mostrar_dialog.value = false;
        _message.success("SE ACTUALIZO CORRECTAMENTE");
        password1.value = "";
        password2.value = "";

        mostrar_dialog.value = false;
        return "guardarrr";
        // close();
        //END**************************** */

        //VICEMINISTERIO - elejido o quitaos por el usuario
        if (viceministeriosModel.value.id == undefined) {
          Object.assign(val_usuario.value, {
            viceministerio_id: val_usuario.value.viceministerio.id,
          }); //por defecto
        } else {
          Object.assign(val_usuario.value, {
            viceministerio_id: viceministeriosModel.value.id,
          }); //elejido por el usuario
        }

        //DESENTRALIZADA - elejido o quitaos por el usuario
        if (desentralizadaModel.value.id == undefined) {
          Object.assign(val_usuario.value, {
            descentralizada_id: val_usuario.value.descentralizada.id,
          });
          //por defecto
        } else {
          Object.assign(val_usuario.value, {
            descentralizada_id: desentralizadaModel.value.id,
          }); //elejido por el usuario
        }

        //CARGO - elejido o quitaos por el usuario
        if (cargosModel.value.id == undefined) {
          Object.assign(val_usuario.value, {
            cargo_id: val_usuario.value.cargo.id,
          });
          //por defecto
        } else {
          Object.assign(val_usuario.value, { cargo_id: cargosModel.value.id });
        } //elejido por el usuario

        //MENUSIDS
        Object.assign(val_usuario.value, { menus_ids: val_usuario.value.menu }); //elejido por el usuario
        //PERMISOSIDS
        Object.assign(val_usuario.value, {
          permissions_ids: val_usuario.value.permissions,
        }); //elejido por el usuario

        const respusers = await _http.put(
          "/users/" + id_usuario.value + "/",
          val_usuario._rawValue
        );
        mostrar_dialog.value = false;
        _message.success("SE ACTUALIZO CORRECTAMENTE");
        // close();
      } catch (error) {
        // console.log('pasa por aquiiiii',error.);
        console.log("eeeeeeee", error.response.data);
        Object.keys(error.response.data).forEach((clave) => {
          console.log(`${clave}: ${error.response.data[clave]}`);
          _message.error(`${error.response.data[clave]}`);
        });
      }
    };

    watch(
      () => val_usuario.value.tipo,
      async (newTipo) => {
        cargosOptions.value = [];
        groups.value = [];
        groups.value = (await _http.get(`/roles/?tipo=${newTipo}`)).results;

        val_usuario.value.estructura_organizativa_id = null;
        val_usuario.value.cargo_id = null;
        val_usuario.group_id = null;
      }
    );

    watch(
      () => val_usuario.value.estructura_organizativa_id,
      async (newEstructuraOrganizativaId) => {
        if (!newEstructuraOrganizativaId) return;
        val_usuario.value.cargo_id = null;
        cargosOptions.value = [];
        cargosOptions.value = (
          await _http.get(
            `/cargos/?estructura_organizativa_id=${newEstructuraOrganizativaId}`
          )
        ).results;
      }
    );

    watch(
      () => val_usuario.value.viceministerio_id,
      async (newViceministerioId) => {
        if (!newViceministerioId) return;

        val_usuario.value.sector_id = null;
        if (val_usuario.value.sector != null) {
          val_usuario.value.sector_id = val_usuario.value.sector;
        }
        sectores.value = [];
        sectores.value = (
          await _http.get(`/sectores/?viceministerio_id=${newViceministerioId}`)
        ).results;
      }
    );

    watch(
      () => val_usuario.value.sector_id,
      async (newSectorId) => {
        if (!newSectorId) return;

        val_usuario.value.cargo_id = null;
        const sector = sectores.value.find((s) => s.id == newSectorId);
        cargosOptions.value = [];
        cargosOptions.value = (
          await _http.get(`/cargos/?sector=${sector.nombre}`)
        ).results;
      }
    );

    const isMinisterio = computed(() => {
      return val_usuario.value.tipo === tipos.MINISTERIO;
    });

    const onSubmit = () => {
      // console.log("iisjdlkfjañljsñdlkfj");
    };

    const mostrar_modal = async (id) => {
      const users = await _http.get("/users/" + id + "/");
      //USUARIO ACTUAL
      val_usuario.value = users;
      console.log("🚀 al abrir", val_usuario.value);
      if (val_usuario.value.groups[0].id == 3) {
        val_usuario.value.tipo = "MINISTERIO";
      } else {
        val_usuario.value.tipo = "SECTOR";
      }
      val_usuario.value.group_id = val_usuario.value.groups[0].name;

      if (val_usuario.value.viceministerio != null) {
        val_usuario.value.viceministerio_id =
          val_usuario.value.viceministerio.id;
        val_usuario.value.sector_id = val_usuario.value.sector.id;
        console.log("sector_idddd", val_usuario.value.sector_id);
      }

      //ROL ACTUAL (groups)
      //llena todos los roles disponibles
      rolesOptions.value = (await _http.get("/roles/")).results;

      //MENU ACTUAL
      //llena todos los menus
      menunuevoOptions.value = (await _http.get("/menu/")).results;
      //asigna valores predeterminados del menu
      menunuevoModel.value = users.menu.map((obj) => obj.id);

      //PERMISOS
      //llena todos los permisos
      permisosnuevoOptions.value = (await _http.get("/permissions/")).results;
      //asigna valores predeterminados de los permisos
      permisosnuevoModel.value = users.permissions.map((obj) => obj.id);

      //VECEMINISTERIOS
      //llena todos los viceministerios
      viceministeriosOptions.value = (
        await _http.get("/viceministerios/")
      ).results;

      // DESENTRALIZADA
      //llena todos los desentralizadas
      desentralizadaOptions.value = (
        await _http.get("/descentralizadas/")
      ).results;

      estructurasOrganizativas.value = (
        await _http.get("/estructuras-organizativas/?area_id=2")
      ).results;

      //CARGOS
      //llena todos los cargos
      cargosOptions.value = (await _http.get("/cargos/")).results;

      id_usuario.value = id; //id actual
      mostrar_dialog.value = true;
    };

    const openModal = async (open, id) => {
      resetForm();
      if (id) {
        usuario.value = await _http.get(`${url.value}${id}/`);
        visibles.value = true;
        if (usuario.value.groups[0].id == 3) {
          usuario.value.tipo = "MINISTERIO";
          usuario.value.estructura_organizativa_id = (
          await _http.get(
            "/estructuras-organizativas/" +
              usuario.value.cargo.estructura_organizativa +
              "/"
          )
        ).id;

        } else {
          usuario.value.tipo = "SECTOR";
          usuario.value.viceministerio_id = usuario.value.viceministerio;
          usuario.value.sector_id = usuario.value.sector;
        }

        usuario.value.cargo_id = usuario.value.cargo;
        usuario.value.group_id = usuario.value.groups[0];

        console.log("al editar", usuario.value);
      }
      open();
    };

    const closeModal = (close) => {
      resetForm();
      close();
    };

    const guardar = async (update, close) => {
      try {
        for (const [key, value] of Object.entries(usuario.value)) {
          if (value === null || value === undefined || value === "")
            delete usuario.value[key];
        }

        const mensaje = !usuario.value.id
          ? "usuario creado de manera exitosa."
          : "usuario actualizado de manera exitosa.";
        if (usuario.value.id) {
          //EDITAR******
          usuario.value.permissions_ids = usuario.value.permisosnuevoModel.map(
            (obj) => obj.id || obj
          );

          //CARGO,
          if (typeof usuario.value.cargo_id === "object") {
            usuario.value.cargo_id = usuario.value.cargo_id.id;
          }
          //GROUP_ID
          if (typeof usuario.value.group_id === "object") {
            usuario.value.group_id = usuario.value.group_id.id;
          }

          if (usuario.value.tipo == "MINISTERIO") {
            Object.assign(usuario.value, { viceministerio_id: null });
            delete usuario.value.sector_id;
          } else if (usuario.value.tipo == "SECTOR") {
            delete usuario.value.estructura_organizativa_id;
            if (typeof usuario.value.viceministerio_id === "object") {
              usuario.value.viceministerio_id =
                usuario.value.viceministerio_id.id;
            }
            if (typeof usuario.value.sector_id === "object") {
              usuario.value.sector_id = usuario.value.sector_id.id;
            }
          }

          //MENUS
          Object.assign(usuario.value, {
            menus_ids: usuario.value.menunuevoModel.map((obj) => obj.id || obj),
          });

          usuario.value.menu__ids = usuario.value.menunuevoModel.map(
            (obj) => obj.id || obj
          );

          //Actualiza password****
          if (
            usuario.value.password1 === "" ||
            usuario.value.password2 === ""
          ) {
            console.log("No hacer nada");
          } else if (usuario.value.password1 !== usuario.value.password2) {
            _message.error("LA CONTRASEÑA NO ES IGUAL");
            return;
          } else {
            // Si las contraseñas coinciden, asignarlas
            Object.assign(usuario.value, { password: usuario.value.password1 });
          }

          console.log("al guardar PUT::", usuario.value);
          await _http.put(`${url.value}${usuario.value.id}/`, usuario.value);
        } else {
          Object.assign(usuario.value, { menus_ids: [] });
          Object.assign(usuario.value, { permissions_ids: [] });
          Object.assign(usuario.value, { descentralizada_id: null });

          if (usuario.value.tipo == "MINISTERIO") {
            delete usuario.value.sector_id;
            Object.assign(usuario.value, { viceministerio_id: null });
          } else if (usuario.value.tipo == "SECTOR") {
            delete usuario.value.estructura_organizativa_id;
          }

          console.log("para guardar POST", usuario.value);
          await _http.post(`${url.value}`, usuario.value);
        }
        _message.success(mensaje);
        await update();
        closeModal(close);
      } catch (error) {
        console.log("elerrororor", error.response.data);
        for (let key in error.response.data) {
          console.log(`${key}: ${error.response.data[key]}`);
          _message.error(`${error.response.data[key]}`);
          passwordError.value = error.response.data.password;
          usernameError.value = error.response.data.username;
        }
      }
    };

    return {
      usuario,
      filters,
      columns,
      url,
      closeModal,
      openModal,
      guardar,
      splitterModel,
      tab,
      mostrar_modal,
      mostrar_dialog,
      selectrolid,
      rolesOptions,
      guardar_cambios,
      selectpermisoid,
      selectpermisonuevoid,
      permisosnuevoOptions,
      menuOptions,
      menunuevoOptions,
      selectmenuid,
      selected,
      menunuevoModel,
      permisosnuevoModel,
      onSubmit,
      val_usuario,
      val_cargo_id,
      viceministeriosOptions,
      viceministeriosModel,
      desentralizadaOptions,
      desentralizadaModel,
      cargosOptions,
      cargosModel,
      crudTable,
      password1,
      password2,
      tiposOptions,
      groups,
      isMinisterio,
      estructurasOrganizativas,
      sectores,
      usuario,
      visibles,
      passwordError,
      usernameError,
    };
  },
};
</script>
