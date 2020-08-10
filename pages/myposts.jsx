import React from 'react';
import moment from 'moment';
import { observer, inject } from 'mobx-react';
import { parseCookies } from 'nookies';
import Router from 'next/router';

import MyPostGrid from '../components/MyPostGrid';
import Layout from '../components/Layout';
import superagent from '../helpers/superagent';

import Page from '../components/context/page';
import AuthGuard from '../components/AuthGuard';

moment.locale('ku');

@inject('tokenStore')
@observer
class MyPosts extends React.Component {
  render() {
    const {
      links, page, totalPages,
      tokenStore,
    } = this.props;
    if (`${tokenStore.value}`.trim() === '') {
      Router.push('/');
    }
    return (
      <div style={{ padding: '1.1em' }}>
        <Page.Provider value={{ page, totalPages }}>
          <Layout hideLeftSidebar>
            <h1>پۆسته‌كانم</h1>
            <AuthGuard>
              <MyPostGrid data={links} />
            </AuthGuard>
          </Layout>
        </Page.Provider>
      </div>
    );
  }
}
export default MyPosts;
export async function getServerSideProps(ctx) {
  const cookies = parseCookies(ctx);
  const token = cookies['news-devs-krd-token'];
  superagent.set('authorization', `Bearer ${token}`);
  const defualtNewsLimit = 14;
  let page = 1;
  try {
    page = parseInt(ctx.query.page || page, 10);
    page = page >= 1 ? page : 1;
  } catch (e) {
    page = 1;
  }
  if (token) {
    const linksRes = await superagent.get('/link/mylist')
      .query({
        limit: defualtNewsLimit,
        offset: (page - 1) * defualtNewsLimit,
      });
    const { totalRecords } = linksRes.body;
    return {
      props: {
        links: linksRes.body.records,
        page,
        totalPages: Math.ceil(totalRecords / defualtNewsLimit),
      },
    };
  }
  return {
    props: {
      links: [],
      page: 1,
      totalPages: 1,
    },
  };
}
