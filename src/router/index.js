import Vue from 'vue';
import Router from 'vue-router';
import routes from './router';

Vue.use(Router)
const router = new Router({
  routes
});

router.beforeEach((to, from, next) => {
  if (!sessionStorage.getItem("token") && to.name !== 'login' && to.name !== 'home') { // 判断是否已经登录且前往的页面不是登录页
    next({
      name: 'login'
    })
  } else {
    next();
  }
});

export default router