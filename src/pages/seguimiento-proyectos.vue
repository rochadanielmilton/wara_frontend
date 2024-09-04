<template>
  <q-page>
    <Titulo titulo="Pendientes" icono="nature_people"></Titulo>
    <CrudTable
      :filters="filters"
      :columns="columns"
      :url="url"
      :order="'createdAt'"
    >
      <template v-slot:buttons="{ open }">
        <!-- <q-btn
          icon="add"
          color="primary"
          @click="openModal(open)"
          label="Nuevo menu"
        /> -->
      </template>
      <template v-slot:form="{ close, update }">
        <q-card style="width: 700px; max-width: 90vw">
          <q-toolbar class="q-pa-md">
            <q-icon name="settings" size="md" />
            <q-toolbar-title>
              {{ menu.id ? "Editar" : "Agregar" }} menu
            </q-toolbar-title>
            <q-space />
            <q-btn flat round icon="close" @click="closeModal(close)" />
          </q-toolbar>
          <q-card-section>
            <Seguimiento
              :valores="menu"
              @guardar="guardar(update, close)"
              @cancelar="closeModal(close)"
            ></Seguimiento>
          </q-card-section>
        </q-card>
      </template>
      <template v-slot:row="{ row, open, eliminar }">
        <q-tr
          :class="{
            'highlight-row':
              row.estado_seguimiento === 'pendiente' ||
              row.estado_seguimiento === 'observado' ||
              row.estado_seguimiento === 'subsanado',
          }"
        >
          <q-td class="wide-column">{{ row.proyecto_name }}</q-td>
          <q-td>{{ row.mes }}</q-td>
          <q-td>{{ row.anio }}</q-td>
          <q-td>{{ formatNumber(row.total_programado_proyecto) }}</q-td>
          <q-td>{{ formatNumber(row.avance_financiero_mes) }}</q-td>
          <q-td>{{ formatNumber(row.acumulado_financiero_mes) }}</q-td>
          <q-td>{{ row.acumulado_porcentaje_financiero_mes }}</q-td>
          <q-td>{{ row.porcentaje_avance_fisico_mes }}</q-td>
          <q-td>{{ row.acumulado_porcentaje_fisico_mes }}</q-td>
          <q-td>{{ formatNumber(row.saldo_programado_proyecto) }}</q-td>
          <!-- <q-td>{{ row.estado_seguimiento }}</q-td> -->

          <q-td
            :class="{
              'highlight-pendiente': row.estado_seguimiento === 'pendiente',
              'highlight-rechazado': row.estado_seguimiento === 'observado',
              'highlight-aprobado': row.estado_seguimiento === 'aprobado',
              'highlight-subsanado': row.estado_seguimiento === 'subsanado',
            }"
          >
            {{ row.estado_seguimiento }}</q-td
          >
          <q-td
            ><q-btn
              flat
              class="q-pa-xs q-mx-xs"
              :color="row.estado_seguimiento !== 'aprobado' ? 'red' : 'green'"
              :icon="row.estado_seguimiento !== 'aprobado' ? 'close' : 'check'"
          /></q-td>
          <q-td class="wide-column">{{ row.observacion_estado }}</q-td>
          <q-td>
            <div class="btn-group">
              <q-btn
                class="q-pa-xs"
                flat
                round
                color="green"
                icon="library_books"
                @click="
                  $router.push({
                    name: 'FichaSeguimiento',
                    params: { seguimiento_id: row.id },
                  })
                "
              >
                <q-tooltip>Ficha Seguimiento</q-tooltip>
              </q-btn>

              <q-btn
                class="q-pa-xs"
                flat
                round
                color="primary"
                icon="file_download"
                @click="descargar_pdf_especifico(row.id,row.mes,row.anio)"
              >
                <q-tooltip>Descargar PDF</q-tooltip>
              </q-btn>

              <q-btn
                v-if="row.estado_seguimiento === 'observado'"
                c
                class="q-pa-xs"
                flat
                round
                color="primary"
                icon="edit"
                @click="openModal(open, row.id)"
              >
                <q-tooltip>Editar</q-tooltip>
              </q-btn>
            </div>
          </q-td>
        </q-tr>
      </template>
    </CrudTable>
  </q-page>
