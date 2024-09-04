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
      nombre_departamento: [],
      valores: [],
      cantidad_proyectos: [],
      cantidad_programas: [],
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
              [0, '#d9f6e8'],
              [1, '#FFFFFF']
            ]
          }
        },
        title: {
          text: "NUMERO DE PROYECTOS ",
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
            text: "Cantidad proyectos",
          },
        },
        tooltip: {
          valueSuffix: "proyectos",
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
            return `<b>${this.series.name}</b><br/>${this.x}: ${this.y} proyectos`;
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
          data: datos_array,
          color: {
            linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
            stops: [
              [0, '#05876E'],
              [1, '#05682E']
            ]
          }
        }],
      });

    }

  },
  mounted() {
    // this.fetchData(null);
  },

  watch: {
    computerdata(objeto) {
      const vector = [];
      const nombres = [];
      for (const [key, value] of Object.entries(objeto)) {
        vector.push(value.cantidad_proyectos);
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
