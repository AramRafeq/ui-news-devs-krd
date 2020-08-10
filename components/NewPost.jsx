/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import moment from 'moment';
import { observer, inject } from 'mobx-react';

import {
  Form, Input, Button, Row, Col, DatePicker, notification,
} from 'antd';

import superagent from '../helpers/superagent';
import Base64Uploader from './basic/Base64Uploader';
import AuthGuard from './AuthGuard';

// moment.locale('ku');
@observer
@inject('userStore', 'tokenStore')
class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = () => ({
      saving: false,
      thumbnail: '',
      original_thumbnail: '',
    });
    this.state = this.initialState();
    this.onFinish = (values) => {
      const token = props.tokenStore.value;
      superagent.set('authorization', `Bearer ${token}`);

      this.setState({ saving: true });
      const postObject = {
        ...values,
        post_date: moment(values.post_date).locale('en').format('YYYY-MM-DD').toString(),
      };
      const { thumbnail, original_thumbnail } = this.state;
      if (thumbnail !== '') {
        postObject.thumbnail = thumbnail;
        postObject.original_thumbnail = original_thumbnail;
      }
      superagent.post('/link')
        .send(postObject).end((err) => {
          this.setState({ saving: false });
          if (!err) {
            this.setState({ thumbnail: '' });
            if (this.form.current) {
              this.form.current.resetFields();
            }
            notification.success({
              message: 'سەرکەوتوبوو',
              description: 'به‌سته‌ری نوێ بڵاوكرایه‌وه‌',
              placement: 'bottomRight',
            });
          }
        });
    };
    this.imagePickerChanged = (img) => {
      if (img) {
        this.setState({ thumbnail: img });
      } else {
        this.setState({ thumbnail: '' });
      }
    };
    this.form = React.createRef();
  }

  render() {
    const { saving } = this.state;
    return (
      <AuthGuard>
        {' '}
        <Form layout="vertical" onFinish={this.onFinish} ref={this.form}>
          <Row gutter={(10)}>
            <Col xs={24} sm={24} md={18} lg={18}>
              <Form.Item
                label="سه‌ردێر"
                name="title"
                rules={[
                  {
                    required: true,
                    message: 'سه‌ردێری بابه‌ت پێویسته‌',
                  },
                  {
                    type: 'string',
                    min: 2,
                    message: 'سه‌ردێری بابه‌ت زۆر كورته‌',
                  },
                ]}
              >
                <Input style={{ borderRadius: 6 }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={6} lg={6}>
              <Form.Item
                label="به‌رواری  بابه‌ت"
                name="post_date"
                rules={[
                  {
                    required: true,
                    message: 'به‌رواری نوسینی بابه‌ت پێویسته‌',
                  },
                ]}
              >
                <DatePicker placeholder="به‌روار هه‌ڵبژێره‌" style={{ borderRadius: 6, width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[10, 10]}>
            <Col xs={24} sm={24} md={18} lg={18}>
              <Form.Item
                label="به‌سته‌ر"
                name="url"
                rules={[
                  {
                    required: true,
                    message: 'به‌سته‌ری بابه‌ت پێویسته‌',
                  },
                  {
                    type: 'url',
                    message: 'به‌سته‌ری بابه‌ت هه‌ڵه‌یه‌‌',
                  },
                ]}
              >
                <Input style={{ borderRadius: 6 }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={6} lg={6} style={{ paddingTop: 20 }}>
              <Base64Uploader callbackFunction={this.imagePickerChanged} style={{ borderRadius: 7 }} text="وێنه‌یه‌ك هه‌ڵبژێره‌" removeText="بسره‌وه‌" />
            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={24} md={24} lg={24}>
              <Form.Item
                label="كورته‌ی بابه‌ت"
                name="desc"
                rules={[
                  {
                    required: true,
                    message: 'كورته‌ی بابه‌ت پێویسته‌',
                  },
                  {
                    type: 'string',
                    min: 20,
                    message: 'كورته‌ی بابه‌ت زۆر كورته‌ پێوسیته‌ له‌ ٢٠ پیت كه‌متر نه‌بێت',
                  },
                ]}
              >
                <Input.TextArea rows={4} style={{ borderRadius: 6 }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[10, 10]}>
            <Col span={24}>
              <Button loading={saving} type="primary" htmlType="submit" style={{ background: '#2b2c34' }}>بڵاوكردنه‌وه‌</Button>
            </Col>
          </Row>
        </Form>
      </AuthGuard>

    );
  }
}

export default NewPost;
