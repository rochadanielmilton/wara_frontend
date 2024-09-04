<template>
  <div>
    <div>
      <q-markup-table flat bordered>
        <thead class="bg-teal-6">
          <tr>
            <th colspan="4">
              <pre>  <b>REPORTE GENERAL</b></pre>
            </th>
          </tr>
          <tr>
            <th class="text-left">Nombre</th>
            <th class="text-right">Programas</th>
            <th class="text-right">Proyectos</th>
            <th class="text-right">Total Inversion (Bs.)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in computerdata" :key="index">
            <td class="text-left">
              {{ truncateText(row.nombre, 25) }}
              <q-tooltip background-color="primary">{{ row.nombre }}</q-tooltip>
            </td>
            <td class="text-right">{{ row.cantidad_programas }}</td>
            <td class="text-right">{{ row.cantidad_proyectos }}</td>
            <td class="text-right">{{ this.format_miles(row.total_inversion) }}</td>
          </tr>
          <tr class="bg-teal-6">
            <td class="text-white"><b>TOTAL</b></td>
            <td class="text-right text-white"> <b>-</b></td>
            <td class="text-right text-white"><b>{{ aux_cantidad_proyectos }}</b></td>
            <td class="text-right text-white"><b>{{ aux_total_inversion }}</b></td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    computerdata: {
      type: Object,
      required: true
    },
  },

  data() {
    const columns = [
      {
        name: "name",
        required: true,
        label: "NOMBRE",
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
        label: "PROYECTOS",
        field: "cantidad_proyectos", //MODIFICAR
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
      aux_cantidad_programas: 0,
      aux_cantidad_proyectos: 0,
      aux_total_inversion: 0,

    };
  },
  methods: {

    format_miles(numero) {
      numero = parseInt(numero);
      return numero.toLocaleString();
    },
    truncateText(text, length) {
      return text.length > length ? text.slice(0, length) + '...' : text;
    },
    async fetchData(id_departamento, id_provincia) {
      try {

      } catch (error) {
        console.log(error);
      }
    },


  },


  watch: {
    computerdata(objeto) {
      // console.log('INGRESAMOS A TABLAS.');
      let suma_proyectos=0;
      let suma_programas =0;
      let total_inversion =0;
      for (const [key, value] of Object.entries(objeto)) {
        suma_proyectos +=value.cantidad_proyectos;
        suma_programas +=value.cantidad_programas;
        total_inversion+= parseInt(value.total_inversion);
      }
      this.aux_cantidad_programas = suma_programas;
      this.aux_cantidad_proyectos= suma_proyectos;
      this.aux_total_inversion = total_inversion.toLocaleString();
    },
  },
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
