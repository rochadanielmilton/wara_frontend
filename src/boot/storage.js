import { boot } from 'quasar/wrappers'
const prefix = 'app'

const codificar = (value) => {
  if (process.env.NODE_ENV === 'development') return value

  return window.btoa(value)
}

const decodificar = (value) => {
  if (process.env.NODE_ENV === 'development') return value

  return window.atob(value)
}

const storage = {
  get (keyName) {
    try {
      if (localStorage.getItem(codificar(`${prefix}_${keyName}`))) {
        return JSON.parse(decodificar(localStorage.getItem(codificar(`${prefix}_${keyName}`))))
      }
      return null
    } catch (error) {
      return decodificar(localStorage.getItem(codificar(`${prefix}_${keyName}`)))
    }
  },
  existUsuario () {
    return this.exist(codificar('usuario'))
  },
  removeUsuario () {
    this.remove('usuario')
  },
  remove (key) {
    localStorage.removeItem(codificar(`${prefix}_${key}`))
  },
  destroy (key) {
    this.remove(codificar(`${prefix}_${key}`))
  },
  set (keyName, keyValue) {
    localStorage.setItem(codificar(`${prefix}_${keyName}`), codificar(JSON.stringify(keyValue)))
  },
  setUsuario (usuario) {
    this.set('usuario', usuario)
  },
  getUsuario () {
    return this.get('usuario')
  },
  exist (keyName) {
    const existe = localStorage.getItem(codificar(`${prefix}_${keyName}`))
    try {
      if (existe) {
        return JSON.parse(decodificar(existe))
      } else {
        return false
      }
    } catch (error) {
      return decodificar(existe)
    }
  },
  clearAll () {
    localStorage.clear()
  }
}

export default boot(({ app }) => {
  app.config.globalProperties.$storage = storage
  app.provide('storage', storage)
})

export { storage }
