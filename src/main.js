import Vue from 'vue'
import App from './App.vue'
import BoostrapVue from 'bootstrap-vue'
import leaflet from 'leaflet'

Vue.config.productionTip = false
Vue.use(BoostrapVue)
Vue.prototype.$leaflet = leaflet

new Vue({
  render: h => h(App)
}).$mount('#app')
