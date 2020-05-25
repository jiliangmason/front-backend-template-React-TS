import axios from 'axios';

export interface BaseResponse<T> {
    result: number;
    data?: T;
    msg: string;
};

axios.create({
    baseURL: '/api',
    withCredentials: true,
});

axios.interceptors.response.use(
    res => {
        const { data } = res;
        if (data.result === 1) {
            return data;
        } 
        if (data.result === 10086) {
            window.location.href = `https://sso.corp.kuaishou.com/cas/login?service=${encodeURIComponent(window.location.href)}`;
        }
        return Promise.reject(data);
    },
    err => Promise.reject(err)
)

export default axios;
