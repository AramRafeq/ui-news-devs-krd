import React from 'react';
import {
  Row, Col, Avatar, Popover, Button, Input,
  Carousel,
} from 'antd';
import {
  UserOutlined, SettingOutlined, ExportOutlined, SearchOutlined,
  HomeOutlined, PlusOutlined, GithubOutlined, CodeOutlined, ExclamationCircleOutlined,
} from '@ant-design/icons';
import Slide from '../components/Slide';
import PostCard from '../components/PostCard';

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
        desc: 'سڵاو لەپاش دابڕانێکی هێجگار زۆر، من سامڕەند حاجی سەرنوسەری ماڵپەری درەختی گەشەپێدەران و لێکۆڵەرەوەی بواری ئاسایشی زانیاریەکان لەگاڵتاندام بۆ زنجیرەیەک بابەت کە تایبەتە بە پاراستنی زانیاریەکان هەرچەندە چەندین بابەتی سەربەخۆ لەسەر پاراستنی زانیاریەکان لە ماڵپەرەکەماندا هەیە، بەڵام دەمانەوەێت هەمووی لە چەند زنجیرەیەکدا باس بکەینەوە. لە ماڵپەرەکەمانەوە بینەربە.',
      },
      {
        title: 'مانای کۆد نوسین بزانە بۆ ئەوەی ببیت بە کەسێکی سەرکەوتوو',
        img: 'https://devstree.io/wp-content/uploads/2019/10/1_zTdZMxbTkVdXCOoZlXLnsg.png',
        desc: 'وەك ئاگادارین فلەتەر ئێستا بۆتە یەكەێك لە بەناوبانگترین تەكنەلۆجیای دروست كردنی ئاپی مۆبایل و ئێمە ڵەم بابەتەیا فێرتان ئەكەین چۆن لەسەر كۆمپیوتەرەكانمان جێگیری بكەین و كاری پێبكەین.',
      },
      {
        title: 'فڵەتەر فێرببە دامەزراندنی بۆ یەکەم جار',
        img: 'https://codete.com/blog/wp-content/uploads/2018/07/cover-flutter-blog.jpg',
        desc: 'ئێمە چەند پڕۆژەیەکەمان هەیە و پڕۆژەکانیش هەمووی سەرچاوەکراوەن. بۆ نموونە ناوی کوردی و پێرمادیلیت. بەڵام ئەوجارە پلانمان وایە کە جگە لەوەی کۆدەکەی سەرچاوەکراوەبێت، تەواوی پڕۆسەی درووست کردنەکەشی ڕیکۆرد بکەین و لە وێبسایتی درەختی گەشەپێدەران بڵاویکەینەوە.',
      },
      {
        title: 'پلەیس هۆڵدەرەکە',
        img: 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png',
        desc: 'هیچ كاتێك هه‌بووه‌ پرۆگرامێك نوسیوه‌و له‌ سه‌ر سێرڤه‌ر كێشه‌ی هه‌بووبێت و نه‌تزانیبێت چیه‌ یان كاتێك له‌سه‌ر كۆمپیته‌ری كه‌سێك هه‌ڵه‌یه‌ك رووده‌ده‌ات نازانیت بۆچی ئه‌مه‌ رویداوه‌‌ زۆر به‌سوود ده‌بێت ئه‌گه‌ر بێتو هه‌ڵه‌یه‌ك رویدات یه‌كسه‌ر پێیبزانیت رێك وه‌ك ئه‌وه‌ی خۆت كۆده‌كه‌ت debug بكه‌یت، له‌ به‌ختی ئێمه‌ sentry.io  رێك ئه‌و كاره‌ ده‌كات',
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

        <Row justify="center" style={{ minHeight: '94vh', paddingTop: 50 }}>
          <Col span={4} style={{ paddingTop: 100 }}>
            <Row className="navlink-row" gutter={(30)}>
              <Col span={24}>
                <h2>
                  <Button
                    icon={<HomeOutlined />}
                    size="large"
                    style={{
                      border: 'none', borderRadius: 7, background: '#f7f7f6', color: '#878787',
                    }}
                  />
                  <span style={{ marginRight: 15 }}>ماڵه‌وه‌</span>
                </h2>
              </Col>
            </Row>
            <Row className="navlink-row" gutter={(30)}>
              <Col span={24}>
                <h2>
                  <Button
                    icon={<PlusOutlined />}
                    size="large"
                    style={{
                      border: 'none', borderRadius: 7, background: '#f7f7f6', color: '#878787',
                    }}
                  />
                  <span style={{ marginRight: 15 }}>بنووسە</span>
                </h2>
              </Col>
            </Row>
            <Row className="navlink-row" gutter={(30)}>
              <Col span={24}>
                <h2>
                  <Button
                    icon={<GithubOutlined />}
                    size="large"
                    style={{
                      border: 'none', borderRadius: 7, background: '#f7f7f6', color: '#878787',
                    }}
                  />
                  <span style={{ marginRight: 15 }}>گیتهەب</span>
                </h2>
              </Col>
            </Row>
            <Row className="navlink-row" gutter={(30)}>
              <Col span={24}>
                <h2>
                  <Button
                    icon={<CodeOutlined />}
                    size="large"
                    style={{
                      border: 'none', borderRadius: 7, background: '#f7f7f6', color: '#878787',
                    }}
                  />
                  <span style={{ marginRight: 15 }}>بەکارهێنان</span>
                </h2>
              </Col>
            </Row>
            <Row className="navlink-row" gutter={(30)}>
              <Col span={24}>
                <h2>
                  <Button
                    icon={<ExclamationCircleOutlined />}
                    size="large"
                    style={{
                      border: 'none', borderRadius: 7, background: '#f7f7f6', color: '#878787',
                    }}
                  />
                  <span style={{ marginRight: 15 }}>دەربارەی ئێمە</span>
                </h2>
              </Col>
            </Row>

          </Col>
          <Col span={16} style={{ background: '#f7f7f6', padding: 10, borderRadius: 7 }}>
            <Row>
              <Col span={24}>
                <Carousel dots={{ className: 'slider-controller-container' }}>
                  {data.map((d) => (
                    <Slide data={d} />
                  ))}
                </Carousel>
              </Col>
            </Row>
            <Row style={{ marginTop: 10 }} gutter={[10, 10]}>
              <Col span={12}>
                <PostCard data={data[0]} />
              </Col>
              <Col span={12}>
                <PostCard data={data[1]} />
              </Col>
              <Col span={12}>
                <PostCard data={data[2]} />
              </Col>
              <Col span={12}>
                <PostCard data={data[3]} />
              </Col>
            </Row>
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
