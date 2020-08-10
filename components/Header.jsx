/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import moment from 'moment';
import { observer, inject } from 'mobx-react';
import Router from 'next/router';
import Head from 'next/head';

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
        <Head>
          <title>🗞️ نوێترین وتار و هەواڵی تەکنەلۆژیی کوردی</title>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no" />
          <meta name="title" content="نوێترین وتار و هەواڵی تەکنەلۆژیی کوردی" />
          <meta name="description" content="ئاگاداربه‌ له‌ دواین هه‌واڵه‌ ته‌كنه‌لۆژیه‌كان كه‌ به‌ زمانی كوردی بڵاوده‌كرێنه‌وه‌، خوێنه‌ری بابه‌ته‌كانت زیاد بكه‌ له‌رێگه‌ی ئه‌م ماڵپه‌ره‌وه‌" />
          <meta name="keywords" content="developerstree, devstree,devstree.io,news.devs.krd, news-devs-krd, kurdish news, دواین هه‌واڵی ته‌كنه‌لۆژی, دره‌ختی گه‌شه‌پێده‌ران" />
          <meta property="article:author" content="https://devstree.io" />
          <meta property="og:locale" content="ckb_KU" />
          <meta property="og:site_name" content=" نوێترین وتار و هەواڵی تەکنەلۆژیی کوردی" />
          <meta property="og:description" content="‌‌ئاگاداربه‌ له‌ دواین هه‌واڵه‌ ته‌كنه‌لۆژیه‌كان كه‌ به‌ زمانی كوردی بڵاوده‌كرێنه‌وه‌، خوێنه‌ری بابه‌ته‌كانت زیاد بكه‌ له‌رێگه‌ی ئه‌م ماڵپه‌ره‌وه" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="نوێترین وتار و هەواڵی تەکنەلۆژیی کوردی" />
          <meta property="og:image" content="https://ewr1.vultrobjects.com/news-devs-krd/news-newspapers-ss-1920.jpg" />
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://newsdevs.krd/" />
          <meta property="twitter:title" content="نوێترین وتار و هەواڵی تەکنەلۆژیی کوردی" />
          <meta property="twitter:description" content="ئاگاداربه‌ له‌ دواین هه‌واڵه‌ ته‌كنه‌لۆژیه‌كان كه‌ به‌ زمانی كوردی بڵاوده‌كرێنه‌وه‌، خوێنه‌ری بابه‌ته‌كانت زیاد بكه‌ له‌رێگه‌ی ئه‌م ماڵپه‌ره‌وه" />
          <meta property="twitter:image" content="https://ewr1.vultrobjects.com/news-devs-krd/news-newspapers-ss-1920.jpg" />
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-77029418-4" />
          <script dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'UA-77029418-4');
                `,
          }}
          />

        </Head>
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
