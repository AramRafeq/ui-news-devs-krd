/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import moment from 'moment';
import Router from 'next/router';
import Link from 'next/link';

import { observer, inject } from 'mobx-react';

import {
  Row, Col,
  Modal,
  Collapse,
} from 'antd';
import {
  HomeOutlined, PlusOutlined, GithubOutlined, CodeOutlined, ExclamationCircleOutlined,
  BookOutlined,
} from '@ant-design/icons';
import Header from './Header';
import LeftSidebar from './LeftSidebar';
import NewPost from './NewPost';

moment.locale('ku');

@inject('tokenStore')
@observer
class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = () => ({
      newPostModalVisible: false,
    });
    this.state = this.initialState();

    this.toggleNewModal = () => this.setState((prev) => ({
      newPostModalVisible: !prev.newPostModalVisible,
    }));
    this.goHome = () => {
      Router.push('/');
    };
    this.goToGithub = () => {
      Router.push('/github');
    };
    this.goToUsage = () => {
      Router.push('/usage');
    };
    this.goToMyPosts = () => {
      Router.push('/myposts');
    };
    this.goToAboutUs = () => {
      Router.push('/about');
    };
  }

  render() {
    const {
      children, hideLeftSidebar, containerStyle, publishers,
      tokenStore,
    } = this.props;
    const { newPostModalVisible } = this.state;
    const menus = (
      <>
        <Row className="navlink-row" gutter={(30)}>
          <Col span={24}>
            <Link href="/">
              <a>
                <h2>
                  <HomeOutlined className="nav-link-icon" />
                  <span style={{ marginRight: 15 }}>ماڵه‌وه‌</span>
                </h2>
              </a>
            </Link>
          </Col>
        </Row>
        <Row className="navlink-row" gutter={(30)}>
          <Col span={24} onClick={this.toggleNewModal}>
            <h2>
              <PlusOutlined className="nav-link-icon" />
              <span style={{ marginRight: 15 }}>بنووسە</span>
            </h2>
          </Col>
        </Row>
        {(tokenStore.value ? (
          <Row className="navlink-row" gutter={(30)}>
            <Col span={24} onClick={this.goToMyPosts}>
              <h2>
                <BookOutlined className="nav-link-icon" />
                <span style={{ marginRight: 15 }}>پۆسته‌كانم</span>
              </h2>
            </Col>
          </Row>
        ) : null)}

        <Row className="navlink-row" gutter={(30)}>
          <Col span={24}>
            <Link href="github">
              <a>
                <h2>
                  <GithubOutlined className="nav-link-icon" />
                  <span style={{ marginRight: 15 }}>گیتهەب</span>
                </h2>
              </a>
            </Link>
          </Col>
        </Row>
        <Row className="navlink-row" gutter={(30)}>
          <Col span={24}>
            <Link href="/usage">
              <a>
                <h2>
                  <CodeOutlined className="nav-link-icon" />
                  <span style={{ marginRight: 15 }}>بەکارهێنان</span>
                </h2>
              </a>
            </Link>

          </Col>
        </Row>
        <Row className="navlink-row" gutter={(30)}>
          <Col span={24}>
            <Link href="/about">
              <a>
                <h2>
                  <ExclamationCircleOutlined className="nav-link-icon" />
                  <span style={{ marginRight: 15 }}>دەربارەی ئێمە</span>
                </h2>
              </a>
            </Link>

          </Col>
        </Row>
      </>
    );
    return (
      <>
        <Modal
          visible={newPostModalVisible}
          centered
          width={650}
          footer={null}
          title="به‌سته‌ری نوێ"
          onCancel={this.toggleNewModal}
        >
          <NewPost />
        </Modal>
        <Header />
        <Row justify="center" className="main-content" style={{ minHeight: '94vh', paddingTop: 50 }}>
          <Col className="right-sidebar-container" xs={24} sm={24} md={4} lg={4} style={{ paddingTop: 100 }}>
            <Collapse className="mobile-menu" bordered={false}>
              <Collapse.Panel header="مینیوو ببینه‌">
                {menus}
              </Collapse.Panel>
            </Collapse>
            <div className="reguller-menu">{menus}</div>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={(!hideLeftSidebar) ? 15 : 20}
            lg={(!hideLeftSidebar) ? 15 : 20}
            style={{
              background: '#fbfbfb', padding: 10, borderRadius: 7, ...containerStyle,
            }}
          >
            {children}
          </Col>

          {/* left sidebar content is here */}
          {
              (!hideLeftSidebar) ? (
                <Col xs={24} sm={24} md={5} lg={5}>
                  <LeftSidebar publishers={publishers} />
                </Col>
              ) : null
          }

        </Row>
      </>
    );
  }
}

export default Layout;
