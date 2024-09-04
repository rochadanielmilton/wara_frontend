import { boot } from 'quasar/wrappers'
import axios from 'axios'

const AUTH_URL = process.env.AUTH_URL
const API_URL = process.env.API_URL

export default boot(({ app, router, store }) => {
  const _storage = app.config.globalProperties.$storage
  const _store = store
  const _message = app.config.globalProperties.$message

  const login = async (params) => {
    try {
      const { data } = await axios.post(`${AUTH_URL}/login/`, params)
      const { data: data2 } = await axios.get(`${API_URL}/auth/me/`, { headers: { Authorization: `Token ${data.token}` } })
      const respuesta = data2
      const usuario = {
        usuario: respuesta.username,
        nombres: respuesta.first_name,
        primerApellido: respuesta.last_name,
        segundoApellido: respuesta.second_last_name,
        correoElectronico: respuesta.email,
        rol: respuesta.groups[0]?.name ?? 'Sin rol',
        entidad: 'mmaya',
        sector: respuesta.sector
      }
      _storage.setUsuario(usuario)
      _storage.set('roles', respuesta.groups)
      _storage.set('menu', respuesta.menu)
      _storage.set('menu_padre', respuesta.menu_padre)
      _storage.set('permisos', respuesta.permissions)
      _storage.set('token', data.token)
      _storage.set('login_local', true)

      initStore()
      router.push(!respuesta.sector ? '/app/dashboard' : '/app/proyectos');

    } catch (error) {
      Object.values(error.response.data).forEach(valor => {
        _message.error(valor)
        console.log(valor);
      });
      // let mensaje = 'Ocurrio un error desconocido.'
      // if (error.response) {
      //   const { data } = error.response
      //   mensaje = data.mensaje
      // }
      // _message.error(mensaje)
    }
  }

  // const fetchMe = async (token)=>{

  // }

  const loginCiudadania = async () => {
    const { data } = await axios.get(`${process.env.BACKEND_URL}/codigo`)
    if (data.codigo) {
      _storage.set('oauth2_state', data.codigo || null)
      window.location.href = data.url
    }
  }

  const logout = async () => {
    try {
      if (!_storage.get('login_local')) {
        await logoutCiudadania()
      }
      cleanStore()
    } catch (error) {
      _message.error('Ocurrio un error al intentar cerrar su sesión')
    }
  }

  const logoutCiudadania = async () => {
    const codigo = _storage.get('oauth2_state')
    const usuario = _storage.get('usuario')
    if (codigo && usuario) {
      const { data } = await axios.post(`${process.env.BACKEND_URL}/logout`, { usuario, codigo })
      window.location.href = data.url
    }
  }

  const cleanStore = () => {
    _storage.removeUsuario()
    _storage.remove('roles')
    _storage.remove('menu')
    _storage.remove('permisos')
    _storage.remove('token')
    _store.commit('global/setUsuario', {})
    _store.commit('global/setRoles', [])
    _store.commit('global/setMenu', [])
    _store.commit('global/setPermisos', [])
    _storage.remove('login_local')
    router.push('/')
  }

  const initStore = () => {
    _store.commit('global/setUsuario', _storage.getUsuario())
    _store.commit('global/setRoles', _storage.get('roles'))
    _store.commit('global/setMenu', _storage.get('menu'))
    _store.commit('global/setPermisos', _storage.get('permisos'))
  }

  app.config.globalProperties.$auth = {
    cleanStore,
    initStore,
    login,
    loginCiudadania,
    logout,
    logoutCiudadania
  }

  app.provide('auth', {
    cleanStore,
    initStore,
    login,
    loginCiudadania,
    logout,
    logoutCiudadania
  })
})

//
