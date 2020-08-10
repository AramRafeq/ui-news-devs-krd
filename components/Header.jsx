/* eslint-disable react/destructuring-assignment */
import React from 'react';
import moment from 'moment';
import { observer, inject } from 'mobx-react';
import Router from 'next/router';

import {
  Modal, Input, Button,
  Popover, Avatar, Row, Col, Form, Badge,
} from 'antd';
import {
  CheckOutlined,
  ExportOutlined, SettingOutlined,
  UserOutlined, SearchOutlined, LoginOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import Login from './Login';
import Registration from './Register';
import UpdateProfile from './UpdateProfile';
import SearchQuery from './context/searchQuery';

moment.locale('ku');

@inject('userStore', 'tokenStore')
@observer
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = () => ({
      loginModalVisible: false,
      registrationModalVisible: false,
      updateProfileModalVisible: false,
      searchLoading: false,
    });
    this.state = this.initialState();
    this.toggleLoginModal = () => this.setState((prev) => ({
      loginModalVisible: !prev.loginModalVisible,
    }));
    this.toggleRegistrationModal = () => this.setState((prev) => ({
      registrationModalVisible: !prev.registrationModalVisible,
    }));
    this.toggleUpdateProfileModal = () => {
      this.setState((prev) => {
        if (!prev.updateProfileModalVisible) {
          this.loadCurrentData();
        }
        return {
          updateProfileModalVisible: !prev.updateProfileModalVisible,
        };
      });
    };
    this.logout = () => {
      this.props.userStore.clear();
      this.props.tokenStore.clear();
    };
    this.onFinish = (values) => {
      this.setState({ searchLoading: true });
      Router.push(`/search?q=${values.search_query}`).then(() => {
        this.setState({ searchLoading: false });
      });
      // Router.push('/search', { query: { q: values.search_query } });
    };
    this.loadCurrentData = () => {};
  }

  render() {
    const { tokenStore, userStore } = this.props;
    const profileDropdownContent = (
      <>
        {
          (tokenStore.value !== '')
            ? (
              <>
                <Row className="profile-setting-row">
                  <Col span={24} onClick={this.toggleUpdateProfileModal}>
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
                  <Col span={24} onClick={this.logout}>
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
              </>
            ) : null
        }
        {
          (tokenStore.value === '')
            ? (
              <>
                <Row className="profile-setting-row">
                  <Col span={24} onClick={this.toggleRegistrationModal}>
                    <Button
                      icon={<UserAddOutlined />}
                      size="middle"
                      style={{
                        border: 'none', borderRadius: 7, background: '#fbfbfb', color: '#878787',
                      }}
                    />
                    &nbsp;&nbsp;
                    <span>خۆ تۆماركردن</span>
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
            ) : null
        }

      </>
    );
    const {
      loginModalVisible, registrationModalVisible, updateProfileModalVisible, searchLoading,
    } = this.state;
    return (
      <>
        <Modal
          visible={loginModalVisible}
          centered
          width={400}
          footer={null}
          title="چوونه‌ژوره‌وه‌"
          onCancel={this.toggleLoginModal}
        >
          <Login
            toggleModal={this.toggleLoginModal}
          />
        </Modal>
        <Modal
          visible={registrationModalVisible}
          centered
          width={650}
          footer={null}
          title="خۆتۆماركردن"
          onCancel={this.toggleRegistrationModal}
        >
          <Registration />
        </Modal>
        <Modal
          visible={updateProfileModalVisible}
          centered
          width={650}
          footer={null}
          title="نوێكردنه‌وه‌ی زانیاریه‌كان"
          onCancel={this.toggleUpdateProfileModal}
        >
          <UpdateProfile loadCurrentData={(updateFormDataLoader) => {
            this.loadCurrentData = updateFormDataLoader;
          }}
          />
        </Modal>
        <Row justify="center" gutter={(25)} className="header-row">
          <Col xs={24} sm={24} md={6} lg={6}>
            <Popover placement="bottomRight" content={profileDropdownContent} trigger="hover">
              {(userStore.value.verified)
                ? (
                  <Badge
                    style={{
                      background: '#5cb85c',
                      padding: 3,
                      borderRadius: 10,
                      color: 'white',
                    }}
                    offset={[40, 35]}
                    count={<CheckOutlined style={{ fontSize: 8 }} />}
                  >
                    <Avatar size={45} icon={tokenStore.value === '' ? <UserOutlined /> : null} src={tokenStore.value !== '' ? `${process.env.NEXT_PUBLIC_AWS_ENDPOINT}/${userStore.value.profile}` : null} />
                  </Badge>
                )
                : <Avatar size={45} icon={tokenStore.value === '' ? <UserOutlined /> : null} src={tokenStore.value !== '' ? `${process.env.NEXT_PUBLIC_AWS_ENDPOINT}/${userStore.value.profile}` : null} />}
              &nbsp;&nbsp;&nbsp;&nbsp;
              {
                (tokenStore.value !== '')
                  ? (
                    <span>
                      به‌خێربێیت
                      {' '}
                      <b>{userStore.value.display_name}</b>
                    </span>
                  )
                  : <span>{moment().format('lll').toString()}</span>
              }
            </Popover>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <h1 className="header-txt">
              <span>نوێترین وتار و هەواڵی تەکنەلۆژیی کوردی&nbsp;</span>
              <span style={{
                backgroundColor: '#2b2c34',
                margin: 15,
                color: 'white',
                fontSize: '1rem',
                padding: 5,
                borderRadius: 7,
              }}
              >
                <a href="https://devstree.io">دره‌ختی گه‌شه‌پێده‌ران</a>
              </span>
            </h1>
          </Col>
          <Col xs={24} sm={24} md={6} lg={6} align="center">
            <SearchQuery.Consumer>
              {(ctx) => (
                <Form onFinish={this.onFinish}>
                  <Form.Item
                    initialValue={ctx != null && ctx.page ? '' : ctx}
                    name="search_query"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: 'شوێنی گه‌ران به‌تاڵه‌',
                    //   },
                    // ]}
                  >
                    <Input placeholder="بگەرێ بۆ بابەت" prefix={<Button htmlType="submit" loading={searchLoading} icon={<SearchOutlined />} />} className="search-input" />
                  </Form.Item>
                </Form>
              )}
            </SearchQuery.Consumer>

          </Col>
        </Row>

      </>

    );
  }
}

export default Header;
