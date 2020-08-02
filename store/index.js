/* eslint-disable max-classes-per-file */
import { observable } from 'mobx';
import { useStaticRendering } from 'mobx-react';
import { persist, create } from 'mobx-persist';
import Cookies from 'js-cookie';

useStaticRendering(typeof window === 'undefined');

class Token {
  @persist @observable value = '';

  @observable clear() {
    this.value = '';
    Cookies.remove('news-devs-krd-token');
  }
}
class User {
  @persist('object') @observable value = {};

  @observable clear() {
    this.value = {};
  }
}

// const store = (window.store = new Store());
const userStore = new User();
const tokenStore = new Token();
if (process.browser) {
  window.token = tokenStore;

  const hydrate = create({
    storage: localStorage,
    jsonify: true,
  });
  hydrate('news-devs-krd-user', userStore).then(() => {});
  hydrate('news-devs-krd-token', tokenStore).then(() => {});
}

export default {
  userStore,
  tokenStore,
};
