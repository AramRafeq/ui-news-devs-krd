import React from 'react';
import moment from 'moment';
import { observer, inject } from 'mobx-react';

import PostGrid from '../components/PostGrid';
import Carousel from '../components/Carousel';
import Layout from '../components/Layout';
import superagent from '../helpers/superagent';
import PopulerPublishers from '../components/context/populerPublishers';

moment.locale('ku');

@inject('userStore', 'tokenStore')
@observer
class Index extends React.Component {
  render() {
    const { publishers, links } = this.props;
    return (
      <div style={{ padding: 40 }}>
        <PopulerPublishers.Provider value={publishers}>
          <Layout>
            <Carousel data={links.slice(0, 3)} />
            <PostGrid data={links.slice(3, links.length)} />
          </Layout>
        </PopulerPublishers.Provider>

      </div>
    );
  }
}
export default Index;
export async function getServerSideProps(req) {
  const publisherRes = await superagent.get('/publisher/populer/list')
    .query({
      limit: 10,
      offset: 0,
    });
  const linksRes = await superagent.get('/link/list')
    .query({
      limit: 14,
      offset: 0,
    });
  return {
    props: {
      publishers: publisherRes.body,
      links: linksRes.body,
      // limit: req.query.limit,
      // offset: req.query.offset,
    },
  };
}
