import React from 'react';
import moment from 'moment';

import {
  Modal, Input, Button,
  Popover, Avatar, Row, Col,
} from 'antd';
import {
  ExportOutlined, SettingOutlined, UserOutlined, SearchOutlined,
} from '@ant-design/icons';
import Login from './Login';
import AuthGuard from './AuthGuard';

moment.locale('ku');
class Header extends React.Component {
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
      <>
        {/* Modals Section */}
        <Modal
          title="چوونه‌ژووره‌وه‌"
          visible={false}
          centered
          footer={null}
          width={350}
        >
          <Login />
        </Modal>
        <Modal
          title="test"
          visible
          centered
          footer={null}
          width={350}
        >
          <AuthGuard>
            <h1>Hello world</h1>
          </AuthGuard>
        </Modal>
        {/* End Of Modals Section */}
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
