import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Notes from "./components/Notes";

Vue.use(VueRouter)
Vue.config.productionTip = false

const router = new VueRouter({
  routes: [
    { path: '/:id', component: Notes }
  ]
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
