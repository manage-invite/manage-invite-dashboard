/* eslint no-param-reassign: ["error", { "props": false }] */

import { createStore, action } from 'easy-peasy';

const store = createStore({
    currentUser: null,
    login: action((state, payload) => {
        state.currentUser = payload;
    })
});

export default store;
