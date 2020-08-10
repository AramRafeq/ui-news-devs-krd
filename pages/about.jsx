/* eslint-disable max-len */
import React from 'react';
import moment from 'moment';
import {
  Typography,
} from 'antd';
import {
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import superagent from '../helpers/superagent';

import Layout from '../components/Layout';
import PopulerPublishers from '../components/context/populerPublishers';

moment.locale('ku');

class Usage extends React.Component {
  render() {
    const { publishers } = this.props;
    return (
      <PopulerPublishers.Provider value={publishers}>
        <div style={{ padding: '1.1em' }}>
          <Layout containerStyle={{ padding: 25 }}>
            <Typography.Title>
              <ExclamationCircleOutlined />
              {' '}
              ده‌رباره‌ی ئێمه‌
            </Typography.Title>
            <Typography.Paragraph style={{ fontSize: 18 }}>
              ماڵپه‌ری له‌م جۆره‌ زۆرن له‌ جیهاندا به‌ڵام هه‌ستمان كرد زمانی كوردی بێبه‌شه‌ له‌
              خزمه‌تگوزاریه‌كی له‌و شێوه‌یه‌ ئه‌م جۆره‌ ماڵپه‌رانه‌ پێییان ده‌گوترێت News Aggregator
              كه‌ هه‌ڵده‌ستێت به‌ كۆكردنه‌وه‌ی دواین هه‌واڵه‌ ته‌كنه‌لۆجیه‌كان له‌ یه‌ك شوێنداو ته‌نها به‌سته‌ره‌كه‌ی بڵاوده‌كرێته‌وه‌
              به‌ یه‌ك كرته‌ ده‌توانیت بابه‌ته‌كه‌ بكه‌یته‌وه‌ له‌ ماڵپه‌ری سه‌ره‌كی.
            </Typography.Paragraph>
            <u><h2>كێ به‌رپرسه‌ له‌م ماڵپه‌ره‌</h2></u>
            <Typography.Paragraph style={{ fontSize: 18 }}>
              <a href="https://devstree.io">  دره‌ختی گه‌شه‌پێده‌ران </a>
              به‌رپرسه‌ له‌ دروستكردن و به‌رێوه‌ربردنی ئه‌م ماڵپه‌ره‌ هه‌ر ره‌خنه‌و پێشنیارێكتان هه‌یه‌
              ده‌توانن له‌
              <a href="https://www.facebook.com/DevelopersTree">‌  په‌ره‌ی فه‌یسبووك </a>

              نامه‌مان بۆ بنێرن
              یان له‌ رێگای ئیمه‌یڵی
              developerstree@gmail.com
            </Typography.Paragraph>
            <u><h2>چۆن سوودمه‌ندبم؟</h2></u>
            <Typography.Paragraph style={{ fontSize: 18 }}>
              ئه‌مه‌یان كارێكی ئاسانه‌ گه‌ر ماڵپه‌ر،كه‌ناڵی یوتوب،بلۆگه‌ر یان هه‌ر شتێكی له‌و شێوازه‌،
              بابه‌ت و ڤیدیۆ بڵاوده‌كه‌یته‌وه‌ به‌ زمانی كوردی له‌سه‌ر هه‌واڵی ته‌كنه‌لۆجی،فێركاری، ڤیدیۆ، یاریه‌ ئه‌لیكترۆنیه‌كان
              ته‌نها ببه‌ به‌ ئه‌ندام و به‌سته‌ری RSS Feed له‌ پرۆفایله‌كه‌ت دابنێ
              ئه‌م ماڵپه‌ره‌ خۆكارانه‌ دوای بابه‌ته‌كانت لێره‌دا بڵاوده‌كاته‌وه‌، له‌گه‌ڵ ئه‌وه‌ی خۆشت ده‌توانیت بابه‌ت و به‌سته‌ر دابنێیی
            </Typography.Paragraph>
          </Layout>

        </div>
      </PopulerPublishers.Provider>
    );
  }
}
export default Usage;
export async function getServerSideProps() {
  const publisherRes = await superagent.get('/publisher/populer/list')
    .query({
      limit: 10,
      offset: 0,
    });
  return {
    props: {
      publishers: publisherRes.body,
    },
  };
}
