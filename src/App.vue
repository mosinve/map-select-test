<template>
  <div id="app">
    <source-list id            = 'source'
                 @map-selected = 'onSelected'
                 @map-added    = 'onAdded'
                 :source-data  = 'sourceData'></source-list>
    <map-cmp ref = 'map'></map-cmp>
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
import SourceList from "./components/SourceList";
import sourceData from "./sourceData";
import MapCmp from "./components/MapCmp";
import "leaflet/dist/leaflet.css";
import "bootstrap/dist/css/bootstrap.css";

export default {
  name: "app",

  components: {
    MapCmp,
    SourceList
  },

  data() {
    return {
      sourceData,
      selected: []
    };
  },

  methods: {
    onSelected(data) {
      this.selected.push(data);
    },
    onAdded(e) {
      const clickedEl = e.target.__vue__;
      if (clickedEl.selected || clickedEl.added) return;
      if (clickedEl.$children.length) {
        clickedEl.selected = true;
        clickedEl.$children.forEach(child => child.$el.click());
      }
      if (clickedEl.item.coords) {
        this.$refs.map.addMarker(clickedEl);
        clickedEl.added = true;
      }
    },
    remove(target) {
      const currentItem = this.selected[target];
      if (currentItem.$parent.selected) {
        this.$refs.map.addMarker(currentItem);
        currentItem.added = true;
      } else {
        currentItem.added = false;
      }

      this.selected = this.selected.filter((item, index) => index !== target);
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
