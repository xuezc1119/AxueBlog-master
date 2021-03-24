import Axios from 'axios';
import router from '../router';

var instance = Axios.create({
    timeout: 60000,
    headers: { 'Content-Type': 'application/json', 'charset':'utf-8', 'Mdt': 'ws-common', 'platform': 1 },
    transformRequest: [function (data) {
        data = JSON.stringify(data)
        return data
    }]
})

var reqInterceptor = function (config) {
    let params = config.data;
    function isString (o) {
        return Object.prototype.toString.call(o) === '[object String]';;
    }
    // 去空格
    for (let i in params) {
        if (params[i] !== undefined) {
            if (isString(params[i])) {
                params[i] = params[i].toString().trim()
            }
        }
    }
    if (!sessionStorage.getItem('token')) {
        sessionStorage.setItem('token', '');
        sessionStorage.clear();
        router.replace({
            name: 'login'
        })
    }
}

var resInterceptor = function (response) {
    if (response.data.status !== 1) {
        sessionStorage.setItem('token', '');
        sessionStorage.clear();
        router.replace({
            name: 'login'
        })
        return;
    }
    let respToken = response.headers.token
    if (respToken !== undefined) {
        sessionStorage.setItem('token', respToken);
    }
    return response
}
// 请求拦截
instance.interceptors.request.use(function (config) {
    let token = sessionStorage.getItem("token");
    if (token && token.length) {
        config.headers['token'] = sessionStorage.getItem("token");
    }
    reqInterceptor(config);
    return config;
})
// 响应拦截
instance.interceptors.response.use(function (response) {
    return resInterceptor(response);
})

// 注册
export const reqRegister = (params) => { return instance.post(`/api/admin/register`, params).then(res => res).catch(err => err) }
// 登录
export const reqLogin = (params) => { return instance.post(`/api/admin/login`, params).then(res => res).catch(err => err) }
// 退出
export const reqSignOut = (params) => { return instance.post(`/api/admin/signOut`, params).then(res => res).catch(err => err) }

// 新增文章
export const reqSaveArticle = (params) => { return instance.post(`/api/admin/saveArticle`, params).then(res => res).catch(err => err) }
// 更新文章
export const reqUpdateArticle = (params) => { return instance.post(`/api/admin/updateArticle`, params).then(res => res).catch(err => err) }
// 获取文章列表
export const reqGetArticleList = (params) => { return instance.post(`/api/admin/getArticleList`, params).then(res => res).catch(err => err) }
// 删除文章
export const reqDeleteArticle = (params) => { return instance.post(`/api/admin/deleteArticle`, params).then(res => res).catch(err => err) }