</template>

<script>
import { ref, inject } from "vue";
import CrudTable from "@components/common/CrudTable";
import Menu from "components/Formularios/Menu";
import Seguimiento from "components/Formularios/Seguimiento.vue";

const filters = [
  {
    label: "MES",
    field: "mes",
    type: "input",
  },
  {
    name: "ANIO",
    field: "anio",
    label: "AÑO",
    type: "input",
  },
  {
    name: "estado_seguimiento",
    field: "estado_seguimiento",
    label: "ESTADO",
    type: "select",
    options: [
      {
        label: "observado",
        value: "observado",
      },
      {
        label: "aprobado",
        value: "aprobado",
      },
      {
        label: "subsanado",
        value: "subsanado",
      },
      {
        label: "pendiente",
        value: "pendiente",
      },
    ],
  },
];

const columns = [
  {
    name: "orden",
    label: "Proyecto",
    sortable: true,
  },

  {
    name: "ruta",
    label: "MES",
    sortable: true,
  },
  {
    name: "nombre",
    label: "AÑO",
    sortable: true,
  },
  {
    name: "orden",
    label: "total programado proyecto(Bs.)",
    sortable: true,
  },

  {
    name: "orden",
    label: "ejecutado mes(Bs.)",
    sortable: true,
  },
  {
    name: "orden",
    label: "acumulado mes(Bs.)",
    sortable: true,
  },
  {
    name: "orden",
    label: "avance financiero mes(%)",
    sortable: true,
  },
  {
    name: "orden",
    label: "avance fisico mes(%)",
    sortable: true,
  },
  {
    name: "orden",
    label: "acum fisico mes(%)",
    sortable: true,
  },
  {
    name: "orden",
    label: "saldo proyecto(Bs.)",
    sortable: true,
  },

  {
    name: "estado",
    label: "Estado Seguimiento",
    sortable: true,
  },
  {
    name: "orden",
    label: "APR. ",
    sortable: true,
  },
  {
    name: "orden",
    label: "Obs.",
    sortable: true,
    width: "300px",
  },

  {
    name: "acciones",
    label: "Acciones",
    sortable: false,
  },
];

