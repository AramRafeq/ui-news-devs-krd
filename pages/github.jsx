import React from 'react';
import moment from 'moment';
import {
  Typography,
} from 'antd';
import {
  GithubOutlined,
} from '@ant-design/icons';
import superagent from '../helpers/superagent';

import Layout from '../components/Layout';
import PopulerPublishers from '../components/context/populerPublishers';

moment.locale('ku');

class Github extends React.Component {
  render() {
    const { publishers } = this.props;
    return (
      <PopulerPublishers.Provider value={publishers}>
        <div style={{ padding: 40 }}>
          <Layout containerStyle={{ padding: 25 }}>
            <Typography.Title>
              <GithubOutlined />
              {' '}
              گیتهه‌ب
            </Typography.Title>
            <Typography.Paragraph style={{ fontSize: 18 }}>
              ئه‌م پرۆژه‌یه‌ به‌ ته‌واوه‌تی سه‌رچاوه‌ كراوه‌یه‌ و ده‌توانیت به‌ هه‌ر شێوازێك ویستت
              كۆده‌كه‌ی ببه‌یت و له‌ پرۆژه‌ تاكه‌كه‌سیه‌كانت به‌كاری بهێنیت هیچ مه‌رجێكمان نیه‌
              سۆرس كۆده‌كه‌ له‌ سێ به‌شی سه‌ره‌كی پێكدێت
            </Typography.Paragraph>
            <u><h2>UI  پرۆژه‌كه‌</h2></u>
            <Typography.Paragraph style={{ fontSize: 18 }}>
              ئه‌وه‌یه‌ كه‌ وه‌ك ماڵپه‌ره‌كه‌ ده‌یبینیت به‌ ته‌كنه‌لۆجیایه‌كانی
              ReactJS,  NextJS  دروست كراوه‌
              &nbsp;
              <a href="https://github.com/DevelopersTree/ui-news-devs-krd">سه‌رچاوه‌ی كۆده‌كه‌ له‌ گیتهه‌ب</a>
            </Typography.Paragraph>
            <u><h2>API  پرۆژه‌كه‌</h2></u>
            <Typography.Paragraph style={{ fontSize: 18 }}>
              API كه‌ بریتیه‌ له مێشكی ئیشه‌كه‌ هه‌موو پۆستكرنێك و بابه‌ت نوسینێك
              بانگی به‌شێكی API ده‌كات به‌كارهێنه‌ری سه‌ره‌كی API بریتیه‌ له‌ به‌شی یه‌كه‌م
              UI ه‌كه‌ و به‌ NodeJs/ExpressJs دروست كراوه‌ بۆ په‌یوه‌ندی بنكه‌دراوه‌ش
              KnexJs به‌كارهاتووه‌
              &nbsp;
              <a href="https://github.com/DevelopersTree/news-devs-krd">سه‌رچاوه‌ی كۆده‌كه‌ له‌ گیتهه‌ب</a>
            </Typography.Paragraph>
            <u><h2>Cron Job</h2></u>
            <Typography.Paragraph style={{ fontSize: 18 }}>
              كرۆن جۆب ه‌كه به‌ .Net Core دروست كراوه‌ كه‌ تاكه‌ كاری ئه‌وه‌یه‌
              به‌ناو ماڵپه‌ری به‌كارهێنه‌ره‌كانماندا بروات و هه‌وڵبدات نوێترین به‌سته‌ره‌كان
              پۆست بكات له‌سه‌ر ئه‌كاونتی به‌كارهێنه‌ر‌
            </Typography.Paragraph>
          </Layout>

        </div>
      </PopulerPublishers.Provider>
    );
  }
}
export default Github;
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
