import Vue from 'vue';
import Router from 'vue-router';
import App from '@/App';
import Index from '@/components/index/index';
import Admin from '@/components/admin/admin';
import Login from '@/components/login/login';
import Register from '@/components/login/register';
import Blog from '@/components/blog/blog';
import Home from '@/components/home/home';
import Articles from '@/components/articles/articles';
import Photographs from '@/components/photographs/photographs';
import Contact from '@/components/contact/contact';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: App
    },
    {
      path: '/',
      name: 'blog',
      component: Blog,
      children: [
        {
          path: '/Axue-blog',
          component: Index,
          children: [
            {
              path: '/Axue-blog/home',
              component: Home
            },
            {
              path: '/Axue-blog/articles',
              component: Articles
            },
            {
              path: '/Axue-blog/photographs',
              component: Photographs
            },
            {
              path: '/Axue-blog/contact',
              component: Contact
            }
          ]
        },
        {
          path: '/Axue-blog/login',
          component: Login
        },
        {
          path: '/Axue-blog/register',
          component: Register
        }
      ]
    },
    {
      path: '/Axue-blog/admin',
      component: Admin
    }
  ]
})
