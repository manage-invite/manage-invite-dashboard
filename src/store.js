/* eslint no-param-reassign: ["error", { "props": false }] */

import { createStore, action, persist } from 'easy-peasy';

const store = createStore(persist({
    currentUser: null,
    userGuildsCache: null,
    updateUserGuildsCache: action((state, payload) => {
        state.userGuildsCache = payload;
    }),
    updateGuildCache: action((state, payload) => {
        const newGuilds = [...state.userGuildsCache].filter((guild) => guild.id !== payload.id);
        newGuilds.push(payload);
        state.userGuildsCache = newGuilds;
    }),
    updateCurrentUser: action((state, payload) => {
        state.currentUser = payload;
    })
}));

export default store;
