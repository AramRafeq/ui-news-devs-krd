/* eslint-disable max-classes-per-file */
import { observable } from 'mobx';
import { useStaticRendering } from 'mobx-react';
import { persist, create } from 'mobx-persist';

useStaticRendering(typeof window === 'undefined');

class Token {
  @persist @observable value = '';

  @observable clear() {
    this.value = '';
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
