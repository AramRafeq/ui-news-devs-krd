/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { Card, message, notification } from 'antd';
import {
  FireOutlined,
  CopyOutlined,
  FacebookOutlined,
  TwitterOutlined,
  LinkOutlined,
} from '@ant-design/icons';
import { observer, inject } from 'mobx-react';
import superagent from '../helpers/superagent';

@inject('tokenStore')
@observer
class Slide extends React.Component {
  constructor(props) {
    super(props);
    const token = props.tokenStore.value;
    superagent.set('authorization', `Bearer ${token}`);
    this.state = props.data;
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
      <Card
        cover={<div style={{ padding: 6 }}><img style={{ width: '100%', borderRadius: 7 }} alt="test" src={`${process.env.NEXT_PUBLIC_AWS_ENDPOINT}/${data.thumbnail}`} /></div>}
        headStyle={{ background: 'red' }}
        actions={[
          <div className="post-card-fav" onClick={() => this.upVote(data.id)}>
            <span>{data.up_votes}</span>
            {' '}
            <FireOutlined key="fav" />
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
