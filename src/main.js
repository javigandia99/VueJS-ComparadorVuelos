import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import BootstrapVue from "bootstrap-vue"
import VCalendar from 'v-calendar';

Vue.use(BootstrapVue)
Vue.use(VCalendar)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
