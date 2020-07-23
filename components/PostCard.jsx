import React from 'react';
import { Card, message } from 'antd';
import {
  FireOutlined,
  CopyOutlined,
  FacebookOutlined,
  TwitterOutlined,

} from '@ant-design/icons';

class Slide extends React.Component {
  constructor(props) {
    super(props);
    this.copyUrl = (url) => {
      navigator.clipboard.writeText(url);
      message.success('بەستەر کۆپی کرا');
    };
  }

  render() {
    const { data } = this.props;
    return (
      <Card
        cover={<div style={{ padding: 6 }}><img style={{ width: '100%', borderRadius: 7 }} alt="test" src={data.img} /></div>}
        headStyle={{ background: 'red' }}
        actions={[
          <div className="post-card-fav">
            <span>200</span>
            {' '}
            <FireOutlined key="fav" />
          </div>,
          <TwitterOutlined key="twitter" />,
          <FacebookOutlined />,
          <CopyOutlined onClick={() => this.copyUrl(data.url)} />,
        ]}
      >
        <Card.Meta
          title={
            <a href={data.url} alt={data.title}>{data.title}</a>
          }
          description={data.desc}
        />
      </Card>
    );
  }
}

export default Slide;
