const request = (path, token, method, body) => new Promise((resolve, reject) => {
    fetch(`${process.env.REACT_APP_API_URL}/${path}`, {
        headers: {
            authorization: `Dash ${token}`
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
    });
});

export const fetchUserGuilds = (jwt) => request('user/guilds', jwt, 'GET');
export const fetchGuildSettings = (jwt, guildID) => request(`guilds/${guildID}/settings`, jwt, 'GET');
