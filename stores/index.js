// stores/index.js
import { createStore } from 'vuex';
import userStore from './user.store.ts';

const store = createStore({
  modules: {
    user: userStore
  }
});

export default store;
