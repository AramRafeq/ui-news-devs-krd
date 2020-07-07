import React from 'react';
import {
  Row, Col, Avatar, Popover, Button, Input,
  Carousel,
} from 'antd';
import {
  UserOutlined, SettingOutlined, ExportOutlined, SearchOutlined,
} from '@ant-design/icons';
import Slide from '../components/Slide';

class UI extends React.Component {
  render() {
    const profileDropdownContent = (
      <>
        <Row className="profile-setting-row">
          <Col span={24}>
            <Button
              icon={<SettingOutlined />}
              size="middle"
              style={{
                border: 'none', borderRadius: 7, background: '#f7f7f6', color: '#878787',
              }}
            />
            &nbsp;&nbsp;
            <span>رێکخستەنکان</span>
          </Col>
        </Row>
        <Row className="profile-setting-row">
          <Col span={24}>
            <Button
              icon={<ExportOutlined />}
              size="middle"
              style={{
                border: 'none', borderRadius: 7, background: '#f7f7f6', color: '#878787',
              }}
            />
            &nbsp;&nbsp;
            <span>دەرچوون</span>
          </Col>
        </Row>
      </>
    );
    const data = [

      {
        img: 'https://www.sentry.dev/_assets2/static/index-header-lg-6a2edfb1d9841893801fd45ce890f904.jpg',
        title: 'هەڵەی کۆدەکانت بدۆزەوە بە باکارهێنانی sentry.io',
      },
      {
        title: 'مانای کۆد نوسین بزانە بۆ ئەوەی ببیت بە کەسێکی سەرکەوتوو',
        img: 'https://devstree.io/wp-content/uploads/2019/10/1_zTdZMxbTkVdXCOoZlXLnsg.png',
      },
      {
        title: 'فڵەتەر فێرببە دامەزراندنی بۆ یەکەم جار',
        img: 'https://codete.com/blog/wp-content/uploads/2018/07/cover-flutter-blog.jpg',
      },
      {
        title: 'پلەیس هۆڵدەرەکە',
        img: 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png',
      },
    ];

    return (
      <div style={{ padding: 40 }}>
        <Row justify="center" gutter={(25)}>
          <Col span={6}>
            <Popover placement="bottomRight" content={profileDropdownContent} trigger="hover">
              <Avatar size={45} icon={<UserOutlined />} />
            </Popover>
          </Col>
          <Col span={12}>
            <h1 className="header-txt">
              <span>ناوەندی گەشەپێدەران</span>
              <span style={{
                backgroundColor: '#2b2c34',
                margin: 15,
                color: 'white',
                fontSize: 15,
                padding: 5,
                borderRadius: 7,
              }}
              >
                هەواڵەکان
              </span>
            </h1>
          </Col>
          <Col span={6} align="center">
            <Input placeholder="بگەرێ بۆ بابەت" prefix={<Button icon={<SearchOutlined />} />} className="search-input" />

          </Col>
        </Row>
        {/* Bellow Is The Content */}
        <Row justify="center" style={{ minHeight: '94vh', marginTop: 50 }}>
          <Col span={4}>
            {/* <h1>sidebar haha</h1> */}
          </Col>
          <Col span={16} style={{ background: '#f7f7f6', padding: 10, borderRadius: 7 }}>
            <Carousel dots={{ className: 'slider-controller-container' }}>
              {data.map((d) => (
                <div key={d.img}>
                  {/* <img src={d.img} style={{ width: '100%' }} /> */}
                  <div key={d.img} className="slide-mask" />
                  <div style={{
                    borderRadius: 7,
                    height: 450,
                    width: '100%',
                    background: `url(${d.img})`,
                    backgroundSize: 'cover',
                    zIndex: 1,
                    position: 'relative',
                  }}
                  />
                  {/* <h2 style={{
                    textAlign: 'right',
                    position: 'relative',
                    background: 'red',
                    // marginTop: -170,
                    zIndex: 3,
                    color: 'white',
                    padding: 10,
                    bottom: 150,
                  }}
                  >
                    {d.title}
                  </h2> */}
                </div>
              ))}
            </Carousel>
          </Col>
          <Col span={4}>
            {/* <h1>Search</h1> */}
          </Col>
        </Row>
      </div>
    );
  }
}
export default UI;
