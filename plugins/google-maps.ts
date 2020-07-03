import Vue from 'vue'
// @ts-ignore
import * as VueGoogleMaps from 'gmap-vue'

export default () => {
  Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyBpQzIfVnHLGMRlTLvEYwpOll3hFPvpQcc',
      libraries: 'places',
      language: 'pt-BR'
    },
    installComponents: true
  })
}
