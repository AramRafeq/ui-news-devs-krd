/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import uniqid from 'uniqid';

import {
  Col, Row, Empty, Popover, Popconfirm, Button, notification,
} from 'antd';
import { ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { observer, inject } from 'mobx-react';

import superagent from '../helpers/superagent';

import PostCard from './PostCard';
import Page from './context/page';
import SearchQuery from './context/searchQuery';

@inject('tokenStore')
@observer
class MyPostGrid extends React.Component {
  constructor(props) {
    super(props);

    this.deletePost = (post) => {
      const token = props.tokenStore.value;
      superagent.set('authorization', `Bearer ${token}`);
      superagent.delete(`/link/${post.id}`)
        .send({}).end((err) => {
          if (!err) {
            notification.success({
              message: 'سەرکەوتوبوو',
              description: 'به‌سته‌ر سرایه‌وه‌',
              placement: 'bottomRight',
            });
          }
        });
    };
  }

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
                    <Col span={8} key={uniqid()}>
                      <Popover content={(
                        <Popconfirm
                          title="دڵنیای له‌ سرینه‌وه‌ی پۆست؟ هیچ رێگایه‌ك نیه‌ بۆ گه‌راندنه‌وه‌"
                          onConfirm={() => this.deletePost(d)}
                          okText="به‌ڵی بیسره‌وه‌"
                          cancelText="نه‌خێر"
                        >
                          <Button type="primary" danger>بیسره‌وه‌</Button>
                        </Popconfirm>
                        )}
                      >
                        <PostCard data={d} key={uniqid()} />
                        <span />
                      </Popover>
                    </Col>
                  ))}
                  {data.length <= 0 ? <Col span={24}><Empty description="هیچ به‌سته‌رێك نه‌دۆزرایه‌وه‌" /></Col> : null}
                </Row>
                <Row style={{ marginTop: 10 }} gutter={[10, 10]}>
                  <Col style={{ textAlign: 'center' }} span={12}>
                    <Link href={`?page=${ctx.page + 1}${searchQueryCtx !== null && searchQueryCtx.page ? '' : `&q=${searchQueryCtx}`}`}>
                      <a style={{ display: ctx.page + 1 > ctx.totalPages ? 'none' : 'initial' }}>
                        <ArrowRightOutlined />
                        <span>پێشوو</span>
                      </a>
                    </Link>
                  </Col>
                  <Col style={{ textAlign: 'center' }} span={12}>
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

export default MyPostGrid;
