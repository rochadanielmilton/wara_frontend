<template>
  <div>
    <div class="row items-right q-gutter-md">
      <q-card class="my-card" >
        <q-img src="~assets/reportes/proyectos.png" style="height: 100px">
          <div
            class="absolute-bottom text-caption text-center"
            :style="{ padding: '4px' }"
          >
            TODOS
          </div>
        </q-img>
        <q-card-section >
          <b>INVERSION (Bs.):</b>
          {{ formatNumber(abbreviateNumber(datos.total_inversion)) }}<br />
          <b>PROYECTOS:</b> {{ datos.total_numero_proyectos }}
        </q-card-section>
      </q-card>

      <q-card
      v-for="sector in datos.inversion_por_sector"
        :key="sector.sector_nombre"
        :class="{'my-card': true, 'card-focused': focusedCard === sector.sector_id}"
        @click="reportePorSectorPDF(datos.consulta, sector.sector_id); setFocus(sector.sector_id)"
      >
        <q-img :src="sectorImage(sector.sector_nombre)" style="height: 100px">
          <div
            class="absolute-bottom text-caption text-center"
            :style="{ padding: '4px', margin: '0px' }"
          >
            {{ sector.sector_nombre }}
          </div>
        </q-img>
        <q-card-section>
          <b>INVERSION (Bs.):</b>
          {{ formatNumber(abbreviateNumber(sector.total_inversion)) }}<br />
          <b>PROYECTOS:</b> {{ sector.cantidad_proyectos }}
        </q-card-section>
        <q-tooltip>Descargar Reporte</q-tooltip>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["baseApiUrl", "backendUrl", "http"],
  props: {
    datos: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      focusedCard: null,  // Para rastrear el card con foco
    };
  },




  methods: {
    setFocus(sectorId) {
      this.focusedCard = sectorId;
    },
    sectorImage(sectorName) {
      switch (sectorName) {
        case "SANEAMIENTO BÁSICO":
          return require("assets/reportes/agua_saneamiento.png");
        case "AGROPECUARIO":
          return require("assets/reportes/riego.jpg");
        case "RECURSOS HÍDRICOS":
          return require("assets/reportes/cuenca2.jpg");
        default:
          return require("assets/reportes/default.png");
      }
    },

    abbreviateNumber(number) {
      if (number >= 1000000) {
        return (number / 1000000).toFixed(2) + " M";
      }
      return number;
    },

    formatNumber(value) {
      if (value || value === 0) {
        let [integerPart, decimalPart] = value.toString().split(".");
        integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return decimalPart ? `${integerPart},${decimalPart}` : integerPart;
      }
      return value;
    },

    descargarArchivo(blob, nombreArchivo){
      const url = window.URL.createObjectURL(blob);

      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");

      const timestamp = `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;

      const fileExtension = nombreArchivo.split(".").pop();
      const nombreArchivoConTimestamp = `${nombreArchivo.replace(
        `.${fileExtension}`,
        ""
      )}_${timestamp}.${fileExtension}`;

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", nombreArchivoConTimestamp);
      document.body.appendChild(link);
      link.click();
      link.remove();
    },

    async reportePorSectorPDF(params,sector_id) {
        params["sector_id"]=sector_id;
      try {
        // Realiza la solicitud para obtener el PDF
        const respuesta = await this.http.get(
          this.http.convertQuery("/reportes/reporte-general-por-sector/",params)
        );
        this.descargarArchivo(new Blob([respuesta]), "reporte_general.pdf");
        this.$q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Reporte por sector descargado",
        });
      } catch (error) {
        console.error("Error al descargar el PDF", error);
        this.$q.notify({
          color: "red-5",
          textColor: "white",
          icon: "error",
          message: "Error al descargar el PDF",
        });
      }
    },
  },
};
</script>
<style scoped>
.my-card {
  transition: background-color 0.3s, opacity 0.3s; /* Añade una transición suave para el cambio de estilo */
}

.my-card:hover {
  opacity: 0.7; /* Cambia la opacidad para hacerlo más transparente */
  background-color: rgba(247, 247, 248, 0.877); /* Opción para cambiar el color de fondo */
}

.card-focused {
  border: 2px solid #1976D2; /* Color del borde cuando tiene foco */
  box-shadow: 0 0 10px rgba(27, 139, 231, 0.5); /* Efecto de sombra */
}
</style>
