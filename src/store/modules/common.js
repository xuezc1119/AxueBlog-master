import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

var state = {
    searchValue: '',
};

var mutations = {
    changeSearch (state, data) {
        state.searchValue = data;
    }
};

export default ({
    state,
    mutations
})