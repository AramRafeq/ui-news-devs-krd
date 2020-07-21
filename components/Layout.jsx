import React from 'react';
import moment from 'moment';
import Router from 'next/router';
import { observer } from 'mobx-react';

import {
  Button,
  Row, Col,
  Modal,
} from 'antd';
import {
  HomeOutlined, PlusOutlined, GithubOutlined, CodeOutlined, ExclamationCircleOutlined,
} from '@ant-design/icons';
import Header from './Header';
import LeftSidebar from './LeftSidebar';
import NewPost from './NewPost';

moment.locale('ku');

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
  }

  render() {
    const {
      children, hideLeftSidebar, containerStyle, publishers,
    } = this.props;
    const { newPostModalVisible } = this.state;
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
        <Row justify="center" style={{ minHeight: '94vh', paddingTop: 50 }}>
          <Col span={4} style={{ paddingTop: 100 }}>
            <Row className="navlink-row" gutter={(30)}>
              <Col span={24} onClick={this.goHome}>
                <h2>
                  <Button
                    icon={<HomeOutlined />}
                    size="large"
                    style={{
                      border: 'none', borderRadius: 7, background: '#fbfbfb', color: '#878787',
                    }}
                  />
                  <span style={{ marginRight: 15 }}>ماڵه‌وه‌</span>
                </h2>
              </Col>
            </Row>
            <Row className="navlink-row" gutter={(30)}>
              <Col span={24} onClick={this.toggleNewModal}>
                <h2>
                  <Button
                    icon={<PlusOutlined />}
                    size="large"
                    style={{
                      border: 'none', borderRadius: 7, background: '#fbfbfb', color: '#878787',
                    }}
                  />
                  <span style={{ marginRight: 15 }}>بنووسە</span>
                </h2>
              </Col>
            </Row>
            <Row className="navlink-row" gutter={(30)}>
              <Col span={24}>
                <h2>
                  <Button
                    icon={<GithubOutlined />}
                    size="large"
                    style={{
                      border: 'none', borderRadius: 7, background: '#fbfbfb', color: '#878787',
                    }}
                  />
                  <span style={{ marginRight: 15 }}>گیتهەب</span>
                </h2>
              </Col>
            </Row>
            <Row className="navlink-row" gutter={(30)}>
              <Col span={24}>
                <h2>
                  <Button
                    icon={<CodeOutlined />}
                    size="large"
                    style={{
                      border: 'none', borderRadius: 7, background: '#fbfbfb', color: '#878787',
                    }}
                  />
                  <span style={{ marginRight: 15 }}>بەکارهێنان</span>
                </h2>
              </Col>
            </Row>
            <Row className="navlink-row" gutter={(30)}>
              <Col span={24}>
                <h2>
                  <Button
                    icon={<ExclamationCircleOutlined />}
                    size="large"
                    style={{
                      border: 'none', borderRadius: 7, background: '#fbfbfb', color: '#878787',
                    }}
                  />
                  <span style={{ marginRight: 15 }}>دەربارەی ئێمە</span>
                </h2>
              </Col>
            </Row>

          </Col>
          <Col
            span={(!hideLeftSidebar) ? 15 : 20}
            style={{
              background: '#fbfbfb', padding: 10, borderRadius: 7, ...containerStyle,
            }}
          >
            {children}
          </Col>

          {/* left sidebar content is here */}
          {
              (!hideLeftSidebar) ? (
                <Col span={5}>
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
