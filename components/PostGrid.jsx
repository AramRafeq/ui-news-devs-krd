/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import uniqid from 'uniqid';

import { Col, Row, Empty } from 'antd';
import { ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';

import PostCard from './PostCard';
import Page from './context/page';
import SearchQuery from './context/searchQuery';

class Slide extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <Page.Consumer>
        {(ctx) => (
          <SearchQuery.Consumer>
            {(searchQueryCtx) => (
              <>
                <Row style={{ marginTop: 10 }} gutter={[10, 10]}>
                  {data.map((d) => (
                    <Col xs={24} sm={24} md={12} lg={12} key={uniqid()}>
                      <PostCard data={d} key={uniqid()} />
                    </Col>
                  ))}
                  {data.length <= 0 ? <Col span={24}><Empty description="هیچ به‌سته‌رێك نه‌دۆزرایه‌وه‌" /></Col> : null}
                </Row>
                <Row style={{ marginTop: 10 }} gutter={[10, 10]}>
                  <Col style={{ textAlign: 'center' }} xs={12} sm={12} md={12} lg={12}>
                    <Link href={`?page=${ctx.page + 1}${searchQueryCtx !== null && searchQueryCtx.page ? '' : `&q=${searchQueryCtx}`}`}>
                      <a style={{ display: ctx.page + 1 > ctx.totalPages ? 'none' : 'initial' }}>
                        <ArrowRightOutlined />
                        <span>پێشوو</span>
                      </a>
                    </Link>
                  </Col>
                  <Col style={{ textAlign: 'center' }} xs={12} sm={12} md={12} lg={12}>
                    <Link href={`?page=${ctx.page - 1}${searchQueryCtx !== null && searchQueryCtx.page ? '' : `&q=${searchQueryCtx}`}`}>
                      <a style={{ display: ctx.page <= 1 ? 'none' : 'initial' }}>
                        <span>نوێتر</span>
                        <ArrowLeftOutlined />
                      </a>
                    </Link>

                  </Col>
                </Row>
              </>
            )}

          </SearchQuery.Consumer>
        )}
      </Page.Consumer>

    );
  }
}

export default Slide;
