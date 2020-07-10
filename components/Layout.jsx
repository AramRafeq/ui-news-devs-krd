import React from 'react';
import moment from 'moment';

import {
  Button,
  Row, Col,
} from 'antd';
import {
  HomeOutlined, PlusOutlined, GithubOutlined, CodeOutlined, ExclamationCircleOutlined,
} from '@ant-design/icons';
import Header from './Header';
import LeftSidebar from './LeftSidebar';

moment.locale('ku');
class Layout extends React.Component {
  render() {
    const { children, hideLeftSidebar } = this.props;
    return (
      <>
        <Header />
        <Row justify="center" style={{ minHeight: '94vh', paddingTop: 50 }}>
          <Col span={4} style={{ paddingTop: 100 }}>
            <Row className="navlink-row" gutter={(30)}>
              <Col span={24}>
                <h2>
                  <Button
                    icon={<HomeOutlined />}
                    size="large"
                    style={{
                      border: 'none', borderRadius: 7, background: '#f7f7f6', color: '#878787',
                    }}
                  />
                  <span style={{ marginRight: 15 }}>ماڵه‌وه‌</span>
                </h2>
              </Col>
            </Row>
            <Row className="navlink-row" gutter={(30)}>
              <Col span={24}>
                <h2>
                  <Button
                    icon={<PlusOutlined />}
                    size="large"
                    style={{
                      border: 'none', borderRadius: 7, background: '#f7f7f6', color: '#878787',
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
                      border: 'none', borderRadius: 7, background: '#f7f7f6', color: '#878787',
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
                      border: 'none', borderRadius: 7, background: '#f7f7f6', color: '#878787',
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
                      border: 'none', borderRadius: 7, background: '#f7f7f6', color: '#878787',
                    }}
                  />
                  <span style={{ marginRight: 15 }}>دەربارەی ئێمە</span>
                </h2>
              </Col>
            </Row>

          </Col>
          <Col span={(!hideLeftSidebar) ? 15 : 20} style={{ background: '#f7f7f6', padding: 10, borderRadius: 7 }}>
            {children}
          </Col>

          {/* left sidebar content is here */}
          {
              (!hideLeftSidebar) ? (
                <Col span={5}>
                  <LeftSidebar />
                </Col>
              ) : null
          }

        </Row>
      </>
    );
  }
}

export default Layout;
