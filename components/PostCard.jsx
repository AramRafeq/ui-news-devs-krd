import React from 'react';
import { Card } from 'antd';

class Slide extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <Card
        cover={<div style={{ padding: 6 }}><img style={{ width: '100%', borderRadius: 7 }} alt="test" src={data.img} /></div>}
        headStyle={{ background: 'red' }}
      >
        <Card.Meta title={data.title} description={data.desc} />
      </Card>
    );
  }
}

export default Slide;
