import React from 'react';

export interface IappContext {
  isLoading: boolean;
  userName: string;
}

// 初始化 context，具体的方法在 provider 中实现
export const globalData: IappContext = {
  isLoading: false,
  userName: '',
};

export const AppContext = React.createContext<IappContext>(globalData);
