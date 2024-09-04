<template>
  <div ref="chart"></div>
</template>
<script>
import Highcharts from "highcharts";

export default {

  props: {
    computerdata: {
      type: Object,
      required: true
    },
  },

  data() {
    return {
      cantidad_programas: [],
      cantidad_proyectos: [],
      nombre_departamento: [],
      total_inversion: [],
      valores: [],
    };
  },

  methods: {
    llena_grafico(datos_array, nombres_array) {
      //GENERAMOS GRAFICA
      Highcharts.chart(this.$refs.chart, {
        chart: {
          type: "column",
          backgroundColor: {
            linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
            stops: [
              [0, '#c6e2f9'],
              [1, '#FFFFFF']
            ]
          }
        },

        title: {
          text: "INVERSIÓN EN (MM)",
          align: "center",
        },

        xAxis: {
          categories: nombres_array,
          crosshair: true,
          accessibility: {
            description: "departamentos",
          },
          labels: {
            rotation: -45,
            align: 'right',
            style: {
              fontSize: '12px',
              fontFamily: 'Verdana, sans-serif'
            }
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: "Inversión (MM)",
          },
        },
        tooltip: {
          valueSuffix: "MM",
          backgroundColor: 'rgba(255,255,255,0.85)',
          borderColor: '#05876E',
          borderRadius: 10,
          borderWidth: 1,
          shadow: true,
          style: {
            color: '#333',
            fontWeight: 'bold'
          },
          formatter: function () {
            return `<b>${this.series.name}</b><br/>${this.x}: ${this.y} millones`;
          }
        },
        plotOptions: {
          column: {
            pointPadding: 0,
            borderWidth: 0,
            dataLabels: {
              enabled: true,
              format: '{y}',
              style: {
                fontWeight: 'bold',
                color: 'black',
              }
            }
          }
        },
        series: [{
          name: "LUGAR",
          // data: this.total_inversion.map(value => parseFloat(value)), // Ensure data is numeric
          data: datos_array.map(value => parseFloat(value)), // Ensure data is numeric
          color: {
            linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
            stops: [
              [0, '#0564b1'],
              [1, '#1190f7']
            ]
          }
        }],

      });
    },
  },
  mounted() {
    // this.fetchData(null);
  },

  watch: {

    computerdata(objeto) {
      const vector = [];
      const nombres = [];
      for (const [key, value] of Object.entries(objeto)) {
        // vector.push(value.total_inversion);
        vector.push((value.total_inversion/ 1000000).toFixed(2));
        nombres.push(value.nombre);
      }
      // console.log('resultado vector:');
      const datos_array = Object.values(vector); //de objeto a array (solo valores)
      const nombres_array = Object.values(nombres); //de objeto a array (solo valores)
      this.llena_grafico(datos_array, nombres_array);
    },

  },
};
</script>
