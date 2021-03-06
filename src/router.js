import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import HomeIndex from './views/Home/Index/index'
import HomePlugins from './views/Home/Plugins'
import HomeDocument from './views/Home/Document'
import PluginPage from './views/PluginPage/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: {
        name: 'homeIndex'
      },
      children: [{
        name: 'homeIndex',
        component: HomeIndex,
        path: 'index'
      }, {
        name: 'homePlugins',
        component: HomePlugins,
        path: 'plugins'
      }, {
        name: 'homeDocument',
        component: HomeDocument,
        path: 'documents'
      }]
    }, {
      path: '/plugin',
      name: 'pluginPage',
      component: PluginPage
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
