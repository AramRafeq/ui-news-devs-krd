import React from 'react';
import { Col, Row } from 'antd';
import PostCard from './PostCard';

class Slide extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <Row style={{ marginTop: 10 }} gutter={[10, 10]}>
        {data.map((d) => (
          <Col span={12}>
            <PostCard data={d} />
          </Col>
        ))}
      </Row>
    );
  }
}

export default Slide;
