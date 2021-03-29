// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import moment from 'moment';
// import vueResource from 'vue-resource';
import axios from 'axios';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import VueQuillEditor from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

Vue.use(VueQuillEditor);
// Vue.use(vueResource);
// 时间格式化工具
Vue.prototype.$moment = moment;
Vue.prototype.$axios = axios;
Vue.use(ViewUI); // 后台管理使用了iView框架
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
