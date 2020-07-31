/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';

import { Col, Row } from 'antd';
import { ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import PostCard from './PostCard';
import Page from './context/page';

class Slide extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <Page.Consumer>
        {(ctx) => (
          <>
            <Row style={{ marginTop: 10 }} gutter={[10, 10]}>
              {data.map((d) => (
                <Col span={12}>
                  <PostCard data={d} />
                </Col>
              ))}
            </Row>
            <Row style={{ marginTop: 10 }} gutter={[10, 10]}>
              <Col style={{ textAlign: 'center' }} span={12}>
                <Link href={`?page=${ctx.page + 1}`}>
                  <a style={{ display: ctx.page + 1 >= ctx.totalPages ? 'none' : 'initial' }}>
                    <ArrowRightOutlined />
                    <span>پێشوو</span>
                  </a>
                </Link>
              </Col>
              <Col style={{ textAlign: 'center' }} span={12}>
                <Link href={`?page=${ctx.page - 1}`}>
                  <a style={{ display: ctx.page <= 1 ? 'none' : 'initial' }}>
                    <span>نوێتر</span>
                    <ArrowLeftOutlined />
                  </a>
                </Link>

              </Col>
            </Row>
          </>
        )}
      </Page.Consumer>

    );
  }
}

export default Slide;
