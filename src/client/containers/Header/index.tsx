import React, { useContext, useMemo } from 'react';
import { Dropdown, Menu } from 'antd';
import { AppContext } from '../../context/appContext';
import { logout } from '../../service/user';
import styles from './header.module.less';

const { Item } = Menu;

const Header: React.FC = () => {
    const { userName } = useContext(AppContext);
    const menu = useMemo(() => {
      return (
        <Menu>
          <Item>
            <div role="button" onClick={() => { logout() }}>退出登录</div>
          </Item>
        </Menu>
    );
    }, [userName]);

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <Dropdown overlay={menu}>
            <p className={styles.name}>{userName}</p>
          </Dropdown>
        </div>
      </div>
    )
};

export default Header;