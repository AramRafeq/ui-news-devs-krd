/* eslint-disable react/destructuring-assignment */
import React from 'react';
import moment from 'moment';
import { observer, inject } from 'mobx-react';
import Cookies from 'js-cookie';

import {
  Form, Input, Button,
} from 'antd';

import superagent from '../helpers/superagent';

moment.locale('ku');

@inject('userStore', 'tokenStore')
@observer
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = () => ({
      saving: false,
    });
    this.state = this.initialState();
    this.onFinish = (values) => {
      this.setState({ saving: true });
      superagent.post('/auth/login')
        .send({
          password: values.password,
          username: values.username,
        }).end((err, res) => {
          this.setState({ saving: false });
          if (!err) {
            const user = res.body;
            this.props.tokenStore.value = user.token;
            this.props.userStore.value = user;
            Cookies.set('news-devs-krd-token', user.token, { expires: 365 });
            try {
              const { toggleModal } = this.props;
              toggleModal();
              this.form.current.resetFields();
            } catch (e) {
            // who cares
            }
          }
        });
    };
    this.form = React.createRef();
  }

  componentDidMount() {
    try {
      this.props.loaded(this.onFinish);
    } catch (e) {
      // who cares
    }
  }

  render() {
    const { tokenStore, userStore, to } = this.props;
    const { saving } = this.state;
    if (`${tokenStore.value}`.trim() !== '') {
      if (to) {
        return to;
      }
      return (
        <h1>
          به‌خێربێیت
          {' '}
          {userStore.value.username}
          {'...'}
        </h1>
      );
    }
    return (
      <>
        <Form ref={this.form} layout="vertical" onFinish={this.onFinish}>
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
          <Form.Item
            label="تێپه‌ره‌ وشه‌"
            name="password"
            rules={[
              {
                required: true,
                message: 'داواكراوه‌ پێویسته‌ بنوسرێت',
              },
            ]}
          >
            <Input.Password style={{ borderRadius: 6 }} />
          </Form.Item>
          <Form.Item>
            <Button loading={saving} htmlType="submit" style={{ background: '#2b2c34' }} type="primary">چوونه‌ژووره‌وه‌</Button>
          </Form.Item>
        </Form>
      </>
    );
  }
}

export default Login;
