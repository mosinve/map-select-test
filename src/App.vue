<template>
  <div id="app">
    <source-list id            = 'source'
                 @map-selected = 'onSelected'
                 @map-added    = 'addToMap'
                 :source-data  = 'sourceData'></source-list>
    <div id='map'></div>
    <aside id = 'selection'>
      <ul class = 'list-group'>
        <li class = 'list-group-item'
            v-for = '(item, index) in selected' 
            :key  = 'index'> {{ item.item.coords }}
          <button type       = 'button'
                  class      = 'close'
                  aria-label = 'Close'
                  @click     = 'remove(index)'>
            <span aria-hidden = 'true'>&times;</span>
          </button>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
import leaflet from "leaflet";
import SourceList from "./components/SourceList";
import sourceData from "./sourceData";
import "leaflet/dist/leaflet.css";
import "bootstrap/dist/css/bootstrap.css";

export default {
  name: "app",

  components: {
    SourceList
  },

  data() {
    return {
      sourceData,
      map: null,
      selected: []
    };
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
  },

  methods: {
    addMarker(markerData) {
      const marker = leaflet
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
    },
    onSelected(data) {
      this.selected.push(data);
    },
    addToMap(e) {
      const clickedEl = e.target.__vue__;
      if (clickedEl.added) return;

      if (clickedEl.$children.length) {
        clickedEl.selected = true;
        clickedEl.$children.forEach(child => child.$el.click());
      }
      if (clickedEl.item.coords) {
        this.addMarker(clickedEl);
        clickedEl.added = true;
      }
    },
    remove(target) {
      const currentItem = this.selected[target];
      if (currentItem.$parent.selected) {
        this.addMarker(currentItem);
        currentItem.added = true;
      } else {
        currentItem.added = false;
      }

      this.selected.splice(target, 1);
    }
  }
};
</script>

<style lang='scss'>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: grid;
  grid-template-areas: "source map selection";
  grid-template-columns: 200px auto 200px;
  grid-template-rows: 100vh;
}

#source {
  grid-area: source;
}

#map {
  grid-area: map;
}

#selection {
  grid-area: selection;
}
</style>
