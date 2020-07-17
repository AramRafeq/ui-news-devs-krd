import React from 'react';
import moment from 'moment';

import {
  Modal, Input, Button,
  Popover, Avatar, Row, Col,
} from 'antd';
import {
  ExportOutlined, SettingOutlined, UserOutlined, SearchOutlined, LoginOutlined,
} from '@ant-design/icons';
import Login from './Login';

moment.locale('ku');

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = () => ({
      loginModalVisible: true,
    });
    this.state = this.initialState();
    this.toggleLoginModal = () => this.setState((prev) => ({
      loginModalVisible: !prev.loginModalVisible,
    }));
  }

  render() {
    const profileDropdownContent = (
      <>
        <Row className="profile-setting-row">
          <Col span={24}>
            <Button
              icon={<SettingOutlined />}
              size="middle"
              style={{
                border: 'none', borderRadius: 7, background: '#fbfbfb', color: '#878787',
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
                border: 'none', borderRadius: 7, background: '#fbfbfb', color: '#878787',
              }}
            />
              &nbsp;&nbsp;
            <span>دەرچوون</span>
          </Col>
        </Row>
        <Row className="profile-setting-row">
          <Col span={24} onClick={this.toggleLoginModal}>
            <Button
              icon={<LoginOutlined />}
              size="middle"
              style={{
                border: 'none', borderRadius: 7, background: '#fbfbfb', color: '#878787',
              }}
            />
              &nbsp;&nbsp;
            <span>چوونه‌ژووره‌وه‌</span>
          </Col>
        </Row>
      </>
    );
    const { loginModalVisible } = this.state;
    return (
      <>
        <Modal
          visible={loginModalVisible}
          centered
          width={650}
          footer={null}
          title="چوونه‌ژوره‌وه‌"
          onCancel={this.toggleLoginModal}
        >
          <Login />
        </Modal>

        <Row justify="center" gutter={(25)}>
          <Col span={6}>
            <Popover placement="bottomRight" content={profileDropdownContent} trigger="hover">
              <Avatar size={45} icon={<UserOutlined />} />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span>{moment().format('lll').toString()}</span>
            </Popover>
          </Col>
          <Col span={12}>
            <h1 className="header-txt">
              <span>دواین هه‌واڵی ته‌كنه‌لۆجی</span>
              <span style={{
                backgroundColor: '#2b2c34',
                margin: 15,
                color: 'white',
                fontSize: 15,
                padding: 5,
                borderRadius: 7,
              }}
              >
                ناوه‌ندی گه‌شه‌پێده‌ران
              </span>
            </h1>
          </Col>
          <Col span={6} align="center">
            <Input placeholder="بگەرێ بۆ بابەت" prefix={<Button icon={<SearchOutlined />} />} className="search-input" />
          </Col>
        </Row>

      </>

    );
  }
}

export default Header;
