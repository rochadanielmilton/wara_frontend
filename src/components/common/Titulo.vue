<template>
  <div
    class="col-xs-12"
    style="margin-bottom:-130px;"
  >
    <div class="bg-primary text-white">
      <!-- <div class="text-primary"> -->
      <q-toolbar
        class="q-gutter-md q-pl-lg"
        style="height: 220px;"
      >
        <q-toolbar-title style="margin-top:-100px;">
          <p class="text-h5">
            <q-icon
              :name="icono"
              size="md"
              style="margin-top:-5px;"
            />
            {{ titulo }}
          </p>
        </q-toolbar-title>
      </q-toolbar>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    titulo: {
      type: String,
      default: () => ''
    },
    icono: {
      type: String,
      default: () => ''
    }
  },
  setup (props) {
  }
}
</script>
