/* eslint-disable react/destructuring-assignment */
import React from 'react';
import moment from 'moment';
import { observer, inject } from 'mobx-react';

import {
  Form, Input, Button, Row, Col,
} from 'antd';

import superagent from '../helpers/superagent';
import Base64Uploader from './basic/Base64Uploader';
import AuthGuard from './AuthGuard';

moment.locale('ku');

@inject('userStore', 'tokenStore')
@observer
class UpdateProfile extends React.Component {
  constructor(props) {
    super(props);
    const token = props.tokenStore.value;
    superagent.set('authorization', `Bearer ${token}`);
    this.initialState = () => ({
      saving: false,
      profile: '',
      original_profile: '',
    });
    this.state = this.initialState();
    this.onFinish = (values) => {
      this.setState({ saving: true });
      const postObject = {
        ...values,
      };
      if (this.state.profile !== '') {
        postObject.profile = this.state.profile;
        postObject.original_profile = this.state.original_profile;
      }
      superagent.put('/publisher')
        .send(postObject).end((err) => {
          this.setState({ saving: false });
          if (!err) {
            this.props.userStore.clear();
            this.props.tokenStore.clear();
            // this.forceUpdate();
          }
        });
    };
    this.imagePickerChanged = (img) => {
      if (img) {
        this.setState({ profile: img });
      } else {
        this.setState({ profile: '' });
      }
    };
    this.form = React.createRef();
  }

  componentDidMount() {
    const { userStore } = this.props;
    if (this.form.current) {
      this.setState({
        original_profile: userStore.value.profile,
      });
      this.form.current.setFieldsValue({
        username: userStore.value.username,
        website_url: userStore.value.website_url,
        email: userStore.value.email,
      });
    }
  }

  render() {
    const { saving } = this.state;
    const { userStore } = this.props;
    return (
      <AuthGuard>
        <Form ref={this.form} layout="vertical" onFinish={this.onFinish}>
          <Row gutter={(10)}>
            <Col span={12}>
              <Form.Item
                label="ناوی به‌كارهێنه‌ر"
              >
                <Input disabled style={{ borderRadius: 6 }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="به‌سته‌ری ماڵپه‌ر"
                name="website_url"
                rules={[

                ]}
              >
                <Input style={{ borderRadius: 6 }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={(10)}>
            <Col span={12}>
              <Form.Item
                name="password"
                label="تێپه‌ره‌وشه‌"
                rules={[
                  {
                    required: false,
                    message: 'تێپه‌ره‌وشه‌ پێویسته‌ بنوسرێت',
                  },
                ]}
                hasFeedback
              >
                <Input.Password style={{ borderRadius: 6 }} />
              </Form.Item>

            </Col>
            <Col span={12}>
              <Form.Item
                name="password_retype"
                label="دوباره‌ی تێپه‌ره‌وشه‌"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: false,
                    message: 'تكایه‌ دڵنیا به‌ره‌وه‌ له‌ تێپه‌روشه‌',
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('ێه‌و تێپه‌ره‌وشانه‌ی نوسراون جیاوازن!'));
                    },
                  }),
                ]}
              >
                <Input.Password style={{ borderRadius: 6 }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={(10)}>
            <Col span={12}>
              <Form.Item
                label="پۆستی ێه‌لیكترۆنی"
                name="email"
                rules={[

                ]}
              >
                <Input style={{ borderRadius: 6 }} />
              </Form.Item>
            </Col>
            <Col span={12} style={{ paddingTop: 15 }}>
              <Base64Uploader file={`${process.env.NEXT_PUBLIC_AWS_ENDPOINT}/${userStore.value.profile}`} callbackFunction={this.imagePickerChanged} style={{ borderRadius: 7 }} text="وێنه‌ی پرۆفایل" removeText="بسره‌وه‌" />
            </Col>
          </Row>
          <Form.Item>
            <Button loading={saving} htmlType="submit" style={{ background: '#2b2c34' }} type="primary">نوێكردنه‌وه‌</Button>
          </Form.Item>
        </Form>
      </AuthGuard>
    );
  }
}

export default UpdateProfile;
