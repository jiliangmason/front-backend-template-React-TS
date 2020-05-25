import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Loading from './components/Loading';
import AppContextProvider from './context/appContextProvider';
import Routes from './router';

const { lazy, Suspense } = React;

const App = lazy(() => import('./containers/App/index'));

ReactDOM.render(
  <Suspense fallback={<Loading height="100vh" />}>
    <AppContextProvider>
      <BrowserRouter>
        <App>
          <Routes />
        </App>
      </BrowserRouter>
    </AppContextProvider>
  </Suspense>,
  document.getElementById('root')
);
