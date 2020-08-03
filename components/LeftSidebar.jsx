import React from 'react';
import moment from 'moment';
import {
  Avatar, Row, Col, Card, Tag, List,
  Badge, Popover,
} from 'antd';
import { CheckOutlined } from '@ant-design/icons';

import uniqid from 'uniqid';

import PopulerPublishers from './context/populerPublishers';

moment.locale('ku');
class Header extends React.Component {
  constructor(props) {
    super(props);

    this.initialState = () => ({});
    this.state = this.initialState();
    // this.loadPublishers = () => {
    //   superagent.post('/auth/login')
    //     .send({
    //       password: values.password,
    //       username: values.username,
    //     }).end((err, res) => {
    //       this.setState({ saving: false });
    //       if (!err) {
    //         const user = res.body;
    //         this.props.tokenStore.value = user.token;
    //         this.props.userStore.value = user;
    //         try {
    //           const { toggleModal } = this.props;
    //           toggleModal();
    //         } catch (e) {
    //         // who cares
    //         }
    //       }
    //     });
    // };
  }

  render() {
    return (
      <PopulerPublishers.Consumer>
        {(ctx) => (
          <>
            <style>
              {`
            .ant-card-head-title{
              font-size: 12px;
              padding: 14px;
              height: 100%;
              width: 100%;
            }
            .ant-card-head-wrapper{
              margin: 0;
              height: 100%;
            }
            .ant-list-item-meta-content{
              padding-top: 6px;
            }
            .ant-list-item-meta-avatar{
              margin-left: 9px !important;
            }
            `}

            </style>
            <Row style={{ padding: 10, paddingTop: 30 }}>
              <Col span={24}>
                <Card
                  bordered={false}
                  bodyStyle={{
                    borderRadius: 7,
                  }}
                  style={{ background: '#fbfbfb', width: '100%' }}
                >
                  <span className="sidebar-card-header">به‌ناوبانگترین لایه‌نه‌كان</span>
                  <List itemLayout="horizontal">
                    {
                      ctx.map((p) => (
                        <List.Item key={uniqid()}>
                          <List.Item.Meta
                            avatar={
                              (p.verified)
                                ? (
                                  <Popover content={<img alt="" width={150} src={`${process.env.NEXT_PUBLIC_AWS_ENDPOINT}/${p.profile}`} />}>

                                    <Badge
                                      style={{
                                        background: '#5cb85c',
                                        padding: 3,
                                        borderRadius: 10,
                                        color: 'white',
                                      }}
                                      offset={[35, 30]}
                                      count={<CheckOutlined style={{ fontSize: 8 }} />}
                                    >
                                      <Avatar style={{ border: '2px solid rgb(182, 182, 182)' }} size={40} src={`${process.env.NEXT_PUBLIC_AWS_ENDPOINT}/${p.profile}`} />
                                    </Badge>
                                  </Popover>
                                )
                                : (
                                  <Popover content={<img alt="" width={150} src={`${process.env.NEXT_PUBLIC_AWS_ENDPOINT}/${p.profile}`} />}>
                                    <Avatar style={{ border: '2px solid rgb(182, 182, 182)' }} size={40} src={`${process.env.NEXT_PUBLIC_AWS_ENDPOINT}/${p.profile}`} />
                                  </Popover>
                                )

                          }
                            title={(
                              <a href={p.website_url} rel="noreferrer" target="_blank">
                                {' '}
                                {p.display_name}
                              </a>
                            )}
                          />
                        </List.Item>
                      ))
                    }
                  </List>
                </Card>
              </Col>
            </Row>

            <Row style={{ padding: 10, paddingTop: 30, display: 'none' }}>
              <Col span={24}>
                <Card
                  bordered={false}
                  bodyStyle={{
                    borderRadius: 7,
                  }}
                  style={{ background: '#fbfbfb', width: '100%' }}
                >
                  <span className="sidebar-card-header">تاگه‌كان</span>
                  <Tag className="sidebar-tag">یاریه‌ ئه‌لیكترۆنیه‌كان</Tag>
                  <Tag className="sidebar-tag">كۆدنووسین</Tag>
                  <Tag className="sidebar-tag">مۆبایل</Tag>
                  <Tag className="sidebar-tag">پۆدكاس</Tag>
                  <Tag className="sidebar-tag">دواین داهێنان</Tag>
                  <Tag className="sidebar-tag">پله‌یسته‌یشن</Tag>
                  <Tag className="sidebar-tag">هه‌ڵه‌</Tag>
                  <Tag className="sidebar-tag">وینه‌</Tag>
                </Card>
              </Col>
            </Row>
          </>
        )}

      </PopulerPublishers.Consumer>
    );
  }
}

export default Header;
