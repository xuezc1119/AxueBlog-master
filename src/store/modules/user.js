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
    window.localStorage.setItem('userName', state.userInfo.userName);
    window.localStorage.setItem('userType', state.userInfo.userType);
    window.localStorage.setItem('userToken', state.userInfo.userToken);
    console.log(state.userInfo);
  }
};
export default({
  state,
  mutations
});