import Vue from 'vue'
import Meetup from './views/Meetup'

Vue.config.productionTip = false

new Vue({
  render: h => h(Meetup),
}).$mount('#app')
