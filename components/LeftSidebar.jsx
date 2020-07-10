import React from 'react';
import moment from 'moment';

import {
  Avatar, Row, Col, Card, Tag, List,
} from 'antd';
import {
} from '@ant-design/icons';

moment.locale('ku');
class Header extends React.Component {
  render() {
    return (
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
                // title="به‌ناوبانگترین لایه‌نه‌كان"
              bordered={false}
              bodyStyle={{
                borderRadius: 7,
              }}
              style={{ background: '#f7f7f6', width: '100%' }}
            >
              <span className="sidebar-card-header">به‌ناوبانگترین لایه‌نه‌كان</span>
              <List itemLayout="horizontal">
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar style={{ border: '2px solid rgb(182, 182, 182)' }} size={40} src="https://devstree.io/wp-content/uploads/2018/10/black.png" />}
                    title={<a href="https://ant.design">دره‌ختی گه‌شه‌پێده‌ران</a>}
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar style={{ border: '2px solid rgb(182, 182, 182)' }} size={40} src="https://kitn.net/wp-content/uploads/2019/10/kk-1.jpg" />}
                    title={<a href="https://ant.design"> ته‌كنه‌لۆجیای زانیاری كوردی</a>}
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar style={{ border: '2px solid rgb(182, 182, 182)' }} size={40} src="https://chawg.org/blog/wp-content/uploads/2018/09/cropped-LOGO_2018_WIKI_PODCAST_2-2.png" />}
                    title={<a href="https://ant.design"> چاوگ</a>}
                  />
                </List.Item>

              </List>
            </Card>
          </Col>
        </Row>

        <Row style={{ padding: 10, paddingTop: 30 }}>
          <Col span={24}>
            <Card
              bordered={false}
              bodyStyle={{
                borderRadius: 7,
              }}
              style={{ background: '#f7f7f6', width: '100%' }}
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
    );
  }
}

export default Header;
