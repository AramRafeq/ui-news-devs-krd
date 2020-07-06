import React from 'react';
import {
  Row, Col, Avatar, Popover, Button, Input,
  Carousel,
} from 'antd';
import {
  UserOutlined, SettingOutlined, ExportOutlined, SearchOutlined,
} from '@ant-design/icons';

class UI extends React.Component {
  render() {
    const profileDropdownContent = (
      <>
        <Row className="profile-setting-row">
          <Col span={24}>
            <Button
              icon={<SettingOutlined />}
              size="middle"
              style={{
                border: 'none', borderRadius: 7, background: '#f7f7f6', color: '#878787',
              }}
            />
            &nbsp;&nbsp;
            <span>رێکخستەنکان</span>
          </Col>
        </Row>
        <Row className="profile-setting-row">
          <Col span={24}>
            <Button
              icon={<ExportOutlined />}
              size="middle"
              style={{
                border: 'none', borderRadius: 7, background: '#f7f7f6', color: '#878787',
              }}
            />
            &nbsp;&nbsp;
            <span>دەرچوون</span>
          </Col>
        </Row>
      </>
    );
    return (
      <div style={{ padding: 40 }}>
        <Row justify="center" gutter={(25)}>
          <Col span={6}>
            <Popover placement="bottomRight" content={profileDropdownContent} trigger="hover">
              <Avatar size={45} icon={<UserOutlined />} />
            </Popover>
          </Col>
          <Col span={12}>
            <h1 className="header-txt">
              <span>ناوەندی گەشەپێدەران</span>
              <span style={{
                backgroundColor: '#2b2c34',
                margin: 15,
                color: 'white',
                fontSize: 15,
                padding: 5,
                borderRadius: 7,
              }}
              >
                هەواڵەکان
              </span>
            </h1>
          </Col>
          <Col span={6} align="center">
            <Input placeholder="بگەرێ بۆ بابەت" prefix={<Button icon={<SearchOutlined />} />} className="search-input" />

          </Col>
        </Row>
        {/* Bellow Is The Content */}
        <Row justify="center" style={{ minHeight: '94vh' }}>
          <Col span={6}>
            <h1>sidebar haha</h1>
          </Col>
          <Col span={12}>
            <Carousel style={{ width: '100%' }}>
              <div>
                <h3>1</h3>
              </div>
              <div>
                <h3>2</h3>
              </div>
              <div>
                <h3>3</h3>
              </div>
              <div>
                <h3>4</h3>
              </div>
            </Carousel>
          </Col>
          <Col span={6}>
            <h1>Search</h1>
          </Col>
        </Row>
      </div>
    );
  }
}
export default UI;
