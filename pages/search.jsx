import React from 'react';
import moment from 'moment';
import { observer, inject } from 'mobx-react';

import PostGrid from '../components/PostGrid';
import Layout from '../components/Layout';
import superagent from '../helpers/superagent';
import Page from '../components/context/page';
import SearchQuery from '../components/context/searchQuery';

moment.locale('ku');

@inject('userStore', 'tokenStore')
@observer
class Search extends React.Component {
  render() {
    const {
      links, page, totalPages, searchQuery,
    } = this.props;
    return (
      <div style={{ padding: 40 }}>
        <SearchQuery.Provider value={searchQuery}>
          <Page.Provider value={{ page, totalPages }}>
            <Layout hideLeftSidebar>
              <PostGrid data={links} />
            </Layout>
          </Page.Provider>
        </SearchQuery.Provider>
      </div>
    );
  }
}
export default Search;
export async function getServerSideProps(ctx) {
  const defualtNewsLimit = 14;
  let page = 1;
  try {
    page = parseInt(ctx.query.page || page, 10);
    page = page >= 1 ? page : 1;
  } catch (e) {
    page = 1;
  }
  const q = (ctx.query.q) ? ctx.query.q : null;
  const linksRes = await superagent.get('/link/list')
    .query({
      limit: defualtNewsLimit,
      offset: (page - 1) * defualtNewsLimit,
      q: (q == null) ? undefined : q,
    });
  const { totalRecords } = linksRes.body;
  return {
    props: {
      links: linksRes.body.records,
      page,
      totalPages: Math.ceil(totalRecords / defualtNewsLimit),
      searchQuery: q,
      // offset: req.query.offset,
    },
  };
}
