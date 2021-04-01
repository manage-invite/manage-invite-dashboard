/* eslint no-param-reassign: ["error", { "props": false }] */

import { createStore, action, persist } from 'easy-peasy';

const store = createStore(persist({
    currentUser: null,
    userGuildsCache: null,
    updateUserGuildsCache: action((state, payload) => {
        state.userGuildsCache = payload;
    }),
    updateCurrentUser: action((state, payload) => {
        state.currentUser = payload;
    })
}));

export default store;
