import React from 'react';
import moment from 'moment';
import { observer, inject } from 'mobx-react';

import PostGrid from '../components/PostGrid';
import Carousel from '../components/Carousel';
import Layout from '../components/Layout';
import superagent from '../helpers/superagent';
import PopulerPublishers from '../components/context/populerPublishers';
import Page from '../components/context/page';

moment.locale('ku');

@inject('userStore', 'tokenStore')
@observer
class Index extends React.Component {
  render() {
    const {
      publishers, links, page, totalPages,
    } = this.props;
    return (
      <div style={{ padding: '1.1em' }}>
        <Page.Provider value={{ page, totalPages }}>
          <PopulerPublishers.Provider value={publishers}>
            <Layout>
              {
                (page <= 1)
                  ? (
                    <>
                      <Carousel data={links.slice(0, 3)} />
                      <PostGrid data={links.slice(3, links.length)} />
                    </>
                  )
                  : (
                    <PostGrid data={links} />)
              }

            </Layout>
          </PopulerPublishers.Provider>
        </Page.Provider>
      </div>
    );
  }
}
export default Index;
export async function getServerSideProps(ctx) {
  const publisherRes = await superagent.get('/publisher/populer/list')
    .query({
      limit: 10,
      offset: 0,
    });
    console.log(publisherRes)
  const defualtNewsLimit = 15;
  let page = 1;
  try {
    page = parseInt(ctx.query.page || page, 10);
    page = page >= 1 ? page : 1;
  } catch (e) {
    page = 1;
  }
  const linksRes = await superagent.get('/link/list')
    .query({
      limit: defualtNewsLimit,
      offset: (page - 1) * defualtNewsLimit,
    });
  const { totalRecords } = linksRes.body;
  return {
    props: {
      publishers: publisherRes.body,
      links: linksRes.body.records,
      page,
      totalPages: Math.ceil(totalRecords / defualtNewsLimit),
      // offset: req.query.offset,
    },
  };
}
