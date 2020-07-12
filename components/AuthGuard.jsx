import React from 'react';
import { observer, inject } from 'mobx-react';
import Login from './Login';

@observer
@inject('tokenStore')
class AuthGuard extends React.Component {
  render() {
    const { tokenStore, children } = this.props;
    if (`${tokenStore.value}`.trim() !== '') {
      return children;
    }
    return <Login to={children} />;
  }
}

export default AuthGuard;
