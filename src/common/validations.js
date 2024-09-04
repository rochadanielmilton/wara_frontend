'use strict'

export default {
  correo: v => {
    const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    return re.test(String(v).toLowerCase()) || !v || 'El correo no es válido.'
  },
  url: v => {
    return /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/.test(v) || !v || 'Introduzca una URL válida'
  },
  contrasena: v => v.length >= 6 || !v || 'Debe tener al menos 6 carácteres.',
  requerido: v => !!v || 'El campo es requerido.',
  minimoOcho: v => v.length > 8 || !v || 'Debe tener mas de 8 carácteres.',
  minimoCuarenta: v => v.length <= 40 || !v || 'Como maximo solo debe tener  40 carácteres.',
  maximo280: v => v.length <= 280 || !v || 'Como maximo solo debe tener  280 carácteres.',
  minimoUno: v => v.length >= 1 || !v || 'Select at least 1 option.',
  maximoDos: v => v.length < 3 || !v || 'Select max 3 choices.',
  maximo50: v => v.length <= 50 || !v || 'Maximo 50 carácteres.',
  maximo100: v => v.length <= 100 || !v || 'Maximo 100 carácteres.',
  maximo300: v => v.length <= 300 || !v || 'Maximo 300 carácteres.',
  telefono: v => {
    const re = /^[0-9]/
    return (re.test(String(v).toLowerCase()) && v.length === 8) || !v || 'Introduzca un numero de celular válido.'
  },
  letras: v => {
    const re = /^[a-zñÑáéíóú]/
    return re.test(String(v).toLowerCase()) || !v || 'Solo se permiten letras.'
  },
  numeros: v => {
    const re = /^\d+$/g
    return re.test(String(v)) || !v || 'Solo se permiten numeros enteros.'
  },
  decimales: v => {
    const re = /^\d{0,2}(.\d{0,2}){0,1}$/g
    return re.test(String(v)) || !v || 'Solo se permiten numeros decimales.'
  },

}


/*
<style scoped>
.q-td{
  text-align: center;
}
</style>
*/
