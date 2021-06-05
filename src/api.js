const request = (path, token, method = 'GET', body) => new Promise((resolve, reject) => {
    fetch(`${process.env.REACT_APP_API_URL}/${path}`, {
        method,
        headers: {
            authorization: `Dash ${token}`,
            'Content-Type': 'application/json'
        },
        body: method === 'POST' ? JSON.stringify(body) : undefined
    }).then((res) => {
        res.text().then((result) => {
            try {
                const data = JSON.parse(result);
                if (data.error) reject(data);
                else resolve(data);
            } catch (e) {
                throw result;
            }
        });
    }).catch((e) => {
        reject(e);
    });
});

/* User */
export const fetchUserGuilds = (jwt) => request('user/guilds', jwt);

/* Guild */
export const fetchGuildChannels = (jwt, guildID) => request(`guilds/${guildID}/channels`, jwt);

/* Guild settings */
export const fetchGuildSettings = (jwt, guildID) => request(`guilds/${guildID}/settings`, jwt);
export const updateGuildSettings = (jwt, guildID, body) => request(`guilds/${guildID}/settings`, jwt, 'POST', body);

/* Guild plugins */
export const fetchGuildPlugins = (jwt, guildID) => request(`guilds/${guildID}/plugins`, jwt);
export const updateGuildPlugin = (jwt, guildID, pluginName, pluginData) => request(`guilds/${guildID}/plugins/${pluginName}`, jwt, 'POST', pluginData);

/* Guild subscriptions */
export const fetchGuildSubscriptions = (jwt, guildID) => request(`guilds/${guildID}/subscriptions`, jwt);
export const fetchSubscriptionPayments = (jwt, guildID, subID) => request(`guilds/${guildID}/subscriptions/${subID}/payments`, jwt);

/* Guild API */
export const fetchGuildAPIToken = (jwt, guildID) => request(`guilds/${guildID}/jwt`, jwt);
export const regenGuildAPIToken = (jwt, guildID) => request(`guilds/${guildID}/jwt`, jwt, 'POST');

/* Global */
export const fetchAvailableLanguages = () => request('meta/languages');
export const fetchShardsStatus = () => request('status/shards');
