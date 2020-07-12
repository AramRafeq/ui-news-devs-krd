/* eslint-disable max-classes-per-file */
import { observable } from 'mobx';
import { persist, create } from 'mobx-persist';

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
