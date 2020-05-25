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
        return Promise.reject(data);
    },
    err => Promise.reject(err)
)

export default axios;
