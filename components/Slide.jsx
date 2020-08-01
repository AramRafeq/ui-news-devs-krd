/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import {
  CopyOutlined,
  FacebookOutlined,
  TwitterOutlined,
  LinkOutlined,
  FireOutlined,
} from '@ant-design/icons';
import { message, notification } from 'antd';
import { observer, inject } from 'mobx-react';
import superagent from '../helpers/superagent';

@inject('tokenStore')
@observer
class Slide extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.data;
    const token = props.tokenStore.value;
    superagent.set('authorization', `Bearer ${token}`);
    this.copyUrl = (url) => {
      navigator.clipboard.writeText(url);
      message.success('بەستەر کۆپی کرا');
    };
    this.upVote = (id) => {
      superagent.post(`/link/${id}/upvote`)
        .send({}).end((err) => {
          if (!err) {
            this.setState((prevState) => ({ up_votes: prevState.up_votes + 1 }));
            notification.success({
              message: 'سەرکەوتوبوو',
              description: 'ده‌نگ درا',
              placement: 'bottomRight',
            });
          }
        });
    };
  }

  render() {
    const data = this.state;
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

          &nbsp;
          <a style={{ color: 'white' }} rel="noreferrer" target="_blank" href={`https://twitter.com/share?text=${data.title}&url=${data.url}&hashtags=devskrd,kurddevelopers,${data.publisher_name},devstree,درەختی_گەشەپێدەران,گەشەپێدەرانی_کورد,devstree_io`} label={data.title}><TwitterOutlined key="twitter" /></a>
          &nbsp;
          <a style={{ color: 'white' }} rel="noreferrer" target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(data.url)}`} label={data.title}><FacebookOutlined /></a>
          &nbsp;
          <a style={{ color: 'white' }} href={data.url} rel="noreferrer" target="_blank" label={data.title}><LinkOutlined /></a>
          &nbsp;
          <CopyOutlined onClick={() => this.copyUrl(data.url)} />
          &nbsp;&nbsp;
          <span className="post-card-fav" style={{ cursor: 'pointer' }} onClick={() => this.upVote(data.id)}>
            <span>{data.up_votes}</span>
            <FireOutlined key="fav" />
          </span>
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
