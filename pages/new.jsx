import React from 'react';
import moment from 'moment';

import NewPost from '../components/NewPost';
import Layout from '../components/Layout';

moment.locale('ku');

class New extends React.Component {
  render() {
    return (
      <div style={{ padding: 40 }}>
        <Layout hideLeftSidebar containerStyle={{ padding: 25 }}>
          <h1>به‌سته‌ری نوێ  بنێره‌</h1>
          <NewPost />
        </Layout>

      </div>
    );
  }
}
export default New;
