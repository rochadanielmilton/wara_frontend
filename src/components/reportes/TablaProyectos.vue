<template>
  <div>
    <div>
      <q-dialog v-model="showPdfViewer" persistent>
        <q-card style="width: 80vw; height: 80vh;">
          <q-card-section>
            <div class="text-h6">Ficha Programa</div>
          </q-card-section>

          <q-card-section class="q-pt-none q-pb-none">
            <iframe :src="url" width="100%" height="800px" style="border: none;"></iframe>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cerrar" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>


      <q-markup-table flat bordered>
        <thead class="bg-teal-6">
          <tr>
            <th colspan="19">
              <pre>  <b>REPORTE GENERAL</b></pre>
            </th>
          </tr>
          <tr>
            <td class="text-left" style="white-space: nowrap; color: aliceblue">
              NOMBRE DE PROYECTO
            </td>
            <td class="text-right" style="color: aliceblue">PROGRAMA</td>
            <td class="text-right" style="color: aliceblue">ORGANIZACIÓN</td>
            <td style="color: aliceblue">EEJECUTOR</td>
            <td style="color: aliceblue">ESTADO</td>
            <td style="color: aliceblue">FECHA INICIO</td>
            <td style="color: aliceblue">FECHA DE CONCLUSION</td>
            <td style="color: aliceblue">TOTAL INVERSIÓN</td>
            <td style="color: aliceblue">AVANCE FISICO%</td>
            <td style="color: aliceblue">AVANCE FINANCIERO%</td>
            <td style="color: aliceblue">TIPO</td>

          </tr>
        </thead>
        <tbody>
          <tr v-for="(elemento, index) in datos_proyectos" :key="index">
            <td class="text-left" style="text-overflow: ellipsis">
              {{ this.truncateText(elemento.nombre, 55) }}
              <q-tooltip background-color="primary">{{
                elemento.nombre
              }}</q-tooltip>
            </td>
            <td><span @click="openPdf(elemento.programa_id)" style="color: blue; text-decoration: underline">{{ elemento.sigla }}</span></td>
            <td>{{ elemento.organizacion }}</td>
            <td>{{ elemento.ejecutor }}</td>
            <td>{{ elemento.estado }}</td>
            <td>{{ elemento.fecha_inicio }}</td>
            <td>{{ elemento.fecha_conclusion }}</td>
            <td>{{ formatNumber(elemento.total_inversion) }}</td>
            <td>
              {{ this.truncateText(elemento.avance_fisico, 15) }}
              <q-tooltip background-color="primary">{{
                elemento.avance_fisico
              }}</q-tooltip>
            </td>
            <td>
              {{ this.truncateText(elemento.avance_financiamiento, 15) }}
              <q-tooltip background-color="primary">{{
                elemento.avance_financiamiento
              }}</q-tooltip>
            </td>
            <td>{{ elemento.tipo }}</td>

          </tr>
        </tbody>
      </q-markup-table>
    </div>
  </div>
</template>

<script>

export default {
  inject: ['baseApiUrl','backendUrl','http'],
  props: {
    datos_proyectos: {
      type: Object,
      required: true,
    },
  },
  mounted(){
    console.log(this.baseApiUrl)

  },
  data() {
    const columns = [
      {
        name: "name",
        required: true,
        label: "NOMBRE DE PROYECTO",
        align: "left",
        field: "nombre", //MODIFICAR
        sortable: true,
      },
      {
        name: "username",
        align: "center",
        label: "PROGRAMAS",
        field: "cantidad_programas", //MODIFICAR
        sortable: true,
      },
      {
        name: "email",
        align: "center",
        label: "ORGANIZACION",
        field: "cantidad_proyectos", //MODIFICAR
        sortable: true,
      },
      {
        name: "email",
        align: "center",
        label: "EJECUTOR",
        field: "total_inversion", //MODIFICAR
        sortable: true,
      },
      {
        name: "email",
        align: "center",
        label: "PROYECTOS",
        field: "total_inversion", //MODIFICAR
        sortable: true,
      },
      {
        name: "email",
        align: "center",
        label: "PROYECTOS",
        field: "total_inversion", //MODIFICAR
        sortable: true,
      },
      {
        name: "email",
        align: "center",
        label: "PROYECTOS",
        field: "total_inversion", //MODIFICAR
        sortable: true,
      },
      {
        name: "email",
        align: "center",
        label: "PROYECTOS",
        field: "total_inversion", //MODIFICAR
        sortable: true,
      },
      {
        name: "email",
        align: "center",
        label: "PROYECTOS",
        field: "total_inversion", //MODIFICAR
        sortable: true,
      },
      {
        name: "email",
        align: "center",
        label: "PROYECTOS",
        field: "total_inversion", //MODIFICAR
        sortable: true,
      },
      {
        name: "email",
        align: "center",
        label: "PROYECTOS",
        field: "total_inversion", //MODIFICAR
        sortable: true,
      },
      {
        name: "email",
        align: "center",
        label: "PROYECTOS",
        field: "total_inversion", //MODIFICAR
        sortable: true,
      },
      {
        name: "email",
        align: "center",
        label: "PROYECTOS",
        field: "total_inversion", //MODIFICAR
        sortable: true,
      },
    ];
    return {
      columns,
      rows: [],
      valores: [],
      para_totales: [],
      respuestas_totales_inversiones: null,
      respuestas_total_numero_proyectos: null,
      url: null,
      showPdfViewer:false
      // process: process.env
    };
  },
  computed: {},
  methods: {
    truncateText(text, length) {
      // console.log(text);
      if (text != null) {
        return text.length > length ? text.slice(0, length) + "..." : text;
      }
    },

    formatNumber(number) {
      // Separa los miles
      const parts = number.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      // Si hay decimales, agrégales el punto
      if (parts.length === 2) {
        parts[1] = parts[1].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return parts.join(",");
      } else {
        return parts[0];
      }
    },
    openPdf(programaId){
      this.showPdfViewer=true
      const pdfLink = `${this.baseApiUrl}/reporte-programa-pdf/?programa_id=${programaId}`
      this.url = `https://docs.google.com/viewerng/viewer?url=${pdfLink}&embedded=true`
    }
  },
  mounted() {},
};
</script>

<style>
pre {
  padding: 0%;
  font-size: 20px;
  text-align: center;
  color: white;
  /* Define el punto de origen de la transformación */
}

th {
  color: white;
  font-weight: bold;
}
</style>
