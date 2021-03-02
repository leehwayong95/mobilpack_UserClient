// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueCookie from 'vue-cookie'
import modal from 'vue-js-modal'
import naver from 'vue-naver-maps'
import vueMoment from 'vue-moment'

Vue.use(vueMoment)
Vue.use(VueCookie)
Vue.config.productionTip = false
Vue.prototype.$axios = axios

Vue.use(naver, {
  clientID: '94vq3rso8e',
  useGovAPI: false,
  subModeules: 'geocoder'
})

Vue.use(modal, { dynamic: true })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
