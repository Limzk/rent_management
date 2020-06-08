import Axios from 'axios';
import VueCookies from 'vue-cookies';


//设置Axios默认值
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 添加请求拦截器
Axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if(VueCookies.isKey('token')) {
      config.headers['Authorization'] = VueCookies.get('token');
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 登录接口
export function login(params) {
    return Axios.get('/api/user/login', { params } ).then( res => res.data )
}
// 首页获取数据
export function getData(params) {
    return Axios.get('/api/item/home/info', {params} ).then( res => res.data)
}
// 用户管理
export function userList(params) {
    return Axios.get('/api/user/list', { params}).then( res => res.data)
}
// 设置用户禁用
export function disable(params) {
    return Axios.post('/api/user/delete', params).then( res => res.data)
}
// 评论管理
export function commentList(params) {
    return Axios.get('/api/comment/list',{ params }).then( res => res.data)
}
// 删除评论
export function deleteComment(params) {
    return Axios.post('/api/comment/delete',params).then( res => res.data)
}
// 回复管理
export function replyList(params) {
    return Axios.get('/api/reply/list',{ params }).then( res => res.data)
}
// 删除回复
export function deleteReply(params) {
    return Axios.post('/api/reply/delete',params).then( res => res.data)
}
// 物品管理
export function itemList(params) {
    return Axios.get('/api/item/list',{params}).then( res => res.data)
}
// 更改物品状态
export function changeItemState(params) {
    return Axios.post('/api/item/update',params).then( res => res.data)
}


