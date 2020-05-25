/* eslint-disable no-use-before-define, @typescript-eslint/no-use-before-define */
import React, { useState, useEffect, useCallback } from 'react';
import { getUserInfo } from '../service/user';
import { AppContext, IappContext } from './appContext';

const AppProvider = ({ children }: React.Props<{ value: IappContext }>) => {
  const changeLoading = (isLoading: boolean) => {
    changeAppState((prevState: IappContext) => {
      return {
        ...prevState,
        isLoading,
      };
    });
  };

  const changeUserName = (userName: string) => {
    changeAppState((prevState: IappContext) => {
      return {
        ...prevState,
        userName,
      }
    }); 
  };

  const initAppState: IappContext = {
    isLoading: false,
    userName: '',
  };

  const [appState, changeAppState] = useState(initAppState);

  const fetchData = useCallback(() => {
    changeLoading(true);
    getUserInfo().then(res => {
      const { userName } = res.data;
      changeUserName(userName);
      changeLoading(false);
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return <AppContext.Provider value={appState}>{children}</AppContext.Provider>;
};

export default AppProvider;
