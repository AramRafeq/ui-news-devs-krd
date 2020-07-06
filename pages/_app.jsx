import React from 'react';
import { ConfigProvider } from 'antd';
import 'antd/dist/antd.css';
import '../styles/vars.css';
import '../styles/global.css';
import '../styles/font.css';
import '../styles/main.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <ConfigProvider direction="rtl">
      <Component {...pageProps} />
    </ConfigProvider>
  );
}
