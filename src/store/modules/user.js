import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
var state = {
  userInfo: {
    userName: '',
    userType: '0', // 0未登录，1admin，2游客
    userToken: ''
  }
};
var mutations = {
  saveUserName (state, data) {
    state.userInfo.userName = data.userName;
    state.userInfo.userType = data.userType;
    state.userInfo.userToken = data.userToken;
    window.sessionStorage.setItem('userName', state.userInfo.userName);
    window.sessionStorage.setItem('userType', state.userInfo.userType);
    window.sessionStorage.setItem('token', state.userInfo.userToken);
    console.log(state.userInfo);
  }
};
export default({
  state,
  mutations
});