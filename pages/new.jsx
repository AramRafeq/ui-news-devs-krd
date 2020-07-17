import React from 'react';
import moment from 'moment';

import NewPost from '../components/NewPost';
import Layout from '../components/Layout';

moment.locale('ku');

class UI extends React.Component {
  render() {
    return (
      <div style={{ padding: 40 }}>
        <Layout containerStyle={{ padding: 25 }}>
          <NewPost />
        </Layout>

      </div>
    );
  }
}
export default UI;
