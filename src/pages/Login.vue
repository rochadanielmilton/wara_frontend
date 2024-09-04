<template>
  <q-page class="flex flex-center">
    <div class="row q-col-gutter-md justify-center">

      <div class="col-xs-12 flex flex-center">
        <q-card style="width: 400px; max-width: 95vw;">
          <q-toolbar class="q-pa-md">

            <q-toolbar-title>
              <div class="row justify-center">
              <img alt="LOGO MMAYA" src="~assets/header-4.png" style="width: 200px" />
            </div>
              <center>
                <div class="text-h5 row justify-center" style="color: #04044b;"><b>Bienvenido al sistema <br> SISP V2.0</b></div>
              </center>
            </q-toolbar-title>
          </q-toolbar>
          <q-card-section class="q-pt-none">
            <q-form @submit="login">
              <q-input v-model="formulario.usuario" label="Usuario o correo electrónico" lazy-rules square
                class="q-mb-md" autofocus :rules="rulesLogin.usuario">
                <template v-slot:append>
                  <q-icon name="people" color="primary" />
                </template>
              </q-input>
              <q-input v-model="formulario.contrasena" label="Contraseña" lazy-rules square
                :type="isPwd ? 'password' : 'text'" :rules="rulesLogin.contrasena">
                <template v-slot:append>
                  <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd"
                    color="primary" />
                </template>
              </q-input>
              <q-btn color="primary" type="submit" size="16px" padding="10px" no-caps class="full-width q-ma-md"
                label="Ingresar" />

            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>

import { reactive, ref, inject } from 'vue'
import validaciones from '../common/validations'

const rulesLogin = {
  usuario: [
    validaciones.requerido
  ],
  contrasena: [
    validaciones.requerido,
    validaciones.contrasena
  ]
}

export default {
  setup() {
    const isPwd = ref(true)
    const _auth = inject('auth')
    const formulario = reactive({
      usuario: '',
      contrasena: ''
    })

    const login = async () => {
      await _auth.login({ username: formulario.usuario, password: formulario.contrasena })
    }

    const loginCiudadania = async () => {
      await _auth.loginCiudadania()
    }

    return {
      login,
      loginCiudadania,
      isPwd,
      formulario,
      rulesLogin
    }
  }
}
</script>
