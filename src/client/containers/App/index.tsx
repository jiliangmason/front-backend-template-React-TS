import * as React from 'react';
import { Layout, BackTop } from 'antd';
import { hot } from 'react-hot-loader/root';
import Header from '../Header';

const App: React.FunctionComponent = ({ children }) => {
  return (
    <div>
      <BackTop />
      <Layout>
        <Layout.Header>
          <Header />
        </Layout.Header>
        {children}
        <Layout.Footer style={{ textAlign: 'center' }}>
          footer
        </Layout.Footer>
      </Layout>
    </div>
  );
};

export default hot(App);
