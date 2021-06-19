/* eslint no-param-reassign: ["error", { "props": false }] */

import { createStore, action, persist } from 'easy-peasy';

const userSessionModel = {
    user: null,
    jwt: null,
    loginLoading: false,
    updateUser: action((state, payload) => {
        state.user = payload;
    }),
    updateJwt: action((state, payload) => {
        state.jwt = payload;
    }),
    updateLoginLoading: action((state, payload) => {
        state.loginLoading = payload;
    }),
    logout: action((state) => {
        state.user = null;
        state.jwt = null;
        state.loginLoading = false;
    })
};

const guildsCacheModel = {
    fetched: false,
    cache: null,
    update: action((state, payload) => {
        state.fetched = true;
        state.cache = payload;
    }),
    updateGuild: action((state, payload) => {
        const newGuilds = [...state.cache].filter((guild) => guild.id !== payload.id);
        newGuilds.push(payload);
        state.cache = newGuilds;
    })
};

const store = createStore({
    userSession: persist(userSessionModel),
    guildsCache: guildsCacheModel
});

export default store;
