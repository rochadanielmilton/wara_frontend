<template>
  <div id="map"></div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Crear un nuevo icono rojo
const redIconUrl =
  "https://img.icons8.com/?size=100&id=PZTTDl8ML4vy&format=png&color=000000";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: redIconUrl,
  iconUrl: redIconUrl,
  shadowUrl: markerShadow,
});

export default {
  name: "MapView",
  data() {
    return {
      map: null,
      lastMarker: null,
      valor: null,
    };
  },
  mounted() {
    this.map = this.initializeMap();
    this.map.invalidateSize(); // Asegúrate de que el mapa se ajuste correctamente al contenedor
  },
  methods: {
    initializeMap() {
      let map = L.map("map").setView(
        [-16.22555284472855774425, -65.13407266640571435801],
        6.2
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      map.on("click", this.onMapClick); // Método para hacer clic en el mapa
      return map;
    },

    onMapClick(e) {
      if (this.valor) {
      var lat = e.latlng.lat;
      var lng = e.latlng.lng;
      console.log(`Latitud: ${lat}, Longitud: ${lng}`);
      this.$emit("actualizar-datos", {
        dato1: `${e.latlng.lat.toFixed(20)}`,
        dato2: `${e.latlng.lng.toFixed(20)}`,
      });
      this.addMarker({ latitud: lat, longitud: lng });
      }else{
        console.log('el valor esta aun en false',this.valor);
      }
    },

    addMarker(newVal) {
      if (newVal.latitud != null && newVal.longitud != null) {
        // console.log('estadobtn_guardar**',estado_btn_guardar.value);
        // Si hay un marcador anterior, lo elimina
        if (this.lastMarker) {
          this.map.removeLayer(this.lastMarker);
        }

        this.lastMarker = L.marker([newVal.latitud, newVal.longitud], {
          icon: L.icon({
            iconUrl: redIconUrl,
            iconSize: [35, 40],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowUrl: markerShadow,
            shadowSize: [41, 41],
          }),
        })
          .addTo(this.map)
          .openPopup();
      } else {
        console.log("no hay datos latitud y longitud");
      }
    },
  },
  props: {
    datos_mapa: {
      type: Object,
      required: true,
    },
    estado_btn_guardar: {
      type: Boolean,
      required: true,
    },
  },
  watch: {
    datos_mapa(newVal) {
      console.log("desde el hijoooooo:", newVal);
      this.addMarker(newVal);
    },
    estado_btn_guardar(valor) {
      console.log("valor del estado btn guardar:", valor);
      this.valor = valor;
    },
  },
};
</script>

<style>
/* Asegúrate de que el mapa tenga un tamaño definido */
#map {
  width: 100%;
  height: 600px;
}
</style>
