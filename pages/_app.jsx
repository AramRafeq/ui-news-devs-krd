import React from 'react';
import { ConfigProvider } from 'antd';
import { Provider } from 'mobx-react';
import 'antd/dist/antd.css';
import '../styles/vars.css';
import '../styles/global.css';
import '../styles/font.css';
import '../styles/main.css';
import stores from '../store/index';

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider {...stores}>
      <ConfigProvider direction="rtl">
        <Component {...pageProps} />
      </ConfigProvider>
    </Provider>
  );
}
