import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'
import Index from '@/components/index/index'
import Footer from '@/components/footer/footer'
import Admin from '@/components/admin/admin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: App
    },
    {
      path: '/',
      name: 'footer',
      component: Footer,
      children: [
        {
          path: '/Axue-blog',
          component: Index
        },
      ]
    },
    {
      path: '/admin',
      component: Admin
    }
  ]
})
