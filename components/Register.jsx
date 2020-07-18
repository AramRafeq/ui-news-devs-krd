/* eslint-disable react/destructuring-assignment */
import React from 'react';
import moment from 'moment';
import { observer, inject } from 'mobx-react';

import {
  Form, Input, Button, Row, Col,
} from 'antd';

import superagent from '../helpers/superagent';
import Base64Uploader from './basic/Base64Uploader';

moment.locale('ku');

@inject('userStore', 'tokenStore')
@observer
class Register extends React.Component {
  constructor(props) {
    super(props);
    // const token = props.tokenStore.value;
    // superagent.set('authorization', `Bearer ${props.}`);
    this.initialState = () => ({
      saving: false,
      profile: '',
    });
    this.state = this.initialState();
    this.onFinish = (values) => {
      this.setState({ saving: true });
      const postObject = {
        ...values,
        profile: this.state.profile,
        email: values.email ? values.email : '',
        website_url: values.website_url ? values.website_url : '',
      };
      superagent.post('/publisher')
        .send(postObject).end((err) => {
          this.setState({ saving: false });
          if (!err) {
            this.props.loginFunction({
              username: values.username,
              password: values.password,
            });
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

  render() {
    const { saving } = this.state;
    return (
      <>
        <Form ref={this.form} layout="vertical" onFinish={this.onFinish}>
          <Row gutter={(10)}>
            <Col span={12}>
              <Form.Item
                label="ناوی به‌كارهێنه‌ر"
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'داواكراوه‌ پێویسته‌ بنوسرێت',
                  },
                ]}
              >
                <Input style={{ borderRadius: 6 }} />
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
                    required: true,
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
                    required: true,
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
              <Base64Uploader callbackFunction={this.imagePickerChanged} style={{ borderRadius: 7 }} text="وێنه‌ی پرۆفایل" removeText="بسره‌وه‌" />
            </Col>
          </Row>
          <Form.Item>
            <Button loading={saving} htmlType="submit" style={{ background: '#2b2c34' }} type="primary">خۆتۆماركردن</Button>
          </Form.Item>
        </Form>
      </>
    );
  }
}

export default Register;
