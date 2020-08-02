import React from 'react';
import moment from 'moment';
import { observer, inject } from 'mobx-react';

import PostGrid from '../components/PostGrid';
import Layout from '../components/Layout';
import superagent from '../helpers/superagent';
import Page from '../components/context/page';

moment.locale('ku');

@inject('userStore', 'tokenStore')
@observer
class Index extends React.Component {
  render() {
    const {
      links, page, totalPages,
    } = this.props;
    return (
      <div style={{ padding: 40 }}>
        <Page.Provider value={{ page, totalPages }}>
          <Layout hideLeftSidebar>
            <PostGrid data={links} />
          </Layout>
        </Page.Provider>
      </div>
    );
  }
}
export default Index;
export async function getServerSideProps(req) {
  const defualtNewsLimit = 14;
  let page = 1;
  try {
    page = parseInt(req.query.page || page, 10);
    page = page >= 1 ? page : 1;
  } catch (e) {
    page = 1;
  }
  const linksRes = await superagent.get('/link/list')
    .query({
      limit: defualtNewsLimit,
      offset: (page - 1) * defualtNewsLimit,
      q: 'Lucid',
    });
  const { totalRecords } = linksRes.body;
  return {
    props: {
      links: linksRes.body.records,
      page,
      totalPages: Math.ceil(totalRecords / defualtNewsLimit),
      // offset: req.query.offset,
    },
  };
}
