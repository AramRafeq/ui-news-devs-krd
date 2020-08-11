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
import validURL from '../helpers/validURL';

@inject('tokenStore')
@observer
class Slide extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.data;
    this.copyUrl = (url) => {
      navigator.clipboard.writeText(url);
      message.success('بەستەر کۆپی کرا');
    };
    this.upVote = (id) => {
      const token = props.tokenStore.value;
      superagent.set('authorization', `Bearer ${token}`);
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
    const postCoverUrl = `${process.env.NEXT_PUBLIC_AWS_ENDPOINT}/${data.thumbnail}`;

    return (
      <div key={validURL(data.thumbnail) ? data.thumbnail : postCoverUrl}>
        <div style={{
          borderRadius: 7,
          height: 450,
          width: '100%',
          background: ` 
            linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0),
              rgba(0, 0, 0, 0.8)
            ),url('${validURL(data.thumbnail) ? data.thumbnail : postCoverUrl}')`,
          backgroundSize: 'cover',
          zIndex: 1,
          position: 'relative',
        }}
        />
        <h2 style={{
          textAlign: 'right',
          position: 'relative',
          fontSize: '1.5em',
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

        <p
          className="slide-description"
          style={{
            position: 'relative',
            zIndex: 33,
            padding: 20,
            color: 'white',
            textAlign: 'right',
            marginTop: -185,
            fontSize: '1.1em',
          }}
        >
          {`${data.desc.substr(0, 350)} ${data.desc.length >= 350 ? '...' : ''}`}
        </p>
      </div>

    );
  }
}

export default Slide;
