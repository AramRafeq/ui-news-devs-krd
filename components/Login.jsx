import React from 'react';
import moment from 'moment';
import { observer, inject } from 'mobx-react';

import {
  Form, Input, Button,
} from 'antd';

moment.locale('ku');

@observer
@inject('userStore', 'tokenStore')
class Login extends React.Component {
  render() {
    const { tokenStore, to } = this.props;
    if (`${tokenStore.value}`.trim() !== '') {
      return to;
    }
    return (
      <>
        <Form layout="vertical">
          <Form.Item label="ناوی به‌كارهێنه‌ر">
            <Input style={{ borderRadius: 6 }} />
          </Form.Item>
          <Form.Item label="تێپه‌ره‌ وشه‌">
            <Input style={{ borderRadius: 6 }} />
          </Form.Item>
          <Form.Item>
            <Button style={{ background: '#2b2c34' }} type="primary">چوونه‌ژووره‌وه‌</Button>
          </Form.Item>
        </Form>
      </>

    );
  }
}

export default Login;