export default {
  components: { CrudTable, Menu, Seguimiento },
  name: "Dashboard",
  setup() {
    const _http = inject("http");
    const _message = inject("message");

    const url = ref("/seguimientos/");

    const menu = ref({
      grupo: 1,
      nombre: null,
      descripcion: null,
      codigo: null,
      orden: 1,
    });

    const resetForm = () => {
      menu.value = {
        grupo: 1,
        nombre: null,
        descripcion: null,
        codigo: null,
        orden: 1,
      };
    };

    const openModal = async (open, id) => {
      // console.log(id);
      // console.log("jañlksjdfasdf");
      // resetForm();
      if (id) {
        menu.value = await _http.get(`${url.value}${id}/`);
        menu.value.avance_financiero_mes = parseInt(
          menu.value.avance_financiero_mes
        );
      }

      Object.assign(menu.value, {
        realizacion: menu.value.realizacion_id,
      }); //BACKEND

      console.log(menu.value);

      open();
    };

    const closeModal = (close) => {
      resetForm();
      close();
    };

    const guardar = async (update, close) => {
      const mensaje = !menu.value.id
        ? "Menu creado de manera exitosa."
        : "Menu actualizado de manera exitosa.";
      if (menu.value.id) {
        menu.value.estado_seguimiento;

        if (menu.value.avance_financiero_mes != null) {
          if (menu.value.avance_financiero_mes.length >= 5) {
            menu.value.avance_financiero_mes = parseInt(
              menu.value.avance_financiero_mes.replace(/,/g, ""),
              10
            );
          } else {
            menu.value.avance_financiero_mes = parseInt(
              menu.value.avance_financiero_mes
            );
          }
        }

        // menu.value.anio = menu.value.anio.label;
        // menu.value.mes = menu.value.mes.label;
        // menu.value.anio = menu.value.anio.toString();
        // menu.value.mes = menu.value.mes.toString();

        const campos = [
          "fotografia_1",
          "fotografia_2",
          "fotografia_3",
          "fotografia_4",
          "documento_respaldo_avance",
        ];
        campos.forEach((campo) => {
          if (
            menu.value[campo] == null ||
            typeof menu.value[campo] == "string"
          ) {
            delete menu.value[campo];
          }
        });

        if (typeof menu.value.porcentaje_avance_financiero_mes === "string") {
          menu.value.porcentaje_avance_financiero_mes = parseInt(
            menu.value.porcentaje_avance_financiero_mes.replace(/,/g, ""),
            10
          ); //convierte a entero
        }

        menu.value.created_by_id = 1; //BACKEND
        menu.value.update_by_id = 1; //BACKEND

        console.log("datos al guardar", menu.value);

        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const formData = new FormData();
        for (const [key, value] of Object.entries(menu.value)) {
          formData.append(key, value);
        }

        console.log("formdata*** PUT", formData);
        await _http.put(
          "/seguimientos/" + menu.value.id + "/",
          formData,
          config
        );
      } else {
        await _http.post(`${url.value}`, menu.value);
      }
      _message.success(mensaje);
      await update();
      closeModal(close);
    };

    const eliminar_pendiente = async (id) => {
      _http.put("/baja-ultimo-seguimiento/?seguimiento_id=" + id);

      _message.success("SE BORRO EL REGISTRO , ACTUALIZE LA PAGINA");
    };

    const descargar_pdf_especifico = async (id,mes,anio) => {
      try {
        const params = { seguimiento_id: id };
        const respuesta = await _http.get(
          _http.convertQuery("/reporte-seguimiento-mensual-pdf/", params),
          false,
          "blob"
        );
        descargarArchivo(new Blob([respuesta]), `Reporte de ${mes} ${anio}.pdf`);
        _message.success('ARCHIVO DESCARGADO');
      } catch (error) {
        _message.error("Error al descargar el archivo", error);
      }
    };

    const descargarArchivo = (blob, nombreArchivo) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", nombreArchivo);
      document.body.appendChild(link);
      link.click();
      link.remove();
    };

    const formatNumber = (value) => {
      if (value || value === 0) {
        // Convertir a cadena para asegurar que todos los números sean tratados correctamente
        let [integerPart, decimalPart] = value.toString().split(".");

        // Formatear la parte entera con puntos como separadores de miles
        integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        // Si existe una parte decimal, agregarla con una coma
        if (decimalPart) {
          return `${integerPart},${decimalPart}`;
        }

        return integerPart;
      } else {
        return value;
      }
    };
    return {
      menu,
      filters,
      columns,
      url,
      closeModal,
      openModal,
      guardar,
      eliminar_pendiente,
      descargar_pdf_especifico,
      formatNumber,
      descargarArchivo,
    };
  },
};
</script>
<style scoped>
.highlight-row {
  background-color: rgba(255, 0, 0, 0.048);
}

.highlight-pendiente {
  color: rgb(247, 138, 49);
  font-weight: bold;
}
.highlight-rechazado {
  color: red;
  font-weight: bold;
}
.highlight-subsanado {
  color: rgb(247, 138, 49);
  font-weight: bold;
}

.highlight-aprobado {
  color: rgb(8, 167, 8);
  font-weight: bold;
}

.red-title {
  color: rgb(8, 167, 8);
}

.elegant-button {
  width: 60px;
  height: 60px;

  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  /* Sombra sutil */
  transition: all 0.3s ease;
  /* Transición suave */
}

.elegant-button:hover {
  background-color: #0056b3;
  /* Color de fondo en hover */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  /* Sombra más pronunciada en hover */
  transform: scale(1.05);
  /* Efecto de aumento al pasar el ratón */
}
.btn-group {
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start; /* O 'center' o 'space-between', dependiendo de cómo quieras distribuir los botones */
  align-items: center;
}
.wide-column {
  width: 300px;
  text-align: center;
  white-space: normal;
  word-break: break-word;
  overflow-wrap: break-word;
  vertical-align: middle;
}
</style>
