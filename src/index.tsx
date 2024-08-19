/*
 * @Description:
 * @Author: didadida262
 * @Date: 2024-03-13 23:02:13
 * @LastEditors: didadida262
 * @LastEditTime: 2024-07-30 11:27:27
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { ThemeProvider } from './components/themeProvider';
import reportWebVitals from './reportWebVitals';
import router from './router';
import store from './store';
// import './mock/mock'

import './index.scss';
import './common.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <ThemeProvider>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </ThemeProvider>,
);

reportWebVitals();
