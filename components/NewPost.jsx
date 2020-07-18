import React from 'react';
import moment from 'moment';
import { observer, inject } from 'mobx-react';

import {
  Form, Input, Button, Row, Col,
} from 'antd';
import Base64Uploader from './basic/Base64Uploader';
import AuthGuard from './AuthGuard';

moment.locale('ku');

@inject('userStore', 'tokenStore')
@observer
class NewPost extends React.Component {
  render() {
    return (
      <AuthGuard>
        {' '}
        <Form layout="vertical">
          <Row gutter={(10)}>
            <Col span={24}>
              <Form.Item label="سه‌ردێر">
                <Input style={{ borderRadius: 6 }} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item label="كورته‌ی بابه‌ت">
                <Input.TextArea rows={4} style={{ borderRadius: 6 }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[10, 10]}>
            <Col span={18}>
              <Form.Item label="به‌سته‌ر">
                <Input style={{ borderRadius: 6 }} />
              </Form.Item>
            </Col>
            <Col span={6} style={{ paddingTop: 20 }}>
              <Base64Uploader style={{ borderRadius: 7 }} text="وێنه‌یه‌ك هه‌ڵبژێره‌" removeText="بسره‌وه‌" />
            </Col>
          </Row>
          <Row gutter={[10, 10]}>
            <Col span={24}>
              <Button loading type="primary" style={{ background: '#2b2c34' }}>بڵاوكردنه‌وه‌</Button>
            </Col>
          </Row>
        </Form>
      </AuthGuard>

    );
  }
}

export default NewPost;
