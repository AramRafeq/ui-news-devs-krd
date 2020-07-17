import superagent from 'superagent';
import superagentAbsolute from 'superagent-absolute';
import notificationHandler from './notificationHandler';

// const rawToken = (localStorage !== undefined) ? localStorage.getItem('news-devs-krd-token') : '';
// const token = rawToken != null ? `${rawToken}`.substr(10, rawToken.length - 12) : '';

let agent = superagent.agent();
agent.on('error', (err) => {
  notificationHandler(err);
});
agent = agent.set('Content-Type', 'application/json');
// agent = agent.set('authorization', `Bearer ${token}`);
agent = agent.type('json');

const request = superagentAbsolute(agent)(`${process.env.NEXT_PUBLIC_API}`);

export default request;
