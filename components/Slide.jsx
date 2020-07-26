import React from 'react';
import {
  CopyOutlined,
  FacebookOutlined,
  TwitterOutlined,
  LinkOutlined,
} from '@ant-design/icons';
import { message } from 'antd';

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
      <div key={`${process.env.NEXT_PUBLIC_AWS_ENDPOINT}/${data.thumbnail}`}>
        <div style={{
          borderRadius: 7,
          height: 450,
          width: '100%',
          background: ` 
            linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0),
              rgba(0, 0, 0, 0.8)
            ),url('${process.env.NEXT_PUBLIC_AWS_ENDPOINT}/${data.thumbnail}')`,
          backgroundSize: 'cover',
          zIndex: 1,
          position: 'relative',
        }}
        />
        <h2 style={{
          textAlign: 'right',
          position: 'relative',
          marginTop: -70,
          zIndex: 3,
          color: 'white',
          padding: 20,
          bottom: 150,
        }}
        >
          <a style={{ color: 'white' }} rel="noreferrer" target="_blank" href={`https://twitter.com/share?text=${data.title}&url=${data.url}&hashtags=devskrd,kurddevelopers,${data.publisher_name},devstree,درەختی_گەشەپێدەران,گەشەپێدەرانی_کورد,devstree_io`} label={data.title}><TwitterOutlined key="twitter" /></a>
          &nbsp;
          <a style={{ color: 'white' }} rel="noreferrer" target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(data.url)}`} label={data.title}><FacebookOutlined /></a>
          &nbsp;
          <a style={{ color: 'white' }} href={data.url} rel="noreferrer" target="_blank" label={data.title}><LinkOutlined /></a>
          &nbsp;
          <CopyOutlined onClick={() => this.copyUrl(data.url)} />
          &nbsp;
          {data.title}
        </h2>
        <p style={{
          position: 'relative',
          zIndex: 33,
          padding: 20,
          color: 'white',
          fontSize: 17,
          textAlign: 'right',
          marginTop: -185,
        }}
        >
          {`${data.desc.substr(0, 350)} ${data.desc.length >= 350 ? '...' : ''}`}
        </p>
      </div>

    );
  }
}

export default Slide;
