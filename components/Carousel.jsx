import React from 'react';
import { Col, Row, Carousel } from 'antd';

import Slide from './Slide';

class CCarousel extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <Row>
        <Col span={24}>
          <Carousel dots={{ className: 'slider-controller-container' }}>
            {data.map((d) => (
              <Slide data={d} />
            ))}
          </Carousel>
        </Col>
      </Row>
    );
  }
}

export default CCarousel;
