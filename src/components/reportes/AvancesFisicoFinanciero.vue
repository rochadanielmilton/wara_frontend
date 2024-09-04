<template>
    <div id="container" :style="{ minHeight: minHeight + 'px', minWidth: '100%' }"></div>
</template>

<script>
import { onMounted, watch, computed } from 'vue';
import Highcharts from 'highcharts';

export default {
    name: 'AvancesFisicoFinanciero',
    props: {
        datosProyectos: {
            type: Array,
            required: true,
        },
    },
    setup(props) {
        const minHeight = computed(() => {
            const baseHeight = 400;
            const additionalHeightPerDataPoint = 35;
            return baseHeight + (props.datosProyectos.length * additionalHeightPerDataPoint);
        });

        const renderChart = () => {
            if (!props.datosProyectos || !Array.isArray(props.datosProyectos) || props.datosProyectos.length === 0) {
                console.warn('datosProyectos is null, not an array, or empty');
                return;
            }

            Highcharts.chart('container', {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'Avances (Físico / Financiero)',
                    align: 'center',
                    style: {
            fontSize: '25px'  // Ajusta el tamaño de la fuente aquí
        }
                },
                xAxis: {
                    categories: props.datosProyectos.map(dp => dp.nombre),
                    title: {
                        text: null
                    },
                    gridLineWidth: 1,
                    lineWidth: 0
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Avances',
                        align: 'high'
                    },
                    labels: {
                        overflow: 'justify'
                    },
                    gridLineWidth: 0
                },
                tooltip: {
                    valueSuffix: ' %'
                },
                plotOptions: {
                    bar: {
                        borderRadius: '30%',
                        dataLabels: {
                            enabled: true
                        },
                        groupPadding: 0.1
                    }
                },
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom',
                    x: 0,
                    y: 14,
                    floating: true,
                    borderWidth: 1,
                    backgroundColor:
                        Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
                    shadow: true
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: 'Físico',
                    data: props.datosProyectos.map((dp, index) => ({
                        y: parseInt(dp.avance_fisico),
                        color: "#0b7bd6"
                    })),
                    color: "#0b7bd6"
                }, {

                    name: 'Financiero',
                    data: props.datosProyectos.map((dp, index) => ({
                        y: parseInt(dp.avance_financiamiento),
                        color: "#05876E"
                    })),
                    color: "#05876E"
                }]
            });
        };

        onMounted(() => {
            renderChart();
        });

        watch(() => props.datosProyectos, (newVal, oldVal) => {
            if (newVal !== oldVal) {
                renderChart();
            }
        }, { deep: true });

        return {
            minHeight
        };
    }
};
</script>
