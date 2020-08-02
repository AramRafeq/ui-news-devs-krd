import React from 'react';
import moment from 'moment';
import {
  Typography,
} from 'antd';
import {
  CodeOutlined,
} from '@ant-design/icons';
import Layout from '../components/Layout';

moment.locale('ku');

class Usage extends React.Component {
  render() {
    return (
      <div style={{ padding: 40 }}>
        <Layout containerStyle={{ padding: 25 }}>
          <Typography.Title>
            <CodeOutlined />
            {' '}
            به‌كارهێنان
          </Typography.Title>
          <Typography.Paragraph style={{ fontSize: 18 }}>
            هه‌موو كه‌سێك و لایه‌نێك ئازاده‌ له‌ به‌كارهێنانی ئه‌م ماڵپه‌ره ده‌توانیت لینكی
            RSS Feed ی ماڵپه‌ره‌كه‌ت دابنێیت ئه‌م سیسته‌مه‌ به‌ شێوازێكی
            خۆكارانه‌ نوێترین پۆسته‌كان له‌ ماڵپه‌ره‌كه‌ت وه‌رده‌گرێت و لێره‌دا پۆستیان ده‌كات‌
          </Typography.Paragraph>
          <u><h2>مه‌رجه‌كانی به‌كارهێنان</h2></u>
          <Typography.Paragraph style={{ fontSize: 18 }}>
            هه‌موو جۆره‌ ماڵپه‌رێك و به‌سته‌رێكی ته‌كنه‌لۆجیا رێگه‌پێدراوه‌
            به‌ده‌ر له‌مه‌ به‌سته‌ر ده‌سرێته‌وه‌ و به‌كارهێنه‌ر بلۆك ده‌كرێت،
            <br />
            به‌كارهێنانی URL Shortner ه‌كان پێویست نیه‌ و زۆربه‌یان بلۆك كراون له‌ لایه‌ن ئێمه‌وه‌
          </Typography.Paragraph>
        </Layout>

      </div>
    );
  }
}
export default Usage;
