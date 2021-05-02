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

/* Global */
export const fetchAvailableLanguages = () => request('meta/languages');
