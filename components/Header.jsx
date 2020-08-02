/* eslint-disable react/destructuring-assignment */
import React from 'react';
import moment from 'moment';
import { observer, inject } from 'mobx-react';
import Router from 'next/router';

import {
  Modal, Input, Button,
  Popover, Avatar, Row, Col, Form,
} from 'antd';
import {
  ExportOutlined, SettingOutlined, UserOutlined, SearchOutlined, LoginOutlined, UserAddOutlined,
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
    this.loginFunction = () => {};
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
            loaded={(loginFunction) => {
              this.loginFunction = loginFunction;
            }}
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
          <Registration loginFunction={this.loginFunction} />
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

        <Row justify="center" gutter={(25)}>
          <Col span={6}>
            <Popover placement="bottomRight" content={profileDropdownContent} trigger="hover">
              <Avatar size={45} icon={tokenStore.value === '' ? <UserOutlined /> : null} src={tokenStore.value !== '' ? `${process.env.NEXT_PUBLIC_AWS_ENDPOINT}/${userStore.value.profile}` : null} />
              &nbsp;&nbsp;&nbsp;&nbsp;
              {
                (tokenStore.value !== '')
                  ? (
                    <span>
                      به‌خێربێیت
                      {' '}
                      {userStore.value.username}
                    </span>
                  )
                  : <span>{moment().format('lll').toString()}</span>
              }
            </Popover>
          </Col>
          <Col span={12}>
            <h1 className="header-txt">
              <span>دواین هه‌واڵی ته‌كنه‌لۆجی</span>
              &nbsp;
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
