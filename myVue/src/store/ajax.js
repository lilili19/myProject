import axios from 'axios';
import qs from 'qs';

const path = require('../../config/index');
const { host1, host2 } = path;
import ElementUI from 'element-ui'
// 返回信息提示处理
const status = function ({ code, msg }) {
    ElementUI.Message.error(msg);
    // console.error('请求错误信息:' + msg);
}
// ajax请求
const fetch = () => {
    const { token } = JSON.parse(sessionStorage.getItem('user')) || {};
    let ip = '';
    try {
        ip = returnCitySN["cip"];
    } catch(error) {

    }
    // const cname = returnCitySN["cname"];
    return axios.create({
        timeout: 10000,
        headers: {
            token,
            ip,
            // cname
        }
    })
};
export const http = {
    selectHost: (host) => {
        if (host == 2) return host2 + '/gateway/resource';
        return host1;
    },
    async post ({ url, data, host }, { success, error, abnormalError }, All) {
        await fetch().post(this.selectHost(host) + url, data)
        .then((response) => {
            if(All === 'all') { // 加All 代表需要全部返回 不做处理
                return success(response.data);
            }
            const { code, data, msg } = response.data;
            http.ajaxCallBack({ code, data, msg }, { success, error });
        })
        .catch((error) => {
            if(abnormalError) return abnormalError();
            // http.error(error, url);
        });
    },
    async get ({ url, data, host }, { success, error, abnormalError }, All) {
        await fetch().get(this.selectHost(host) + url + '?' + qs.stringify(data || {}))
        .then((response) => {
            if(All === 'all') { // 加All 代表需要全部返回 不做处理
                return success(response.data);
            }
            const { code, data, msg } = response.data;
            http.ajaxCallBack({ code, data, msg }, { success, error });
        })
        .catch((error) => {
            if(abnormalError) return abnormalError();
            // http.error(error, url);
        });
    },
    async put ({ url, data, host }, { success, error, abnormalError }, All) {
        await fetch().put(this.selectHost(host) + url, data)
        .then((response) => {
            if(All === 'all') { // 加All 代表需要全部返回 不做处理
                return success(response.data);
            }
            const { code, data, msg } = response.data;
            http.ajaxCallBack({ code, data, msg }, { success, error });
        })
        .catch((error) => {
            if(abnormalError) return abnormalError();
            // http.error(error, url);
        });
    },
    async delete ({ url, data, host }, { success, error, abnormalError }, All) {
        await fetch().delete(this.selectHost(host) + url + '?' + qs.stringify(data || {}))
        .then((response) => {
            if(All === 'all') { // 加All 代表需要全部返回 不做处理
                return success(response.data);
            }
            const { code, data, msg } = response.data;
            http.ajaxCallBack({ code, data, msg }, { success, error });
        })
        .catch((error) => {
            if(abnormalError) return abnormalError();
            // http.error(error, url);
        });
    },
    ajaxCallBack: ({ code, data, msg }, { success, error }) => {
        if (code == 200) {
            success && success(data, msg)
        } else {
            if(code === 401) {
                return window.location.href = '/login';
            }
            if (error) {
                error({ code, data, msg })
            } else {
                status({ code, msg });
            }
        }
    },
    error: (error, url) => {
        let errorMessage = '';
        if(error && error.response) {
            switch(error.response.status) {
                case 400:
                    errorMessage = '错误请求';
                break;
                case 401:
                    // window.location.reload();
                    // window.location.href = '/login';
                return;
                case 403:
                    errorMessage = '拒绝访问';
                break;
                case 404:
                    errorMessage = '请求错误，未找到资源';
                break;
                case 405:
                    errorMessage = '请合法操作';
                break;
                case 408:
                    errorMessage = '网络超时';
                break;
            }
        }
        status({ code: '', msg: errorMessage || url || '网络错误或服务器异常' });
    }
}

