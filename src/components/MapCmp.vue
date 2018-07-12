<template>
<div id = 'map'></div>
</template>

<script>
import leaflet from "leaflet";

export default {
  name: "Map",

  data() {
    return {
      map: null
    };
  },

  methods: {
    addMarker(markerData) {
      const marker = this.$leaflet
        .circle(markerData.item.coords, {
          color: "red",
          fillColor: "#f03",
          fillOpacity: 0.5,
          radius: 500,
          title: markerData.item.name
        })
        .addTo(this.map);
      marker.on("mouseover", () => {
        marker.remove();
        markerData.handleSelect(markerData);
      });
    }
  },

  mounted() {
    this.map = leaflet.map("map").setView([51.505, -0.09], 13);

    leaflet
      .tileLayer(
        "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
        {
          maxZoom: 18,
          id: "mapbox.streets",
          accessToken:
            "pk.eyJ1IjoiY2loIiwiYSI6ImNqamZ1bHV3czAyNzkzcXF1NzFxeHcwdXMifQ.zAzzFcN-vzWpbg-el2ExEw"
        }
      )
      .addTo(this.map);
  }
};
</script>
