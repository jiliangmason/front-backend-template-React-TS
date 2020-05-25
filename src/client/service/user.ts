import axios from './axios';

interface UserInfoVo {
    userName: string;
};

export async function getUserInfo() {
    const rsp = await axios.get<UserInfoVo>('/api/user');
    return rsp;
};

export async function logout() {
    await axios.get('/api/logout');
};
