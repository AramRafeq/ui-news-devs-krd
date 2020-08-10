/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import {
  Card, message, notification, Popover, Typography,
} from 'antd';
import {
  FireOutlined,
  CopyOutlined,
  FacebookOutlined,
  TwitterOutlined,
  LinkOutlined,
} from '@ant-design/icons';
import { observer, inject } from 'mobx-react';
import superagent from '../helpers/superagent';
import validURL from '../helpers/validURL';

@inject('tokenStore')
@observer
class PostGrid extends React.Component {
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
      <Card
        cover={(
          <div style={{ padding: 6 }}>
            <a href={data.url} rel="noreferrer" target="_blank" label={data.title}>
              <img style={{ width: '100%', borderRadius: 7 }} alt={data.title} src={validURL(data.thumbnail) ? data.thumbnail : postCoverUrl} />
            </a>
          </div>
        )}
        headStyle={{ background: 'red' }}
        actions={[
          <div className="post-card-fav" onClick={() => this.upVote(data.id)}>
            <span>{data.up_votes}</span>
            {' '}
            <FireOutlined key="fav" />
          </div>,
          <a rel="noreferrer" target="_blank" href={`https://twitter.com/share?text=${data.title}&url=${data.url}&hashtags=devskrd,kurddevelopers,${data.publisher_name},devstree,درەختی_گەشەپێدەران,گەشەپێدەرانی_کورد,devstree_io`} label={data.title}><TwitterOutlined key="twitter" /></a>,
          <a rel="noreferrer" target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(data.url)}`} label={data.title}><FacebookOutlined /></a>,
          <Popover content={
            <Typography.Text copyable>{data.url}</Typography.Text>
          }
          >
            <CopyOutlined onClick={() => this.copyUrl(data.url)} />
          </Popover>,
          <Popover content={
            <Typography.Text copyable>{data.url}</Typography.Text>
          }
          >
            <a href={data.url} rel="noreferrer" target="_blank" label={data.title}><LinkOutlined /></a>
          </Popover>,
        ]}
      >
        <Card.Meta
          title={(
            <Popover content={data.title}>

              {data.title}
            </Popover>
          )
            // <a href={data.url} rel="noreferrer" target="_blank" alt={data.title}>{data.title}</a>
          }
          description={data.desc}
        />
      </Card>
    );
  }
}

export default PostGrid;
