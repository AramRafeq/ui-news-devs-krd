import React from 'react';
import { Card, message } from 'antd';
import {
  FireOutlined,
  CopyOutlined,
  FacebookOutlined,
  TwitterOutlined,
  LinkOutlined,
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
        cover={<div style={{ padding: 6 }}><img style={{ width: '100%', borderRadius: 7 }} alt="test" src={`${process.env.NEXT_PUBLIC_AWS_ENDPOINT}/${data.thumbnail}`} /></div>}
        headStyle={{ background: 'red' }}
        actions={[
          <div className="post-card-fav">
            <span>{data.up_votes}</span>
            {' '}
            <FireOutlined key="fav" onClick={()=>this.upVote(data.id)}/>
          </div>,
          <a rel="noreferrer" target="_blank" href={`https://twitter.com/share?text=${data.title}&url=${data.url}&hashtags=devskrd,kurddevelopers,${data.publisher_name},devstree,درەختی_گەشەپێدەران,گەشەپێدەرانی_کورد,devstree_io`} label={data.title}><TwitterOutlined key="twitter" /></a>,
          <a rel="noreferrer" target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(data.url)}`} label={data.title}><FacebookOutlined /></a>,
          <CopyOutlined onClick={() => this.copyUrl(data.url)} />,
          <a href={data.url} rel="noreferrer" target="_blank" label={data.title}><LinkOutlined /></a>,
        ]}
      >
        <Card.Meta
          title={
            <a href={data.url} rel="noreferrer" target="_blank" alt={data.title}>{data.title}</a>
          }
          description={data.desc}
        />
      </Card>
    );
  }
}

export default Slide;
