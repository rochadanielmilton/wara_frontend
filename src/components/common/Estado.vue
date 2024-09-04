<template>
  <section>
    <q-chip
      v-if="estado === 'ACTIVO'"
      square
      color="info"
      text-color="white"
      label="ACTIVO"
    />
    <q-chip
      v-if="estado === 'INACTIVO'"
      square
      color="warning"
      text-color="white"
      label="INACTIVO"
    />
  </section>
</template>
<script>
export default {
  props: {
    estado: {
      type: String,
      default: () => 'ACTIVO'
    }
  }
}
</script>
