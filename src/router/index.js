import Vue from 'vue'
import Router from 'vue-router'
import Basic from '@/components/Basic'
import Cookie from '@/components/Cookie'
import Navigation from '@/components/Navigation'
import data from '@/page/data'
import data_table from '@/page/data/table'
import Directive from '@/learnVue/Directives'
import Mock from '@/components/mock.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Basic',
      component: Basic
    },
    {
      path: '/cookie',
      name: 'Cookie',
      component: Cookie
    },
    {
      path: '/data',
      name: 'Data',
      component: data,
      children:[
        {
          path:"table",
          component:data_table
        }
      ]
    },
    {
      path: '/navigation',
      name: 'Navigation',
      component: Navigation
    },
    {
      path: '/directive',
      name: 'Directive',
      component: Directive
    },
    {
      path: '/mock',
      name: 'Mock',
      component: Mock
    }
  ]
})
